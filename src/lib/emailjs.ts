/**
 * EmailJS transport for the contact form (preserved from the previous site).
 *
 * Two sends: the enquiry that lands in the Codixa inbox, and an optional
 * confirmation back to the visitor. Template variables are unchanged
 * ({{name}}, {{email}}, {{message}}, {{title}}, {{reply_to}}), so the
 * templates in /email-templates keep working. Extra form fields are folded
 * into the message body.
 *
 * Credentials are public EmailJS identifiers inlined at build time
 * (see next.config.ts) — no secret is shipped to the browser.
 */

const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
const NOTIFY_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_NOTIFY_SERVICE_ID ?? "";
const NOTIFY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_NOTIFY_TEMPLATE_ID ?? "";
const REPLY_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_REPLY_SERVICE_ID ?? "";
const REPLY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_REPLY_TEMPLATE_ID ?? "";

export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  locale: string;
}

export const isEmailConfigured = Boolean(PUBLIC_KEY && NOTIFY_SERVICE_ID && NOTIFY_TEMPLATE_ID);
const isAutoReplyConfigured = Boolean(REPLY_SERVICE_ID && REPLY_TEMPLATE_ID);

export class EmailNotConfiguredError extends Error {
  constructor() {
    super("EmailJS credentials are not configured");
    this.name = "EmailNotConfiguredError";
  }
}

const toParams = ({ name, email, company, service, message, locale }: ContactPayload) => {
  const details = [
    service && `Service: ${service}`,
    company && `Company: ${company}`,
    `Language: ${locale.toUpperCase()}`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    name,
    email,
    message: `${details}\n\n${message}`,
    title: `New project enquiry from ${name}${service ? ` — ${service}` : ""}`,
    reply_to: email,
  };
};

/**
 * Sends the enquiry, then the visitor confirmation. Throws only if the
 * enquiry itself fails — a missed confirmation is cosmetic, a missed lead is not.
 * The EmailJS SDK is loaded on demand so it never weighs on page load.
 */
export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  if (!isEmailConfigured) throw new EmailNotConfiguredError();

  const { default: emailjs } = await import("@emailjs/browser");
  const params = toParams(payload);
  const options = { publicKey: PUBLIC_KEY };

  await emailjs.send(NOTIFY_SERVICE_ID, NOTIFY_TEMPLATE_ID, params, options);

  if (isAutoReplyConfigured) {
    await emailjs.send(REPLY_SERVICE_ID, REPLY_TEMPLATE_ID, params, options).catch(() => {
      // Confirmation e-mail is optional; the enquiry has already been delivered.
    });
  }
}
