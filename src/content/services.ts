import { asset } from "./site";

export const servicesSection = {
  eyebrow: "(Services)",
  title: "What we do",
  marqueeIcon: asset("7LCWzuhI2N54jKdu359awJ6cKLU.svg"),
} as const;

export interface Service {
  id: string;
  label: string;
  description: string;
  image: string;
  tags: string[];
}

export const services: Service[] = [
  {
    id: "web",
    label: "Web Design",
    description:
      "We create modern, responsive websites that engage users and drive results.",
    image: asset("EBtg3SqsQjHY12Y56g88GlQL89c.png"),
    tags: ["UX/UI Design", "Responsive Layouts", "Web Development"],
  },
  {
    id: "brand",
    label: "Brand Design",
    description: "We build bold, cohesive brand identities that leave a lasting impression.",
    image: asset("L3jNOIvjVNNJ9KYGN7ZewlhM4.png"),
    tags: ["Visual Identity", "Style Guides", "Brand Strategy"],
  },
  {
    id: "logo",
    label: "Logo Design",
    description: "We design clean, memorable logos that capture your brand’s essence.",
    image: asset("mGTS39QW9IxZNmTiGsB4Jssv2Ps.png"),
    tags: ["Logo Marks", "Wordmarks", "Icon Design"],
  },
];

/** Tab shown first, matching the Framer default variant. */
export const defaultServiceId = "brand";
