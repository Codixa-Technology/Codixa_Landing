export const about = {
  revealText:
    "We help fast moving digital startups launch sharper brands and websites — with clarity , speed, and no drama.",
  /** Characters before this index start out already revealed. */
  transitionStartIndex: 51,
  chips: [
    { label: "Branding", icon: "sparkle" },
    { label: "Logo", icon: "globe" },
    { label: "Website", icon: "globe" },
    { label: "Illustration", icon: "palette" },
    { label: "Interface", icon: "window" },
    { label: "Strategy", icon: "compass" },
  ],
} as const;

export type ChipIcon = (typeof about.chips)[number]["icon"];
