import type { Transition, Variants } from "motion/react";

/**
 * Motion presets ported verbatim from the Framer project.
 * Spring values (mass / stiffness / damping) and bezier curves are the exact
 * numbers Framer emits, so the timing feel is identical rather than "close".
 */

export const EASE_FRAMER = [0.44, 0, 0.56, 1] as const;
export const EASE_BANNER = [0.09, 0.89, 0.36, 0.96] as const;

/* ------------------------------------------------------------------ tweens */

type Bezier = [number, number, number, number];

export const tween = (
  duration: number,
  delay = 0,
  ease: readonly number[] = EASE_FRAMER,
): Transition => ({
  type: "tween",
  duration,
  delay,
  ease: [...ease] as Bezier,
});

export const spring = (
  stiffness: number,
  damping: number,
  mass = 1,
  delay = 0,
): Transition => ({ type: "spring", stiffness, damping, mass, delay });

/* -------------------------------------------------------- on-load appears */

/** Header notch pill — fades in after the page settles. */
export const appearNotch: Variants = {
  hidden: { opacity: 0.001 },
  visible: { opacity: 1, transition: tween(0.4, 0.7) },
};

/** Header bar — springs in just before the notch. */
export const appearHeader: Variants = {
  hidden: { opacity: 0.001 },
  visible: { opacity: 1, transition: spring(200, 60, 1, 0.6) },
};

/** Hero "Trusted by founders" cluster. */
export const appearFounders: Variants = {
  hidden: { opacity: 0.001, x: 20 },
  visible: { opacity: 1, x: 0, transition: tween(0.4, 1.4) },
};

/** Inline hero image pills — rise into place. */
export const appearPillUp = (delay: number): Variants => ({
  hidden: { opacity: 0.001, y: 20 },
  visible: { opacity: 1, y: 0, transition: spring(137, 30, 1.4, delay) },
});

/** Inline hero image pill that slides in from the right. */
export const appearPillRight = (delay: number): Variants => ({
  hidden: { opacity: 0.001, x: 20 },
  visible: { opacity: 1, x: 0, transition: spring(137, 30, 1.4, delay) },
});

/** Hero paragraph / CTA — slow, soft spring. */
export const appearSoftUp = (delay: number): Variants => ({
  hidden: { opacity: 0.001, y: 12 },
  visible: { opacity: 1, y: 0, transition: spring(52, 16, 1, delay) },
});

/** Hero banner image — perspective tilt reveal. */
export const appearBanner: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.8,
    rotateX: 35,
    transformPerspective: 3962,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transformPerspective: 3962,
    transition: tween(1, 0.2, EASE_BANNER),
  },
};

/* --------------------------------------------------------- scroll reveals */

/** Default section reveal — 40px rise on a loose spring. */
export const revealUp40: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: spring(66, 20, 1, 0) },
};

/** Heading reveal — 60px rise on a tight spring. */
export const revealUp60: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: spring(320, 60, 1, 0.2) },
};

/** Eyebrow reveal — long 160px travel, used above section headings. */
export const revealUp160: Variants = {
  hidden: { opacity: 0.001, y: 160 },
  visible: { opacity: 1, y: 0, transition: spring(200, 40, 1, 0.2) },
};

/** Footer reveal — 50px rise on a one-second tween. */
export const revealUp50: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: tween(1, 0.1) },
};

/** Horizontal reveal used by the About section. */
export const revealLeft60 = (delay = 0): Variants => ({
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: spring(300, 60, 1, delay) },
});

/* ------------------------------------------------------- character appear */

/** Per-character effect used by every split-text headline. */
export const CHAR_HIDDEN = {
  opacity: 0.001,
  y: 10,
  filter: "blur(10px)",
} as const;

export const CHAR_VISIBLE = {
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
} as const;

/** Stagger between characters, matching Framer's `delay: 0.05`. */
export const CHAR_STAGGER = 0.05;

/** On-mount character transition — a critically damped spring. */
export const charSpring: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.4,
};

/** On-scroll character transition — a 0.4s tween. */
export const charTween: Transition = tween(0.4);

/** Shared viewport config so every reveal triggers at the same point. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;
export const VIEWPORT_HALF = { once: true, amount: 0.5 } as const;
