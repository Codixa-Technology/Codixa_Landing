/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  readonly VITE_EMAILJS_NOTIFY_SERVICE_ID: string;
  readonly VITE_EMAILJS_NOTIFY_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_REPLY_SERVICE_ID: string;
  readonly VITE_EMAILJS_REPLY_TEMPLATE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
