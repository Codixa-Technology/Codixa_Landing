import { revealUp160, revealUp60 } from "../../../lib/motion";
import { Reveal } from "../Reveal/Reveal";
import styles from "./SectionHeading.module.css";

export interface SectionHeadingProps {
  /** Parenthesised kicker above the watermark, e.g. "(Why clients love Codixa)". */
  eyebrow: string;
  title: string;
  className?: string;
  /** `soft` starts the fade lower (45% instead of 55%). */
  fade?: "default" | "soft";
}

/**
 * Oversized watermark heading used by Testimonials, Works, Intro and Contact:
 * a 204px Cal Sans title clipped to a fixed height with a top-down fade so the
 * following content overlaps it.
 */
export function SectionHeading({
  eyebrow,
  title,
  className,
  fade = "default",
}: SectionHeadingProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <Reveal className={`t t-label ${styles.eyebrow}`} variants={revealUp160} amount={0.5}>
        {eyebrow}
      </Reveal>
      <Reveal className={styles.heading} variants={revealUp60} amount={0.4}>
        <div className={`${styles.textBox} ${fade === "soft" ? styles.fadeSoft : ""}`}>
          <h2 className={`t t-displayXl ${styles.title}`}>
            <span className={styles.fill}>{title}</span>
          </h2>
        </div>
      </Reveal>
    </div>
  );
}
