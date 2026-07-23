import { asset } from "./site";

export const founder = {
  eyebrow: "(Intro)",
  watermark: "Andranik Baghdasaryan",
  heading: "The Founder",
  bio: "Junior Frontend Developer with hands-on experience building modern, scalable, and responsive web applications. Passionate about transforming complex Figma designs into pixel-perfect, high-performance interfaces using React, TypeScript, JavaScript, and modern frontend technologies. Experienced in delivering production-ready features, reusable components, and intuitive user experiences across multiple real-world projects.",
  portrait: asset("And.png"),
  badge: asset("JpJ9ryMkQp811zxkS5X8I8Igdo.png"),
  socials: [
    { id: "x", label: "Twitter (X)", href: "https://x.com" },
    { id: "dribbble", label: "Dribbble", href: "https://dribbble.com" },
    { id: "instagram", label: "Instagram", href: "https://instagram.com" },
  ],
  timeline: [
    { role: "Intern Frontend Developer at Picsart Academy", period: "2025-2025" },
    { role: "Junior Frontend Developer at V Telecom", period: "2026-Now" },
    { role: "Junior Frontend Developer at Solicy", period: "2026-Now" },
    { role: "Founder at Codixa", period: "2025-Now" },
  ],
} as const;
