import { useCallback, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import styles from "./Slider.module.css";

export interface SliderProps {
  slides: ReactNode[];
  /** Accessible label for the arrow controls. */
  label: string;
  className?: string;
}

/** Framer's slider transition: `{ type: "spring", stiffness: 200, damping: 40 }`. */
const SLIDE_TRANSITION = { type: "spring", stiffness: 200, damping: 40 } as const;

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 5 L8 12 L15 19" : "M9 5 L16 12 L9 19"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * One-slide-at-a-time carousel with the arrow controls anchored bottom-right,
 * matching the Framer slider used for testimonials.
 */
export function Slider({ slides, label, className }: SliderProps) {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);

  const paginate = useCallback(
    (step: number) => {
      setState(([current]) => [(current + step + slides.length) % slides.length, step]);
    },
    [slides.length],
  );

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(" ")}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className={styles.viewport}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            className={styles.slide}
            custom={direction}
            variants={{
              enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={SLIDE_TRANSITION}
          >
            {slides[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => paginate(-1)}
          aria-label={`${label}: previous`}
        >
          <Chevron direction="left" />
        </button>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => paginate(1)}
          aria-label={`${label}: next`}
        >
          <Chevron direction="right" />
        </button>
      </div>
    </div>
  );
}
