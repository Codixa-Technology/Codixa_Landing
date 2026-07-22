/**
 * Dumps the fully hydrated DOM of a page so client-rendered markup (icon symbol
 * sheets, sliders, accordions) can be inspected alongside the SSR output.
 *
 *   node tools/dump-dom.mjs <url> <outFile> [width]
 */
import { chromium } from "playwright";
import fs from "node:fs";

const url = process.argv[2];
const outFile = process.argv[3];
const width = Number(process.argv[4] || 1440);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 1000 } });
await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(3000);
await page.evaluate(async () => {
  const step = window.innerHeight * 0.6;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(2000);
const html = await page.evaluate(() => document.documentElement.outerHTML);
fs.writeFileSync(outFile, html, "utf8");
console.log("bytes", html.length);
await browser.close();
