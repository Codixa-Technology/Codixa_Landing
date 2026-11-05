import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Everything public is crawlable. No "Host" directive (non-standard, ignored by
 * Google) and no Disallow rules, because the site has no private paths.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
