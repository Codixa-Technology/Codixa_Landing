/**
 * Generates icons and localized Open Graph images from the official brand assets.
 *   node scripts/generate-brand-assets.mjs
 * Inputs:  public/brand/codixa-mark.png, public/brand/codixa-wordmark.svg
 * Outputs: public/icon.png, public/icon-512.png, public/apple-icon.png,
 *          public/favicon.ico, public/brand/og-{en,hy,ru}.png
 */
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { chromium } from "playwright";

const mark = "public/brand/codixa-mark.png";

for (const [file, size] of [["public/icon.png", 192], ["public/icon-512.png", 512], ["public/apple-icon.png", 180]]) {
  await sharp(mark).resize(size, size).png({ compressionLevel: 9 }).toFile(file);
}

// favicon.ico with an embedded 48px PNG (valid ICO; supported by all current browsers).
const png48 = await sharp(mark).resize(48, 48).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(48, 6);
header.writeUInt8(48, 7);
header.writeUInt8(0, 8);
header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png48.length, 14);
header.writeUInt32LE(22, 18);
await writeFile("public/favicon.ico", Buffer.concat([header, png48]));

const wordmark = await readFile("public/brand/codixa-wordmark.svg", "utf8");
const copy = {
  en: { label: "WEB · SOFTWARE · CRM", a: "Digital products,", b: "engineered with ", c: "precision." },
  hy: { label: "ՎԵԲ · ԾՐԱԳՐԵՐ · CRM", a: "Թվային լուծումներ՝", b: "ստեղծված ", c: "ճշգրտությամբ։" },
  ru: { label: "ВЕБ · ПО · CRM", a: "Цифровые продукты", b: "с ", c: "инженерной точностью." },
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const [locale, t] of Object.entries(copy)) {
  await page.setContent(`<!doctype html><html lang="${locale}"><head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&family=Manrope:wght@800&family=Noto+Sans+Armenian:wght@500;800&display=block">
<style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#111;color:#fff;font-family:Manrope,"Noto Sans Armenian",sans-serif;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.05) 1px,transparent 1px);background-size:40px 40px}
.cut{position:absolute;right:120px;bottom:-40px;width:150px;height:560px;background:#FB4001;transform:skewX(-25deg);transform-origin:bottom left}
.cut2{position:absolute;right:20px;bottom:-40px;width:60px;height:320px;background:#2A2A2D;transform:skewX(-25deg);transform-origin:bottom left}
.wrap{position:absolute;left:80px;top:72px;right:380px;bottom:72px;display:flex;flex-direction:column;justify-content:space-between}
svg{width:230px;height:auto}
.label{font-family:"JetBrains Mono","Noto Sans Armenian",monospace;font-weight:500;font-size:18px;letter-spacing:.12em;color:#FB4001;margin-bottom:22px}
h1{font-size:${locale === "hy" ? 54 : 64}px;line-height:1.04;letter-spacing:-.035em;font-weight:800}
h1 span{color:#FB4001}
.url{font-family:"JetBrains Mono",monospace;font-size:18px;color:#A19D98;letter-spacing:.06em}
</style></head><body><div class="grid"></div><div class="cut2"></div><div class="cut"></div>
<div class="wrap">${wordmark}<div><p class="label">${t.label}</p><h1>${t.a}<br>${t.b}<span>${t.c}</span></h1></div><p class="url">codixa.space</p></div></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const buf = await page.screenshot({ type: "png" });
  await sharp(buf).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(`public/brand/og-${locale}.png`);
}
await browser.close();
console.log("Brand assets generated.");
