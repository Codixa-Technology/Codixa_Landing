/**
 * Crops a vertical slice out of a full-page screenshot so large captures can be
 * reviewed section by section.
 *
 *   node tools/crop.mjs <input.png> <output.png> <top> <height>
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const [input, output, topArg, heightArg] = process.argv.slice(2);
const top = Number(topArg ?? 0);
const height = Number(heightArg ?? 1200);

const buffer = fs.readFileSync(input);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 100, height: 100 } });
const dataUrl = `data:image/png;base64,${buffer.toString("base64")}`;
const size = await page.evaluate(
  (src) =>
    new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve({ width: image.width, height: image.height });
      image.src = src;
    }),
  dataUrl,
);
await page.setViewportSize({ width: size.width, height: Math.min(height, size.height - top) });
await page.setContent(
  `<body style="margin:0"><img src="${dataUrl}" style="display:block;margin-top:${-top}px"></body>`,
);
fs.mkdirSync(path.dirname(output), { recursive: true });
await page.screenshot({ path: output });
await browser.close();
console.log("cropped", output, size.width, "x", size.height);
