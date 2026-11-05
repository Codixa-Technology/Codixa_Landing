import type { MetadataRoute } from "next";
import { localePath, locales } from "@/i18n/config";
import { CONTENT_UPDATED, publicPaths } from "@/lib/routes";
import { languageAlternates } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const priority = (path: string) =>
  path === "/" ? 1 : path === "/services" || path.startsWith("/services/") ? 0.9 : path === "/privacy" ? 0.3 : 0.7;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths().flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, path)),
      lastModified: CONTENT_UPDATED,
      changeFrequency: path === "/privacy" ? "yearly" : "monthly",
      priority: priority(path),
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
