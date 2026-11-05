import type { NextConfig } from "next";

/**
 * EmailJS credentials were configured on Vercel under VITE_* names by the
 * previous Vite build. Re-expose them to the browser bundle so the existing
 * production variables keep working without touching the Vercel dashboard.
 * These are public identifiers (EmailJS scopes them per domain), not secrets.
 */
const emailEnv = (name: string) =>
  process.env[`NEXT_PUBLIC_${name}`] ?? process.env[`VITE_${name}`] ?? "";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: false,
  experimental: {
    globalNotFound: true,
  },
  env: {
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: emailEnv("EMAILJS_PUBLIC_KEY"),
    NEXT_PUBLIC_EMAILJS_NOTIFY_SERVICE_ID: emailEnv("EMAILJS_NOTIFY_SERVICE_ID"),
    NEXT_PUBLIC_EMAILJS_NOTIFY_TEMPLATE_ID: emailEnv("EMAILJS_NOTIFY_TEMPLATE_ID"),
    NEXT_PUBLIC_EMAILJS_REPLY_SERVICE_ID: emailEnv("EMAILJS_REPLY_SERVICE_ID"),
    NEXT_PUBLIC_EMAILJS_REPLY_TEMPLATE_ID: emailEnv("EMAILJS_REPLY_TEMPLATE_ID"),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // The previous single-page site lived at "/". English is the x-default
      // language, so the root permanently resolves to the English homepage.
      { source: "/", destination: "/en", permanent: true },
      // Bare section paths without a locale (typed by hand or linked externally).
      { source: "/:page(services|about|contact|privacy|work)", destination: "/en/:page", permanent: true },
      { source: "/services/:slug", destination: "/en/services/:slug", permanent: true },
      // Common aliases for the legal page.
      { source: "/:locale(en|hy|ru)/privacy-policy", destination: "/:locale/privacy", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
