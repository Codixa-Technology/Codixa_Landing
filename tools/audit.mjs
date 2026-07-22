/**
 * Accessibility / layout audit: reports horizontal overflow, missing alt text,
 * empty links and heading order at each breakpoint.
 *
 *   node tools/audit.mjs <url> [widths]
 */
import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:5199/";
const widths = (process.argv[3] || "1920,1440,1024,810,390").split(",").map(Number);

const browser = await chromium.launch();

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const consoleErrors = [];
  page.on("console", (msg) => msg.type() === "error" && consoleErrors.push(msg.text()));
  page.on("pageerror", (error) => consoleErrors.push(String(error)));

  await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);

  const report = await page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth;
    const overflowing = [];
    for (const node of document.querySelectorAll("body *")) {
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.right > docWidth + 1 || rect.left < -1) {
        const style = getComputedStyle(node);
        // Ignore elements intentionally clipped by an ancestor.
        let parent = node.parentElement;
        let clipped = false;
        while (parent) {
          const parentStyle = getComputedStyle(parent);
          if (parentStyle.overflow !== "visible" || parentStyle.maskImage !== "none") {
            clipped = true;
            break;
          }
          parent = parentElementOf(parent);
        }
        function parentElementOf(el) {
          return el.parentElement;
        }
        if (!clipped && style.position !== "fixed") {
          overflowing.push(
            `${node.tagName.toLowerCase()}.${node.className.toString().slice(0, 40)} ` +
              `[${Math.round(rect.left)}..${Math.round(rect.right)}]`,
          );
        }
      }
    }

    const imagesWithoutAlt = [...document.querySelectorAll("img:not([alt])")].map(
      (img) => img.getAttribute("src") || "",
    );
    const emptyLinks = [...document.querySelectorAll("a")].filter(
      (a) => !a.textContent?.trim() && !a.getAttribute("aria-label"),
    ).length;
    const emptyButtons = [...document.querySelectorAll("button")].filter(
      (b) => !b.textContent?.trim() && !b.getAttribute("aria-label"),
    ).length;
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) =>
      h.tagName.toLowerCase(),
    );

    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: docWidth,
      overflowing: overflowing.slice(0, 10),
      imagesWithoutAlt: imagesWithoutAlt.slice(0, 10),
      emptyLinks,
      emptyButtons,
      headings,
    };
  });

  console.log(`\n=== ${width}px`);
  console.log(
    `horizontal scroll: ${report.scrollWidth > report.clientWidth ? `YES (${report.scrollWidth} > ${report.clientWidth})` : "no"}`,
  );
  if (report.overflowing.length) console.log("overflowing:", report.overflowing);
  if (report.imagesWithoutAlt.length) console.log("img without alt:", report.imagesWithoutAlt);
  console.log(`links without name: ${report.emptyLinks}, buttons without name: ${report.emptyButtons}`);
  console.log("headings:", report.headings.join(" "));
  if (consoleErrors.length) console.log("console errors:", consoleErrors.slice(0, 5));
  await page.close();
}

await browser.close();
