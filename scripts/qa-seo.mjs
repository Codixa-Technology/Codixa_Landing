/**
 * Technical SEO validation against a running production server.
 *   npm run build && npm start   (port 3000)   then   npm run qa:seo
 * Optional: BASE_URL=http://localhost:3000 SITE_URL=https://codixa.space
 *
 * Checks every sitemap URL and every internal link discovered on those pages.
 * Exits with code 1 if any error is found.
 */
import { chromium } from "playwright";

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const SITE = (process.env.SITE_URL || "https://codixa.space").replace(/\/$/, "");
const LOCALES = ["en", "hy", "ru"];

const errors = [];
const warnings = [];
const fail = (url, msg) => errors.push(`${url} — ${msg}`);
const warn = (url, msg) => warnings.push(`${url} — ${msg}`);
const toLocal = (abs) => abs.replace(SITE, BASE);
const toPath = (abs) => abs.replace(SITE, "") || "/";

async function get(path, opts = {}) {
  return fetch(BASE + path, { redirect: "manual", ...opts });
}

/* ── robots.txt ── */
const robots = await (await get("/robots.txt")).text();
if (!/User-Agent: \*/i.test(robots)) fail("/robots.txt", "missing User-agent: *");
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail("/robots.txt", "missing absolute sitemap reference");
if (/Disallow: \/\s*$/m.test(robots)) fail("/robots.txt", "blocks the entire site");

/* ── sitemap.xml ── */
const sitemapRes = await get("/sitemap.xml");
if (sitemapRes.status !== 200) fail("/sitemap.xml", `status ${sitemapRes.status}`);
const sitemap = await sitemapRes.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) fail("/sitemap.xml", "no URLs");
for (const u of urls) {
  if (!u.startsWith(SITE + "/")) fail("/sitemap.xml", `non-canonical URL ${u}`);
  if (u.includes("#") || u.includes("?")) fail("/sitemap.xml", `fragment/query URL ${u}`);
}
if (new Set(urls).size !== urls.length) fail("/sitemap.xml", "duplicate URLs");
const altCount = (sitemap.match(/hreflang=/g) || []).length;
if (altCount !== urls.length * 4) fail("/sitemap.xml", `expected ${urls.length * 4} xhtml:link alternates, found ${altCount}`);

/* ── Pages ── */
const browser = await chromium.launch();
const context = await browser.newContext({ javaScriptEnabled: false });
const page = await context.newPage();
const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();
const hreflangMap = new Map();
const internalLinks = new Set();

for (const url of urls) {
  const path = toPath(url);
  const res = await get(path);
  if (res.status !== 200) {
    fail(path, `status ${res.status}`);
    continue;
  }
  const html = await res.text();
  await page.setContent(html, { waitUntil: "domcontentloaded" });

  const data = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    return {
      lang: document.documentElement.lang,
      title: document.title,
      description: q('meta[name="description"]')?.content ?? "",
      canonical: q('link[rel="canonical"]')?.href ?? "",
      robots: q('meta[name="robots"]')?.content ?? "",
      ogTitle: q('meta[property="og:title"]')?.content ?? "",
      ogImage: q('meta[property="og:image"]')?.content ?? "",
      ogUrl: q('meta[property="og:url"]')?.content ?? "",
      twitter: q('meta[name="twitter:card"]')?.content ?? "",
      alternates: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => [l.hreflang, l.href]),
      h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()),
      headings: [...document.querySelectorAll("main h1, main h2, main h3, main h4")].map((h) => +h.tagName[1]),
      imgsNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).map((i) => i.src),
      jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
      links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
      localhost: document.documentElement.outerHTML.includes("localhost"),
    };
  });

  const locale = path.split("/")[1];
  if (data.lang !== locale) fail(path, `html lang="${data.lang}" (expected ${locale})`);
  if (!data.title) fail(path, "missing <title>");
  else if (data.title.length > 75) warn(path, `long title (${data.title.length}): ${data.title}`);
  if (!data.description) fail(path, "missing meta description");
  else if (data.description.length < 70 || data.description.length > 175)
    warn(path, `description length ${data.description.length}`);
  if (data.canonical !== url) fail(path, `canonical ${data.canonical} ≠ ${url}`);
  if (/noindex/i.test(data.robots)) fail(path, `robots meta "${data.robots}" on an indexable page`);
  if (!data.ogTitle || !data.ogImage || data.ogUrl !== url) fail(path, "incomplete Open Graph tags");
  if (data.twitter !== "summary_large_image") fail(path, "missing twitter:card");
  if (data.localhost) fail(path, "contains a localhost reference");
  if (data.h1.length !== 1) fail(path, `expected exactly one <h1>, found ${data.h1.length}`);
  for (let i = 1; i < data.headings.length; i++) {
    if (data.headings[i] - data.headings[i - 1] > 1) {
      fail(path, `heading level jumps from h${data.headings[i - 1]} to h${data.headings[i]}`);
      break;
    }
  }
  if (data.imgsNoAlt.length) fail(path, `images without alt: ${data.imgsNoAlt.join(", ")}`);

  const alts = Object.fromEntries(data.alternates);
  for (const l of [...LOCALES, "x-default"]) if (!alts[l]) fail(path, `missing hreflang ${l}`);
  if (alts[locale] !== url) fail(path, `self hreflang ${alts[locale]} ≠ canonical`);
  hreflangMap.set(url, alts);

  if (!data.jsonld.length) fail(path, "no JSON-LD");
  for (const raw of data.jsonld) {
    try {
      const json = JSON.parse(raw);
      if (json["@context"] !== "https://schema.org") fail(path, "JSON-LD without schema.org @context");
      const text = JSON.stringify(json);
      if (/aggregateRating|"review"/i.test(text)) fail(path, "JSON-LD contains ratings/reviews");
    } catch {
      fail(path, "invalid JSON-LD");
    }
  }

  titles.set(data.title, [...(titles.get(data.title) ?? []), path]);
  descriptions.set(data.description, [...(descriptions.get(data.description) ?? []), path]);
  canonicals.set(data.canonical, [...(canonicals.get(data.canonical) ?? []), path]);
  for (const href of data.links) {
    if (href.startsWith("/") && !href.startsWith("//")) internalLinks.add(href.split("#")[0] || "/");
  }
}

