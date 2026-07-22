import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import styles from "./RevealText.module.css";

export interface RevealTextProps {
  text: string;
  /** Characters before this index are painted in the "revealed" colour up-front. */
  transitionStartIndex?: number;
  from?: string;
  to?: string;
  className?: string;
  /** Seconds each character takes to cross-fade between the two colours. */
  duration?: number;
}

interface CharProps {
  char: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
  duration: number;
  from: string;
  to: string;
  revealed: boolean;
}

function RevealChar({ char, start, end, progress, duration, from, to, revealed }: CharProps) {
  const color = useTransform(progress, [start, end], [from, to]);
  return (
    <motion.span
      style={{ color: revealed ? to : color }}
      transition={{ duration, ease: "easeInOut" }}
    >
      {char}
    </motion.span>
  );
}

/**
 * Scroll-linked text reveal: words are laid out as wrapping flex items and each
 * character shifts from muted grey to ink as the block scrolls through the
 * viewport (`start 0.75` → `start 0.15`).
 */
export function RevealText({
  text,
  transitionStartIndex = 0,
  from = "#5c5c5c",
  to = "#000000",
  className,
  duration = 0.3,
}: RevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "start 0.15"],
  });

  const words = text.split(" ");
  let characterIndex = 0;

  return (
    <p ref={ref} className={[styles.root, className].filter(Boolean).join(" ")}>
      {words.map((word, wordIndex) => {
        const wordStart = wordIndex / words.length;
        const wordEnd = (wordIndex + 1) / words.length;
        const step = (wordEnd - wordStart) / word.length;
        const offset = characterIndex;
        characterIndex += word.length + 1;

        return (
          <span key={`${word}-${wordIndex}`}>
            {Array.from(word).map((char, charIndex) => (
              <RevealChar
                key={charIndex}
                char={char}
                start={wordStart + step * charIndex}
                end={wordStart + step * (charIndex + 1)}
                progress={scrollYProgress}
                duration={duration}
                from={from}
                to={to}
                revealed={offset + charIndex < transitionStartIndex}
              />
            ))}
            {" "}
          </span>
        );
      })}
    </p>
  );
}
