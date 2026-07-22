/**
 * Prints the box of every element matching a selector, for layout debugging.
 *
 *   node tools/measure.mjs <url> "<selector>" [width]
 */
import { chromium } from "playwright";

const url = process.argv[2];
const selector = process.argv[3];
const width = Number(process.argv[4] || 1440);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 1000 } });
await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(2000);

const boxes = await page.$$eval(selector, (nodes) =>
  nodes.slice(0, 40).map((node) => {
    const rect = node.getBoundingClientRect();
    const style = getComputedStyle(node);
    return {
      tag: node.tagName.toLowerCase(),
      cls: node.className.toString().slice(0, 70),
      x: Math.round(rect.x),
      y: Math.round(rect.y),
      w: Math.round(rect.width),
      h: Math.round(rect.height),
      display: style.display,
      flex: style.flex,
      dir: style.flexDirection,
    };
  }),
);
console.log(JSON.stringify(boxes, null, 1));
await browser.close();
