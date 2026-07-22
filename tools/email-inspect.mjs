/**
 * Read-only check that the EmailJS credentials actually reach the browser.
 * Does NOT submit the form, so no mail is sent.
 *
 *   node tools/email-inspect.mjs [url]
 */
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:5200/";
const browser = await chromium.launch();
const page = await browser.newPage();

page.on("pageerror", (e) => console.log("[pageerror]", e.message));
page.on("console", (m) => {
  if (m.type() === "error") console.log("[console:error]", m.text());
});

await page.goto(url, { waitUntil: "networkidle" });

// `import.meta.env` can't live inside a serialized evaluate callback, so read it
// off the module source Vite has already substituted values into.
const cfg = await page.evaluate(`(async () => {
  const mod = await import("/src/lib/emailjs.ts");
  const src = await (await fetch("/src/lib/emailjs.ts")).text();
  const env = JSON.parse(src.match(/import\\.meta\\.env = (\\{.*?\\});/s)[1]);
  return {
    configured: mod.isEmailConfigured,
    publicKey: env.VITE_EMAILJS_PUBLIC_KEY,
    notify: [env.VITE_EMAILJS_NOTIFY_SERVICE_ID, env.VITE_EMAILJS_NOTIFY_TEMPLATE_ID],
    reply: [env.VITE_EMAILJS_REPLY_SERVICE_ID, env.VITE_EMAILJS_REPLY_TEMPLATE_ID],
  };
})()`);
console.log("[env in browser]", JSON.stringify(cfg, null, 2));

for (const id of ["#contact-name", "#contact-email", "#contact-message"]) {
  console.log(`[form] ${id} present:`, (await page.locator(id).count()) > 0);
}

await browser.close();
