import type { ReactNode } from "react";
import styles from "./Chip.module.css";

export type ChipSize = "md" | "sm" | "bare";

export interface ChipProps {
  label: string;
  icon?: ReactNode;
  size?: ChipSize;
  className?: string;
}

/**
 * Dark translucent pill with a hairline border and inner highlight — used for
 * the about-section capability tags and the works-card service tags.
 */
export function Chip({ label, icon, size = "md", className }: ChipProps) {
  return (
    <span className={[styles.root, styles[size], className].filter(Boolean).join(" ")}>
      <span className={styles.border} aria-hidden="true" />
      <span className={styles.background} aria-hidden="true" />
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={`t t-label ${styles.label}`}>{label}</span>
    </span>
  );
}