for (const [t, paths] of titles) if (paths.length > 1) fail(paths.join(", "), `duplicate title "${t}"`);
for (const [d, paths] of descriptions) if (paths.length > 1) fail(paths.join(", "), `duplicate description "${d.slice(0, 50)}…"`);
for (const [c, paths] of canonicals) if (paths.length > 1) fail(paths.join(", "), `duplicate canonical ${c}`);

// hreflang reciprocity: every alternate must list this page back.
for (const [url, alts] of hreflangMap) {
  for (const l of LOCALES) {
    const target = hreflangMap.get(alts[l]);
    if (!target) fail(toPath(url), `hreflang ${l} → ${alts[l]} not in sitemap`);
    else if (target[LOCALES.find((x) => url.startsWith(`${SITE}/${x}`))] !== url) fail(toPath(url), `hreflang ${l} not reciprocal`);
  }
}

/* ── Internal links ── */
const sitemapPaths = new Set(urls.map(toPath));
for (const href of internalLinks) {
  const res = await get(href);
  if (res.status !== 200) fail(href, `internal link returns ${res.status}`);
  else if (!sitemapPaths.has(href) && !/\.(png|ico|svg|webmanifest|xml|txt)$/.test(href)) warn(href, "linked page is not in the sitemap");
}

/* ── Redirects & status codes ── */
const expectRedirect = async (from, to) => {
  const res = await get(from);
  const loc = res.headers.get("location");
  if (![301, 308].includes(res.status) || !(loc === to || loc?.endsWith(to))) fail(from, `expected permanent redirect to ${to}, got ${res.status} ${loc}`);
};
await expectRedirect("/", "/en");
await expectRedirect("/services", "/en/services");
await expectRedirect("/about", "/en/about");
await expectRedirect("/services/crm-development", "/en/services/crm-development");
await expectRedirect("/en/", "/en");
await expectRedirect("/hy/privacy-policy", "/hy/privacy");

for (const path of ["/does-not-exist", "/en/does-not-exist", "/en/services/unknown", "/de", "/en/work"]) {
  const res = await get(path);
  if (res.status !== 404) fail(path, `expected 404, got ${res.status}`);
  const body = await res.text();
  if (!/noindex/i.test(body)) fail(path, "404 page without noindex");
}

await browser.close();

console.log(`Checked ${urls.length} sitemap URLs and ${internalLinks.size} unique internal links.`);
if (warnings.length) console.log(`\nWarnings (${warnings.length}):\n  ` + warnings.join("\n  "));
if (errors.length) {
  console.log(`\nErrors (${errors.length}):\n  ` + errors.join("\n  "));
  process.exit(1);
}
console.log("\nSEO validation passed — no errors.");
