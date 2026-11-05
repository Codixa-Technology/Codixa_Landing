export const locales = ["en", "hy", "ru"] as const;

export type Locale = (typeof locales)[number];

/** English is the x-default language and the target of the "/" redirect. */
export const defaultLocale: Locale = "en";

export const localeInfo: Record<
  Locale,
  { label: string; name: string; ogLocale: string; hreflang: string }
> = {
  en: { label: "EN", name: "English", ogLocale: "en_US", hreflang: "en" },
  hy: { label: "HY", name: "Հայերեն", ogLocale: "hy_AM", hreflang: "hy" },
  ru: { label: "RU", name: "Русский", ogLocale: "ru_RU", hreflang: "ru" },
};

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/**
 * Builds a locale-prefixed internal path. `path` is locale-agnostic and starts
 * with "/" ("/" for the homepage, "/services/crm-development", ...).
 */
export const localePath = (locale: Locale, path = "/"): string =>
  path === "/" ? `/${locale}` : `/${locale}${path}`;

/** Removes the leading locale segment from a pathname, returning "/" for the root. */
export const stripLocale = (pathname: string): string => {
  const [, first, ...rest] = pathname.split("/");
  if (first && isLocale(first)) {
    const tail = rest.join("/");
    return tail ? `/${tail}` : "/";
  }
  return pathname || "/";
};
