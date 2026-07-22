import { motion } from "motion/react";
import styles from "./Header.module.css";

const NAV_TRANSITION = { type: "spring", bounce: 0.2, duration: 0.4 } as const;

export interface NavLinkProps {
  label: string;
  href: string;
  onNavigate?: () => void;
}

/**
 * Navigation link with Framer's hover treatment: the label shifts to the accent
 * colour while a 2px underline grows from 1px to the full label width.
 */
export function NavLink({ label, href, onNavigate }: NavLinkProps) {
  return (
    <motion.a
      className={styles.navLink}
      href={href}
      onClick={onNavigate}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      animate="rest"
      transition={NAV_TRANSITION}
    >
      <motion.span
        className={`t t-label ${styles.navLabel}`}
        variants={{ rest: { color: "var(--c-gray)" }, hover: { color: "var(--c-accent)" } }}
        transition={NAV_TRANSITION}
      >
        {label}
      </motion.span>
      <motion.span
        className={styles.navUnderline}
        aria-hidden="true"
        variants={{
          rest: { opacity: 0, width: 1, backgroundColor: "var(--c-border-light)" },
          hover: { opacity: 1, width: "100%", backgroundColor: "var(--c-accent)" },
        }}
        transition={NAV_TRANSITION}
      />
    </motion.a>
  );
}
