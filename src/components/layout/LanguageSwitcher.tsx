"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeInfo, localePath, locales, stripLocale, type Locale } from "@/i18n/config";
import styles from "./LanguageSwitcher.module.css";

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
  tone?: "light" | "dark";
  onNavigate?: () => void;
}

/**
 * EN / HY / RU as real links: crawlable, keyboard-accessible and preserving the
 * current page. Every route exists in all three locales, so the equivalent
 * page is always available.
 */
export function LanguageSwitcher({ locale, label, tone = "light", onNavigate }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const path = stripLocale(pathname);

  return (
    <nav aria-label={label} className={`${styles.root} ${tone === "dark" ? styles.dark : ""}`}>
      <ul role="list" className={styles.list}>
        {locales.map((code) => {
          const active = code === locale;
          return (
            <li key={code}>
              <Link
                href={localePath(code, path)}
                hrefLang={localeInfo[code].hreflang}
                lang={localeInfo[code].hreflang}
                aria-current={active ? "true" : undefined}
                title={localeInfo[code].name}
                className={`${styles.link} ${active ? styles.active : ""}`}
                onClick={onNavigate}
              >
                <span aria-hidden="true">{localeInfo[code].label}</span>
                <span className="visually-hidden">{localeInfo[code].name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
