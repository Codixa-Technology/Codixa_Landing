import { memo, useMemo } from "react";
import { motion, type Transition } from "motion/react";
import {
  CHAR_HIDDEN,
  CHAR_STAGGER,
  CHAR_VISIBLE,
  charSpring,
  charTween,
  VIEWPORT_HALF,
} from "../../../lib/motion";
import styles from "./SplitText.module.css";

type Trigger = "mount" | "view";

export interface SplitTextProps {
  /** Text to reveal. Words never break; characters animate individually. */
  text: string;
  /** Element rendered around the split content. */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
  /** Seconds before the first character starts. */
  startDelay?: number;
  /** Seconds between consecutive characters. */
  stagger?: number;
  /** `mount` plays on load, `view` plays when scrolled into view. */
  trigger?: Trigger;
  transition?: Transition;
  /** Continues the stagger of a previous SplitText on the same visual line. */
  indexOffset?: number;
  style?: React.CSSProperties;
}

const WORD_SPLIT = /(\s+)/;

/**
 * Framer's "appear per character" text effect: each glyph fades up from 10px
 * with a 10px blur, staggered left-to-right.
 */
function SplitTextImpl({
  text,
  as = "span",
  className,
  startDelay = 0,
  stagger = CHAR_STAGGER,
  trigger = "mount",
  transition,
  indexOffset = 0,
  style,
}: SplitTextProps) {
  const words = useMemo(() => {
    let index = indexOffset;
    return text
      .split(WORD_SPLIT)
      .filter((part) => part.length > 0)
      .map((part, partIndex) => {
        if (/^\s+$/.test(part)) {
          return { key: `s${partIndex}`, space: true as const, chars: [] };
        }
        const chars = Array.from(part).map((char) => ({
          char,
          index: index++,
        }));
        return { key: `w${partIndex}`, space: false as const, chars };
      });
  }, [text, indexOffset]);

  const Tag = motion[as];
  const charTransition = transition ?? (trigger === "mount" ? charSpring : charTween);

  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      {...(trigger === "mount"
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: VIEWPORT_HALF })}
      aria-label={text}
    >
      {words.map((word) =>
        word.space ? (
          // A breakable space so long headlines still wrap between words.
          <span key={word.key} className={styles.space}>
            {" "}
          </span>
        ) : (
          <span key={word.key} className={styles.word} aria-hidden="true">
            {word.chars.map(({ char, index }) => (
              <motion.span
                key={index}
                className={styles.char}
                variants={{
                  hidden: CHAR_HIDDEN,
                  visible: {
                    ...CHAR_VISIBLE,
                    transition: {
                      ...charTransition,
                      delay: startDelay + index * stagger,
                    },
                  },
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ),
      )}
    </Tag>
  );
}

export const SplitText = memo(SplitTextImpl);
