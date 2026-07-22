/**
 * Prints computed styles for a selector after a full scroll pass.
 *
 *   node tools/probe.mjs <url> "<selector>" "prop1,prop2" [width]
 */
import { chromium } from "playwright";

const url = process.argv[2];
const selector = process.argv[3];
const props = (process.argv[4] || "opacity,color").split(",");
const width = Number(process.argv[5] || 1440);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 1000 } });
await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
await page.evaluate(async () => {
  const step = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 140));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1500);

const out = await page.$$eval(
  selector,
  (nodes, keys) =>
    nodes.slice(0, 8).map((node) => {
      const style = getComputedStyle(node);
      const result = { cls: node.className.toString().slice(0, 50) };
      for (const key of keys) result[key] = style.getPropertyValue(key);
      return result;
    }),
  props,
);
console.log(JSON.stringify(out, null, 1));
await browser.close();
