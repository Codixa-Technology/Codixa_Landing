import { asset } from "./site";

export const tickerIcon = asset("InxDM6L8xjRn2ZsMquQwkLQ0VLA.svg");

/** Two counter-rotated marquee bands sitting between the hero and about. */
export const tickerBands = [
  {
    id: "services",
    tone: "accent" as const,
    items: ["Landing Page Animational", "CRM Platform", "Web Development"],
  },
  {
    id: "credentials",
    tone: "ink" as const,
    items: ["Frontend Development","Backend Development"],
  },
];
