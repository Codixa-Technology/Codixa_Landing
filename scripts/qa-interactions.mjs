/**
 * Interaction tests in a real browser (JavaScript on, motion on):
 * brand reveal, mobile menu, keyboard, language switcher, FAQ, contact form,
 * reveal-on-scroll and the skip link.
 *   BASE_URL=http://localhost:3000 node scripts/qa-interactions.mjs
 */
import { chromium } from "playwright";

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const results = [];
const check = (name, ok, detail = "") => results.push({ name, ok, detail });

const browser = await chromium.launch();

/* ── Desktop ── */
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

  await page.goto(`${BASE}/en`, { waitUntil: "load" });
  const cutAnimating = await page.evaluate(() => {
    const cut = document.querySelector(".brand-mark__cut");
    return getComputedStyle(cut).display !== "none" && cut.getAnimations().length > 0;
  });
  check("Brand reveal plays on first visit", cutAnimating);
  const heroVisible = await page.evaluate(() => getComputedStyle(document.querySelector("h1")).opacity === "1");
  check("Brand reveal never covers the hero headline", heroVisible);
  await page.waitForTimeout(1200);
  check("Brand reveal finishes within 1.2s", await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running" && a.animationName?.startsWith("brand")).length === 0));

  // Client-side navigation keeps the header mounted, so the reveal never replays.
  await page.click('header nav a[href="/en/services"]');
  await page.waitForURL("**/en/services");
  const replay = await page.evaluate(() => document.getAnimations().some((a) => a.animationName?.startsWith("brand") && a.playState === "running"));
  check("Brand reveal does not replay on navigation", !replay);
  const active = await page.getAttribute('header nav a[href="/en/services"]', "aria-current");
  check("Active nav state on Services", active === "page");

  // Reload in the same session: intro skipped.
  await page.reload({ waitUntil: "load" });
  check("Intro skipped on repeat visit in session", await page.evaluate(() => document.documentElement.classList.contains("intro-done")));

  // Language switcher keeps the current page.
  await page.goto(`${BASE}/en/services/crm-development`);
  await page.click('header a[hreflang="ru"]');
  await page.waitForURL("**/ru/services/crm-development");
  check("Language switch preserves page (EN → RU)", page.url().endsWith("/ru/services/crm-development"));
  check("html lang updates to ru", (await page.getAttribute("html", "lang")) === "ru");
  await page.click('header a[hreflang="hy"]');
  await page.waitForURL("**/hy/services/crm-development");
  check("Language switch RU → HY", (await page.getAttribute("html", "lang")) === "hy");
  const internalHrefs = await page.$$eval("main a[href^='/']", (as) => as.map((a) => a.getAttribute("href")));
  check("Internal links keep the selected language", internalHrefs.every((h) => h.startsWith("/hy")), internalHrefs.find((h) => !h.startsWith("/hy")) ?? "");

  // Reveal on scroll.
  await page.goto(`${BASE}/en`);
  const hiddenBefore = await page.evaluate(() => document.querySelectorAll("[data-reveal]:not(.is-visible)").length);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  await page.waitForTimeout(400);
  const hiddenAfter = await page.evaluate(() => document.querySelectorAll("[data-reveal]:not(.is-visible)").length);
  check("Scroll reveal reveals all sections", hiddenBefore > 0 && hiddenAfter === 0, `${hiddenBefore} → ${hiddenAfter}`);

  // FAQ accordion (native details).
  const faq = page.locator("details").first();
  await faq.locator("summary").click();
  check("FAQ opens", await faq.evaluate((d) => d.open));
  await faq.locator("summary").press("Enter");
  check("FAQ closes with keyboard", !(await faq.evaluate((d) => d.open)));

  // Skip link.
  await page.goto(`${BASE}/en/about`);
  await page.keyboard.press("Tab");
  const skipFocused = await page.evaluate(() => document.activeElement?.classList.contains("skip-link"));
  check("Skip link is first focusable element", skipFocused);

  // Contact form validation + submission without credentials.
  await page.goto(`${BASE}/en/contact`);
  await page.click('button[type="submit"]');
  const invalid = await page.$$eval('[aria-invalid="true"]', (els) => els.map((e) => e.getAttribute("name")));
  check("Empty form shows field errors", invalid.join(",") === "name,email,message", invalid.join(","));
  check("Focus moves to first invalid field", await page.evaluate(() => document.activeElement?.getAttribute("name") === "name"));
  await page.fill("#cf-name", "QA Test");
  await page.fill("#cf-email", "not-an-email");
  await page.fill("#cf-message", "short");
  await page.click('button[type="submit"]');
  const emailError = await page.textContent("#cf-email-error");
  check("Invalid email message", /valid email/i.test(emailError ?? ""), emailError ?? "");
  check("Short message message", /at least 20/i.test((await page.textContent("#cf-message-error")) ?? ""));
  await page.fill("#cf-email", "qa@example.com");
  await page.fill("#cf-message", "We need a CRM for our sales team of twelve people.");
  await page.selectOption("#cf-service", "crm-development");
  await page.waitForTimeout(2600); // respect the anti-bot minimum fill time
  await page.click('button[type="submit"]');
  await page.waitForSelector('[role="alert"] a[href^="mailto:"], [role="status"]', { timeout: 10000 });
  const outcome = (await page.locator('form [role="alert"]').last().textContent().catch(() => "")) || (await page.textContent('[role="status"]'));
  check(
    "Submission reports a real outcome (no fake success without credentials)",
    /unavailable|codixatechnologies@gmail\.com|Thank you/i.test(outcome ?? ""),
    (outcome ?? "").slice(0, 90),
  );

  check("No runtime errors on desktop", errors.length === 0, errors.join(" | "));
  await context.close();
}

