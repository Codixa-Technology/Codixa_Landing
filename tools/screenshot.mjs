/**
 * Visual-regression helper.
 *
 *   node tools/screenshot.mjs <url> <outDir> <prefix> <widths> [viewport]
 *
 * Loads a page at each width, scrolls it end-to-end so every scroll-triggered
 * animation settles, then writes a full-page PNG. Used to diff the React build
 * against the original Framer site.
 */
import { chromium } from "playwright";
import fs from "node:fs";

const url = process.argv[2] || "http://localhost:5199/";
const outDir = process.argv[3] || "screenshots";
const prefix = process.argv[4] || "local";
const widths = (process.argv[5] || "1440").split(",").map(Number);
const full = process.argv[6] !== "viewport";

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();

for (const width of widths) {
  const page = await browser.newPage({
    viewport: { width, height: 1000 },
    deviceScaleFactor: 1,
  });
  await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(3500);

  if (full) {
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 140));
      }
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 600));
    });
    await page.waitForTimeout(1500);
  }

  await page.screenshot({ path: `${outDir}/${prefix}-${width}.png`, fullPage: full });
  console.log(prefix, width, "height:", await page.evaluate(() => document.body.scrollHeight));
  await page.close();
}

await browser.close();
