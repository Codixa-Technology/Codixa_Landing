/**
 * Screenshots the viewport after scrolling to an absolute Y offset.
 *
 *   node tools/shot-at.mjs <url> <out.png> <scrollY> [width] [height]
 */
import { chromium } from "playwright";

const [url, out, yArg, widthArg, heightArg] = process.argv.slice(2);
const y = Number(yArg || 0);
const width = Number(widthArg || 1440);
const height = Number(heightArg || 900);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
await page.evaluate(async (target) => {
  const step = window.innerHeight * 0.8;
  for (let i = 0; i < target; i += step) {
    window.scrollTo(0, i);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, target);
}, y);
await page.waitForTimeout(2000);
await page.screenshot({ path: out });
await browser.close();
console.log("ok", out);
