import { asset } from "./site";

/**
 * The hero headline is a mixed run of animated text and inline image "pills".
 * Each row is laid out as a centred flex row, exactly like the Framer design.
 */
export type HeadlineToken =
  | { kind: "text"; text: string; tone: "ink" | "gray" | "accent"; startDelay: number }
  | { kind: "image"; src: string; alt: string; delay: number; enter: "up" | "right"; hideOnMobile?: boolean };


/*Option 1 (Recommended):
Creating professional websites for companies based in Armenia.

Option 2 (ավելի premium/agency style):
Building professional websites and digital experiences for companies in Armenia.

Option 3 (ավելի կարճ, նման քո օրինակին):
Professional website development for companies based in Armenia.

Option 4 (ավելի creative):
Crafting modern, high-quality websites for Armenian companies and brands.

Քո ուղարկած ոճին ամենամոտը կլինի՝
"Professional website development for companies based in Armenia."*/

export const heroHeadline: HeadlineToken[][] = [
  [
    { kind: "text", text: "Building", tone: "ink", startDelay: 0.2 },
    {
      kind: "image",
      src: asset("luFfRKwjQbMAmBeknRUvUg7XY.svg"),
      alt: "Abstract mark",
      delay: 0.6,
      enter: "up",
      hideOnMobile: true,
    },
    { kind: "text", text: "professional", tone: "accent", startDelay: 0.4 },
  ],
  [
    { kind: "text", text: "websites", tone: "gray", startDelay: 0.6 },
    {
      kind: "image",
      src: asset("q6Lt0wxatBudeFMJylqNDhblWfw.png"),
      alt: "Design team at work",
      delay: 0.6,
      enter: "up",
      hideOnMobile: true,
    },
    { kind: "text", text: "for", tone: "ink", startDelay: 0.8 },
    { kind: "text", text: "companies", tone: "ink", startDelay: 1.0 },
  ],
  [
    { kind: "text", text: "based in", tone: "gray", startDelay: 1.2 },
    { kind: "text", text: "Armenia,", tone: "ink", startDelay: 1.4 },
    {
      kind: "image",
      src: asset("republicSquare.png"),
      alt: "London skyline",
      delay: 1,
      enter: "right",
      hideOnMobile: true,
    },
    { kind: "text", text: "Yerevan", tone: "ink", startDelay: 1.6 },
  ],
];

export const hero = {
  eyebrow: "Trusted by founders.",
  avatars: [
    { src: asset("LdiJIgo7vhBde0WiWHd48uSzxU.png"), alt: "Founder portrait" },
    { src: asset("I9yoNS4RgoWEeRpJDtgEIoLAd4Y.png"), alt: "Founder portrait" },
    { src: asset("G5E86VA7DStEga3pPtCu3nwW1qE.png"), alt: "Founder portrait" },
  ],
  paragraph:
    "We make it easy for startups to launch,grow, and scale with clean , conversion focused designs —no delays, no drama.",
  cta: { label: "View Plans", href: "#pricing" },
  banner: {
    src: asset("dT5S1njJpyHvznBNeTmMAwfBcqQ.png"),
    alt: "Codixa studio showreel",
  },
} as const;

export const clientLogos = [
  { src: asset("3cWSgJFsUVvZeOw9LdQmTOSVFhE.svg"), alt: "Client logo" },
  { src: asset("nfabfL1KTOOmw22T9soWodkE5Q.svg"), alt: "Client logo" },
  { src: asset("pFmkT2mGzyfTzJsLN2Lr3fdbIk.svg"), alt: "Client logo" },
  { src: asset("oqkjAivG8qVmaPBg07Z4Yst8rwk.svg"), alt: "Client logo" },
  { src: asset("nmwtsE1SWD34rSXL3OhLE7CTn0.svg"), alt: "Client logo" },
  { src: asset("zhMiNUjAyE25vd6XOETCIwS38.svg"), alt: "Client logo" },
];