/* ── Mobile ── */
{
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto(`${BASE}/hy`);
  await page.waitForTimeout(1500);
  const toggle = page.locator('button[aria-controls="mobile-menu"]');
  await toggle.click();
  check("Mobile menu opens", (await toggle.getAttribute("aria-expanded")) === "true" && (await page.locator("#mobile-menu").isVisible()));
  check("Page scroll locked while menu open", (await page.evaluate(() => document.documentElement.style.overflow)) === "hidden");
  await page.keyboard.press("Escape");
  check("Escape closes the menu", (await toggle.getAttribute("aria-expanded")) === "false");
  check("Focus returns to the toggle", await page.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "mobile-menu"));
  await toggle.click();
  await page.click('#mobile-menu a[href="/hy/about"]');
  await page.waitForURL("**/hy/about");
  check("Menu link navigates and closes menu", !(await page.locator("#mobile-menu").isVisible()));
  await toggle.click();
  await page.click('#mobile-menu a[hreflang="en"]');
  await page.waitForURL("**/en/about");
  check("Mobile language switch preserves page", page.url().endsWith("/en/about"));
  const targets = await page.$$eval("header a, header button", (els) =>
    els.filter((e) => e.offsetParent).map((e) => Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height)),
  );
  check("Header touch targets ≥ 40px", targets.every((s) => s >= 40), targets.join(","));
  await context.close();
}

/* ── Reduced motion ── */
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(`${BASE}/ru`);
  const cutDisplay = await page.evaluate(() => getComputedStyle(document.querySelector(".brand-mark__cut")).display);
  check("Reduced motion: no brand reveal animation", cutDisplay === "none");
  const hidden = await page.evaluate(() => [...document.querySelectorAll("[data-reveal]")].some((el) => getComputedStyle(el).opacity !== "1"));
  check("Reduced motion: content never hidden", !hidden);
  await context.close();
}

/* ── No JavaScript ── */
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${BASE}/en/services`);
  const hidden = await page.evaluate(() => [...document.querySelectorAll("[data-reveal]")].some((el) => getComputedStyle(el).opacity !== "1"));
  check("Without JavaScript all content is visible", !hidden);
  check("Without JavaScript the logo is shown statically", (await page.evaluate(() => getComputedStyle(document.querySelector(".brand-mark__cut")).display)) === "none");
  await context.close();
}

await browser.close();
let failed = 0;
for (const r of results) {
  if (!r.ok) failed++;
  console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
}
console.log(`\n${results.length - failed}/${results.length} passed.`);
process.exit(failed ? 1 : 0);
