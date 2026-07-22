import { motion, type Variants } from "motion/react";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { VIEWPORT } from "../../../lib/motion";

export interface RevealProps {
  children: ReactNode;
  variants: Variants;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Fraction of the element that must be visible before playing. */
  amount?: number;
  once?: boolean;
  id?: string;
}

/**
 * Scroll-triggered wrapper. Keeps `whileInView` boilerplate out of sections and
 * guarantees every reveal in the page uses the same viewport threshold.
 */
export function Reveal({
  children,
  variants,
  as = "div",
  className,
  style,
  amount = VIEWPORT.amount,
  once = true,
  id,
}: RevealProps) {
  const Component = motion[as as "div"];
  return (
    <Component
      id={id}
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </Component>
  );
}
