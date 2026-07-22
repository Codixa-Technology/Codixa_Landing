import { asset } from "./site";

export const founder = {
  eyebrow: "(Intro)",
  watermark: "Meet Finton",
  heading: "The Founder",
  bio: "Franklin Clinton is a visual designer focused on crafting bold, functional design systems. He works with creative teams and startups to build standout brands and seamless digital experiences. Based in London, he balances clarity with character — and enjoys experimenting with motion design and interactive visuals in his spare time.",
  portrait: asset("cdiudTEW8MSbl2008vSYXSq9ndI.png"),
  badge: asset("JpJ9ryMkQp811zxkS5X8I8Igdo.png"),
  socials: [
    { id: "x", label: "Twitter (X)", href: "https://x.com" },
    { id: "dribbble", label: "Dribbble", href: "https://dribbble.com" },
    { id: "instagram", label: "Instagram", href: "https://instagram.com" },
  ],
  timeline: [
    { role: "Founder at Codixa", period: "2024-Now" },
    { role: "Brand Designer at Google", period: "2023-2024" },
    { role: "Web Designer at Shopify", period: "2018-2023" },
    { role: "Junior Designer at Meta", period: "2015-2018" },
  ],
} as const;
