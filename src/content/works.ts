import { asset } from "./site";

export const worksSection = {
  eyebrow: "(Why clients love Codixa)",
  title: "Recent Works",
  noise: asset("hiGYz6grmhAHSeZuNKHEuchTGTw.png"),
} as const;

export interface Work {
  slug: string;
  title: string;
  description: string;
  year: string;
  role: string;
  services: string[];
  image: string;
  background: string;
  href: string;
}

export const works: Work[] = [
  {
    slug: "archin",
    title: "Archin",
    description:
      "We’ve helped businesses across industries achieve their goals. Here are some of our selected works.",
    year: "2025",
    role: "Lead Designer",
    services: ["Website Design", "Product Design", "Branding", "Development"],
    image: asset("olR1jd1vAg59BKYSorw26ZNxY.png"),
    background: asset("x3RMizQqFhQ9G8jF5dqqcbxY8M.png"),
    href: "#works",
  },
  {
    slug: "vntnr",
    title: "VNTNR",
    description:
      "We've partnered with businesses across various industries to help them achieve their goals.",
    year: "2018",
    role: "Logo Designer",
    services: ["Designing", "Branding", "Redesigning", "Development"],
    image: asset("QhPkJGJBXS8kPS7IhPj7ZBGZpII.png"),
    background: asset("MHwFX5PK3mWp7JJNseH8110qdg.png"),
    href: "#works",
  },
  {
    slug: "aeorim",
    title: "Aeorim",
    description:
      "We’ve collaborated with companies from diverse sectors to turn their visions into reality. Here’s a look at some of our featured work.",
    year: "2023",
    role: "Website Designer",
    services: ["Branding", "Revamp", "Development", "Designing"],
    image: asset("yOPV9nZRSJXmNPqyeWfZSThWAc.png"),
    background: asset("jXErNhJ75aLqKEeFiIYT76adrM8.png"),
    href: "#works",
  },
];
