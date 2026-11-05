import type { PageMeta } from "@/content/types";
import { localeInfo, localePath, locales, type Locale } from "@/i18n/config";
import { absoluteUrl, site } from "./site";

/**
 * Schema.org builders. Only verified facts are used — no ratings, reviews or
 * aggregate scores are ever emitted.
 */

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

type Json = Record<string, unknown>;

export function organizationSchema(description: string): Json {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(site.mark),
      width: 1254,
      height: 1254,
    },
    image: absoluteUrl(site.ogImage("en")),
    description,
    email: site.email,
    foundingDate: site.foundingYear,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressCountry: site.address.country,
    },
    founder: { "@type": "Person", name: "Andranik Baghdasaryan" },
    knowsLanguage: locales.map((l) => localeInfo[l].hreflang),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      availableLanguage: ["English", "Armenian", "Russian"],
    },
    ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {}),
  };
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: locales.map((l) => localeInfo[l].hreflang),
    publisher: { "@id": ORG_ID },
  };
}

export interface Crumb {
  name: string;
  /** Locale-agnostic path. */
  path: string;
}

export function breadcrumbSchema(locale: Locale, crumbs: Crumb[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(localePath(locale, crumb.path)),
    })),
  };
}

export function webPageSchema(
  locale: Locale,
  path: string,
  meta: PageMeta,
  type: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" = "WebPage",
): Json {
  const url = absoluteUrl(localePath(locale, path));
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: localeInfo[locale].hreflang,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
  };
}

export function serviceSchema(locale: Locale, path: string, name: string, description: string): Json {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(localePath(locale, path))}#service`,
    name,
    serviceType: name,
    description,
    url: absoluteUrl(localePath(locale, path)),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Place", name: "Worldwide" },
  };
}

/** Wraps nodes in a single @graph document. */
export const graph = (...nodes: Json[]): Json => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
