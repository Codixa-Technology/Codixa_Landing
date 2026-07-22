import { asset } from "./site";

export const pricingSection = {
  eyebrow: "(Pricing Plan)",
  title: "Explore Pricing",
} as const;

export interface PriceLine {
  text: string;
  tone: "ink" | "white" | "accent";
}

export interface Plan {
  id: string;
  variant: "light" | "dark";
  icon: string;
  name: string;
  description: string;
  deliveryLabel: string;
  deliveryValue: string;
  price: PriceLine[];
  priceSuffix?: string;
  features: string[];
  cta: { label: string; href: string };
  background?: string;
}

export const plans: Plan[] = [
  {
    id: "standard",
    variant: "light",
    icon: asset("hkdh85c5wuRaQUC0E3ZaA2YqhY.png"),
    name: "Standard Plan",
    description:
      "Ideal for lean teams or startups needing clean, fast design delivery for websites or branding assets.",
    deliveryLabel: "Delivery Time",
    deliveryValue: "4-6weeks",
    price: [{ text: "500$", tone: "ink" }],
    priceSuffix: "/month",
    features: [
      "You provide the wireframe",
      "Visual design using Figma & Framer",
      "Focused on website or branding only",
      "Weekday turnaround (Mon–Fri)",
    ],
    cta: { label: "Get Started", href: "#contact" },
  },
  {
    id: "premium",
    variant: "dark",
    icon: asset("z20as7qIn0WJioZel35OsXkADw.svg"),
    name: "Premium Plan",
    description:
      "A complete design experience — tailored strategy, polished visuals, and flexible collaboration throughout the process.",
    deliveryLabel: "Delivery Time",
    deliveryValue: "4-6weeks",
    price: [
      { text: "Starting at", tone: "white" },
      { text: "$1000", tone: "accent" },
    ],
    features: [
      "Help shaping your wireframe or brief",
      "Custom design for website, brand, or logo",
      "High-fidelity mockups using Figma & Framer",
      "Dedicated weekday focus & deeper involvement",
    ],
    cta: { label: "Get Started", href: "#contact" },
    background: asset("rPO1CKOqIOzSAvaQ1EYPMHZ0Ps.png"),
  },
];
