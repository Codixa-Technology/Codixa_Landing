import type { Metadata } from "next";
import type { PageMeta } from "@/content/types";
import { defaultLocale, localeInfo, localePath, locales, type Locale } from "@/i18n/config";
import { absoluteUrl, site } from "./site";

interface BuildMetadataInput {
  locale: Locale;
  /** Locale-agnostic path, e.g. "/" or "/services/crm-development". */
  path: string;
  meta: PageMeta;
  /** Homepage puts the brand first; every other page appends it. */
  isHome?: boolean;
  noindex?: boolean;
}

/** hreflang map for a path that exists in every locale, plus x-default. */
export const languageAlternates = (path: string): Record<string, string> => {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[localeInfo[locale].hreflang] = absoluteUrl(localePath(locale, path));
  }
  languages["x-default"] = absoluteUrl(localePath(defaultLocale, path));
  return languages;
};

export const pageTitle = (meta: PageMeta, isHome = false) =>
  isHome ? `${site.name} — ${meta.title}` : `${meta.title} | ${site.name}`;

export function buildMetadata({ locale, path, meta, isHome = false, noindex = false }: BuildMetadataInput): Metadata {
  const url = absoluteUrl(localePath(locale, path));
  const title = pageTitle(meta, isHome);

  return {
    title: { absolute: title },
    description: meta.description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title,
      description: meta.description,
      locale: localeInfo[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeInfo[l].ogLocale),
      images: [{ url: site.ogImage(locale), width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: meta.description,
      images: [site.ogImage(locale)],
    },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}
