import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { announcement, navCta, navItems, site } from "../../../content/site";
import { appearHeader, appearNotch } from "../../../lib/motion";
import { Button } from "../../primitives/Button/Button";
import { NotchShape } from "../../primitives/Icon/icons";
import { NavLink } from "./NavLink";
import styles from "./Header.module.css";

/**
 * Site header. On desktop and tablet it sits in the flow above the hero; below
 * 810px it becomes a fixed bar whose menu expands from a clipped 116px shell.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <div className={styles.container}>
      <header className={`${styles.root} ${open ? styles.open : ""}`}>
        <motion.div
          className={styles.notch}
          variants={appearNotch}
          initial="hidden"
          animate="visible"
        >
          <NotchShape className={styles.notchShape} aria-hidden="true" />
          <span className={styles.notchDot} aria-hidden="true" />
          <p className={`t t-label ${styles.notchText}`}>{announcement}</p>
        </motion.div>

        <motion.div
          className={styles.bar}
          variants={appearHeader}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.left}>
            <a className={styles.logo} href="#top" aria-label={`${site.name} — home`}>
              <img src={site.logo} alt="" width={117} height={37} />
            </a>
            <button
              type="button"
              className={styles.hamburger}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <motion.span
                className={styles.hamburgerLine}
                animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
              <motion.span
                className={styles.hamburgerLine}
                animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            </button>
          </div>

          <nav className={styles.nav} aria-label="Primary">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} onNavigate={() => setOpen(false)} />
            ))}
          </nav>

          <div className={styles.cta}>
            <Button label={navCta.label} href={navCta.href} variant="secondary" fullWidth />
          </div>
        </motion.div>

        <div className={styles.spacer} aria-hidden="true" />
      </header>
    </div>
  );
}
