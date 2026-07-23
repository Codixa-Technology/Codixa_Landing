import { asset } from "./site";

export const pricingSection = {
  eyebrow: "(Services)",
  title: "Explore Services",
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
    id: "landing-page",
    variant: "light",
    icon: asset("hkdh85c5wuRaQUC0E3ZaA2YqhY.png"),
    name: "Landing Page",
    description:
      "Create high-converting landing pages with modern layouts, smooth animations, and engaging user experiences designed to capture attention and turn visitors into customers.",
    deliveryLabel: "Delivery Time",
    deliveryValue: "1-5 days",
    price: [{ text: "Starting at $150", tone: "ink" }],
    features: [
      "Custom landing page design & development",
      "Beautiful animations and interactive sections",
      "Modern UI/UX with Figma & Framer workflow",
      "Fully responsive across all devices",
    ],
    cta: { label: "Get Started", href: "#contact" },
  },

  {
    id: "websites-platforms",
    variant: "dark",
    icon: asset("z20as7qIn0WJioZel35OsXkADw.svg"),
    name: "Web Sites Platforms",
    description:
      "Build powerful websites and digital platforms with premium design, advanced functionality, smooth animations, and scalable solutions tailored to your business needs.",
    deliveryLabel: "Delivery Time",
    deliveryValue: "Depending on the scale of the project",
    price: [{ text: "Starting at $400", tone: "white" }],
    features: [
      "Complete website and platform development",
      "Advanced animations and interactive experiences",
      "Custom frontend solutions and integrations",
      "Scalable architecture for future growth",
    ],
    cta: { label: "Get Started", href: "#contact" },
    background: asset("rPO1CKOqIOzSAvaQ1EYPMHZ0Ps.png"),
  },
];
