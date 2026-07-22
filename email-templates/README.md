# EmailJS setup

Submitting the contact form fires **two independent sends**, each with its own
service + template pair (see [`src/lib/emailjs.ts`](../src/lib/emailjs.ts)).
Both HTML files are paste-ready and email-client-safe on purpose — tables,
inline styles, hex colours, no flex/grid.

Variables sent with both: `{{name}}`, `{{email}}`, `{{message}}`, `{{title}}`, `{{reply_to}}`.

## 1. Notification — the mail **you** receive

Template `template_4knt2tx` (service `service_z7smmkt`) · source: [`notification.html`](notification.html)

Fill the template's **Content** tab:

| Field | Value |
| --- | --- |
| Subject | `{{title}}` |
| To Email | `codixatechnologies@gmail.com` |
| From Name | `{{name}}` |
| From Email | leave "Use Default Email Address" checked |
| Reply To | `{{email}}` |

`Reply To` matters: it makes the Reply button answer the visitor directly.

## 2. Auto-reply — the mail the **visitor** receives

Template `template_nw75652` (service `service_fzarnzc`) · source: [`auto-reply.html`](auto-reply.html)

This is a standalone template, so its content goes on the **Content** tab too —
the "Auto-Reply" tab is not used and should stay disabled.

| Field | Value |
| --- | --- |
| Subject | `We've received your message` |
| To Email | `{{email}}` |
| From Name | `Codixa` |
| From Email | leave "Use Default Email Address" checked |
| Reply To | `codixatechnologies@gmail.com` |

## Attachments tab — on **both** templates

Upload [`public/assets/images/Logo.png`](../public/assets/images/Logo.png) as a
static attachment named exactly `logo.png` — that is what `cid:logo.png` resolves
to. The dashboard preview always shows a broken image icon for `cid:` references;
only the delivered mail resolves it.

## Pasting the HTML

Content field → **Edit Content** → switch the editor to code/HTML mode (`</>`)
→ select all → paste → Save.

## Verifying

```sh
npm run dev
node tools/email-inspect.mjs      # no mail sent — checks credentials reach the browser
node tools/email-send-test.mjs    # sends real test mail, prints both API responses
```

A working run logs two `200 https://api.emailjs.com/api/v1.0/email/send` responses
with body `OK`.

Vite reads `.env` only at startup — restart the dev server after changing credentials.
