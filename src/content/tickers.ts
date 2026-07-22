import { asset } from "./site";

export const tickerIcon = asset("InxDM6L8xjRn2ZsMquQwkLQ0VLA.svg");

/** Two counter-rotated marquee bands sitting between the hero and about. */
export const tickerBands = [
  {
    id: "services",
    tone: "accent" as const,
    items: ["Website Design", "Brand Design", "Logo Design"],
  },
  {
    id: "credentials",
    tone: "ink" as const,
    items: ["Senior Designer", "10 Years of Experience", "Over 100 Customers"],
  },
];
