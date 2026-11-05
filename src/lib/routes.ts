import { en } from "@/content/en";
import { serviceSlugs } from "@/content/types";

/** Date the public content last changed. Update when publishing content edits. */
export const CONTENT_UPDATED = "2026-11-05";

/**
 * Every public, indexable, locale-agnostic path. Each one exists in all three
 * locales. Work routes only appear once verified projects are published.
 */
export function publicPaths(): string[] {
  const hasWork = en.work.projects.length > 0;
  return [
    "/",
    "/services",
    ...serviceSlugs.map((slug) => `/services/${slug}`),
    ...(hasWork ? ["/work", ...en.work.projects.map((p) => `/work/${p.slug}`)] : []),
    "/about",
    "/contact",
    "/privacy",
  ];
}
