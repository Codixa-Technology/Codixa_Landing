/**
 * Submits the real contact form against a running dev server and prints the
 * EmailJS API response verbatim. THIS SENDS A REAL EMAIL.
 *
 *   node tools/email-send-test.mjs [url] [replyEmail]
 */
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:5200/";
const replyEmail = process.argv[3] ?? "gorxachikyan633@gmail.com";

const browser = await chromium.launch();
const page = await browser.newPage();

page.on("pageerror", (e) => console.log("[pageerror]", e.message));
page.on("console", (m) => console.log(`[console:${m.type()}]`, m.text()));

page.on("requestfailed", (r) => {
  if (r.url().includes("emailjs")) console.log("[requestfailed]", r.url(), r.failure()?.errorText);
});

page.on("response", async (res) => {
  if (!res.url().includes("emailjs")) return;
  let body = "";
  try {
    body = await res.text();
  } catch {
    body = "<unreadable>";
  }
  console.log(`[network] ${res.status()} ${res.url()}\n[body] ${body}`);
});

await page.goto(url, { waitUntil: "networkidle" });

await page.fill("#contact-name", "Codixa Test");
await page.fill("#contact-email", replyEmail);
await page.fill("#contact-message", "Automated deliverability test from the local dev server.");

console.log("[probe] submitting...");
await page.click('#contact button[type="submit"]');
await page.waitForTimeout(10000);

console.log(
  "[probe] button label after submit:",
  JSON.stringify((await page.textContent('#contact button[type="submit"]'))?.trim()),
);
console.log(
  "[probe] error banner shown:",
  (await page.locator("#contact form p[role=alert]").count()) > 0,
);

await browser.close();
