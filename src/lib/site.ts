/** Verified company facts. Do not add details here that have not been confirmed. */
export const site = {
  name: "Codixa Technologies",
  shortName: "Codixa",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://codixa.space").replace(/\/+$/, ""),
  email: "codixatechnologies@gmail.com",
  foundingYear: "2025",
  address: { locality: "Yerevan", country: "AM" },
  logo: "/brand/codixa-wordmark.svg",
  mark: "/brand/codixa-mark.png",
  ogImage: (locale: string) => `/brand/og-${locale}.png`,
  /** Official social profiles. Add real URLs only. */
  socials: [] as { label: string; href: string }[],
} as const;

export const absoluteUrl = (path: string) => `${site.url}${path === "/" ? "" : path}`;
