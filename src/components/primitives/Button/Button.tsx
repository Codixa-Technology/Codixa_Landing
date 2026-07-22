import { motion } from "motion/react";
import type { ReactNode } from "react";
import { ArrowRight } from "../Icon/icons";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps {
  label: string;
  href?: string;
  variant?: ButtonVariant;
  /** Renders the 20px arrow glyph after the label. */
  withIcon?: boolean;
  icon?: ReactNode;
  newTab?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

/** Framer's button spring: `{ type: "spring", bounce: 0.2, duration: 0.4 }`. */
const BUTTON_TRANSITION = { type: "spring", bounce: 0.2, duration: 0.4 } as const;

/**
 * The site's pill button. Two variants mirror the Framer component:
 * `primary` (solid ink, drop shadow, gap grows on hover) and `secondary`
 * (translucent white wash, lighter shadow, background lifts on hover).
 */
export function Button({
  label,
  href,
  variant = "primary",
  withIcon = false,
  icon,
  newTab,
  fullWidth,
  className,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = [
    styles.root,
    styles[variant],
    fullWidth ? styles.fullWidth : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className={styles.border} aria-hidden="true" />
      {variant === "secondary" && <span className={styles.background} aria-hidden="true" />}
      <span className={`t t-labelMd ${styles.label}`}>{label}</span>
      {(withIcon || icon) && (
        <span className={styles.icon} aria-hidden="true">
          {icon ?? <ArrowRight width={20} height={20} />}
        </span>
      )}
    </>
  );

  const motionProps = {
    className: classes,
    initial: false,
    whileHover: "hover",
    whileTap: { scale: 0.98 },
    transition: BUTTON_TRANSITION,
    variants: {
      hover:
        variant === "secondary"
          ? { backgroundColor: "rgba(51, 51, 51, 0.85)", gap: 18 }
          : { gap: 18 },
    },
  } as const;

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noreferrer noopener" : undefined}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button {...motionProps} type={type} onClick={onClick}>
      {content}
    </motion.button>
  );
}
