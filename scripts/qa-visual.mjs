/**
 * Visual QA: full-page screenshots of key routes at three viewports, plus
 * horizontal-overflow, broken-image and console-error detection.
 *   BASE_URL=http://localhost:3000 npm run qa:visual     → screenshots in .qa/visual
 */
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const OUT = ".qa/visual";
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "desktop", width: 1440, height: 900 },
];
const paths = (process.env.PATHS || "/en,/hy,/ru,/en/services,/en/services/crm-development,/hy/services/website-development,/ru/about,/en/about,/hy/contact,/en/contact,/en/privacy,/en/nope")
  .split(",")
  .filter(Boolean);

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const problems = [];

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, reducedMotion: "reduce" });
  for (const path of paths) {
    const page = await context.newPage();
    const errors = [];
    const expect404 = path.includes("/nope");
    page.on("console", (m) => m.type() === "error" && !(expect404 && /404/.test(m.text())) && errors.push(m.text().slice(0, 200)));
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    // Reveal everything so full-page captures show final layout.
    await page.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible")));
    await page.waitForTimeout(300);
    const report = await page.evaluate(() => {
      const overflow = document.documentElement.scrollWidth - window.innerWidth;
      const wide = overflow > 0
        ? [...document.querySelectorAll("body *")]
            .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
            .slice(0, 5)
            .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`)
        : [];
      const broken = [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src);
      return { overflow, wide, broken };
    });
    const file = `${OUT}/${vp.name}${path.replaceAll("/", "_")}.png`;
    await page.screenshot({ path: file, fullPage: true });
    if (report.overflow > 0) problems.push(`${vp.name} ${path}: horizontal overflow ${report.overflow}px (${report.wide.join(", ")})`);
    if (report.broken.length) problems.push(`${vp.name} ${path}: broken images ${report.broken.join(", ")}`);
    if (errors.length) problems.push(`${vp.name} ${path}: console errors ${errors.join(" | ")}`);
    await page.close();
  }
  await context.close();
}
await browser.close();

console.log(`Captured ${paths.length * viewports.length} screenshots in ${OUT}.`);
if (problems.length) {
  console.log("Problems:\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log("No overflow, broken images or console errors.");
