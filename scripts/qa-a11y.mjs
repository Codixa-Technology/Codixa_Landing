/**
 * Accessibility audit with axe-core (WCAG 2.0/2.1/2.2 A + AA rules) on every
 * sitemap URL, at desktop and mobile widths.
 *   BASE_URL=http://localhost:3000 npm run qa:a11y
 */
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || "/");

const browser = await chromium.launch();
const failures = [];
for (const viewport of [{ width: 1440, height: 900 }, { width: 375, height: 812 }]) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
  for (const path of paths) {
    const page = await context.newPage();
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible")));
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    for (const v of result.violations) {
      failures.push(`${viewport.width}px ${path} [${v.impact}] ${v.id}: ${v.help} — ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`);
    }
    await page.close();
  }
  await context.close();
}
await browser.close();

console.log(`Audited ${paths.length} pages × 2 viewports.`);
if (failures.length) {
  console.log(`Violations (${failures.length}):\n  ` + failures.join("\n  "));
  process.exit(1);
}
console.log("No WCAG A/AA violations detected by axe-core.");
