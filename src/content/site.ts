/**
 * Global site content. Everything a copywriter is likely to touch lives in
 * `src/content` — components read from here and never hard-code strings.
 */

export const asset = (file: string) => `/assets/images/${file}`;

export const site = {
  name: "Codixa",
  tagline: "Modern Portfolio & Creative Agency",
  description:
    "Codixa is a sleek and minimal portfolio template built for creatives, designers, developers, and agencies who want to showcase their work in a bold and professional way.",
  logo: asset("Logo.svg"),
  email: "codixatechnologies@gmail.com",
  location: { label: "Yerevan", timeZone: "Asia/Yerevan" },
  copyright: "© 2026 Codixa. All rights reserved.",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Works", href: "#works" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
];

export const navCta: NavItem = { label: "Contact", href: "#contact" };

export const announcement = "Company Ready for Projects";
