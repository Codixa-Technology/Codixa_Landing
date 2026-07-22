import { motion } from "motion/react";
import { footer } from "../../../content/footer";
import { site } from "../../../content/site";
import { charTween, revealUp50, VIEWPORT } from "../../../lib/motion";
import { FooterLights } from "../../primitives/Icon/icons";
import { SplitText } from "../../primitives/SplitText/SplitText";
import { useLocalTime } from "../../../lib/useLocalTime";
import styles from "./Footer.module.css";

/** Site footer: link columns, live local clock, wordmark and progressive blur. */
export function Footer() {
  const time = useLocalTime(site.location.timeZone);

  return (
    <motion.footer
      className={styles.root}
      variants={revealUp50}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <div className={styles.container}>
        <img className={styles.background} src={footer.background} alt="" aria-hidden="true" />

        <div className={styles.top}>
          <div className={styles.menu}>
            {footer.columns.map((column) => (
              <div key={column.title} className={styles.column}>
                <p className={`t t-label ${styles.columnTitle}`}>{column.title}</p>
                <div className={styles.links}>
                  {column.links.map((link) => (
                    <a key={link.label} className={styles.link} href={link.href}>
                      <span className={`t t-h6 ${styles.linkLabel}`}>{link.label}</span>
                      <span className={styles.linkUnderline} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.bottomRow}>
            <p className={`t t-label ${styles.copyright}`}>{site.copyright}</p>

            <div className={styles.time}>
              <span className={`t t-label ${styles.timeLabel}`}>{`${site.location.label} → `}</span>
              <span className={`t t-label ${styles.clock}`}>{time}</span>
            </div>

            <p className={`t t-label ${styles.backToTop}`}>
              <a href="#top">
                <SplitText
                  as="span"
                  text={footer.backToTop}
                  trigger="view"
                  transition={charTween}
                />
              </a>
            </p>
          </div>

          <div className={styles.wordmark}>
            <img src={footer.wordmark} alt={site.name} loading="lazy" />
          </div>
        </div>
      </div>

      <FooterLights className={styles.lights} aria-hidden="true" />
      <div className={styles.progressiveBlur} aria-hidden="true" />
    </motion.footer>
  );
}
