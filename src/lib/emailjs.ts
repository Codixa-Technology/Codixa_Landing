/**
 * EmailJS transport for the contact form.
 *
 * Two separate sends: the enquiry that lands in the Codixa inbox, and the
 * confirmation that goes back to the visitor. Each has its own service +
 * template pair so they can be routed through different sending accounts.
 *
 * Credentials come from Vite env vars (see `.env.example`). The public key is
 * meant to be client-side — EmailJS scopes it per-domain in the dashboard.
 */
import emailjs from "@emailjs/browser";

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const NOTIFY_SERVICE_ID = import.meta.env.VITE_EMAILJS_NOTIFY_SERVICE_ID;
const NOTIFY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_NOTIFY_TEMPLATE_ID;

const REPLY_SERVICE_ID = import.meta.env.VITE_EMAILJS_REPLY_SERVICE_ID;
const REPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_REPLY_TEMPLATE_ID;

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

/** Template params — keys must match the `{{placeholders}}` in both templates. */
const toParams = ({ name, email, message }: ContactPayload) => ({
  name,
  email,
  message,
  /** Subject line, reused by the auto-reply as the "your request" quote. */
  title: `New project enquiry from ${name}`,
  reply_to: email,
});

export const isEmailConfigured = Boolean(
  PUBLIC_KEY && NOTIFY_SERVICE_ID && NOTIFY_TEMPLATE_ID,
);

const isAutoReplyConfigured = Boolean(REPLY_SERVICE_ID && REPLY_TEMPLATE_ID);

/**
 * Sends the enquiry, then the visitor confirmation. Throws only if the enquiry
 * itself fails — a missed confirmation is cosmetic, a missed lead is not.
 */
export async function sendContactEmail(payload: ContactPayload) {
  if (!isEmailConfigured) {
    throw new Error(
      "EmailJS is not configured — set VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_NOTIFY_SERVICE_ID and VITE_EMAILJS_NOTIFY_TEMPLATE_ID in .env",
    );
  }

  const params = toParams(payload);
  const options = { publicKey: PUBLIC_KEY };

  const notification = await emailjs.send(
    NOTIFY_SERVICE_ID,
    NOTIFY_TEMPLATE_ID,
    params,
    options,
  );

  if (isAutoReplyConfigured) {
    await emailjs
      .send(REPLY_SERVICE_ID, REPLY_TEMPLATE_ID, params, options)
      .catch((error) => console.error("Auto-reply failed to send", error));
  }

  return notification;
}
