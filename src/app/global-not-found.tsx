import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { localeInfo, locales } from "@/i18n/config";
import { site } from "@/lib/site";
import { fontVariables } from "./fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: `404 — Page not found | ${site.name}`,
  description: "The page you are looking for does not exist.",
};

const copy = {
  en: { title: "This page doesn’t exist.", cta: "Go to the homepage" },
  hy: { title: "Այս էջը գոյություն չունի։", cta: "Անցնել գլխավոր էջ" },
  ru: { title: "Такой страницы нет.", cta: "Перейти на главную" },
} as const;

/** Rendered for URLs outside every locale (e.g. /some-old-link). */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <main
          className="section hairgrid"
          data-tone="paper"
          style={{ minHeight: "100dvh", display: "grid", alignContent: "center" }}
        >
          <div className="container" style={{ display: "grid", gap: "2.5rem", maxWidth: "48rem", marginInline: "auto" }}>
            <Link href="/en" aria-label={site.name} style={{ width: 150 }}>
              <Logo />
            </Link>
            <p className="t-label" style={{ color: "var(--ember)" }}>
              404
            </p>
            <ul role="list" style={{ display: "grid", gap: "1.75rem" }}>
              {locales.map((locale) => (
                <li key={locale} lang={localeInfo[locale].hreflang} style={{ display: "grid", gap: "0.5rem" }}>
                  {locale === "en" ? (
                    <h1 className="t-h2">{copy[locale].title}</h1>
                  ) : (
                    <p className="t-h2">{copy[locale].title}</p>
                  )}
                  <Link className="link" href={`/${locale}`}>
                    {copy[locale].cta} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </body>
    </html>
  );
}
