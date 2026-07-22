import { asset } from "./site";

export const testimonialsSection = {
  eyebrow: "(Why clients love Codixa)",
  title: "Testimonials",
  video: "/assets/video/9IyrvqTIS8G7u6wZuFBiSs2aL0.mp4",
  noise: asset("qDuGmDXhhbdrJsP16G4zNCDX8.png"),
} as const;

export const stats = [
  { from: 1, to: 26, suffix: "+", label: "Finalized Projects" },
  { from: 18, to: 98, suffix: "%", label: "Client satisfaction rate" },
  { from: 1, to: 10, suffix: "M", label: "Gross Revenue" },
];

export const testimonials = [
  {
    quote:
      "“Franklin turned our ideas into a sharp, clean brand. Fast, easy, and right on point.”",
    name: "Ethan Moore",
    role: "Co-founder,NovaTech",
    image: asset("nURHcgFo9S6zVF3j0ly85sSmvE.png"),
  },
  {
    quote:
      "“Clear, thoughtful, and fast — Franklin made the whole process effortless.”",
    name: "Olivia Tran",
    role: "Creative Director, Bloom Agency",
    image: asset("j4kitBgDVx6ElGDAGtpxlM7RoHg.png"),
  },
  {
    quote: "“Smart design, smooth delivery. Franklin is great to work with.”",
    name: "Lucas Bennett",
    role: "Product Manager, Hexa Studio",
    image: asset("4be4S5coR2QthuRAfsb7USMjRZ0.png"),
  },
];
