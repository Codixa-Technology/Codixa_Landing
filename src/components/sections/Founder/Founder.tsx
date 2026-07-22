import type { ReactNode } from "react";
import { motion } from "motion/react";
import { founder } from "../../../content/founder";
import { charSpring, revealUp50, spring, tween, VIEWPORT_HALF } from "../../../lib/motion";
import { IconDribbble, IconInstagram, IconX } from "../../primitives/Icon/icons";
import { Reveal } from "../../primitives/Reveal/Reveal";
import { SectionHeading } from "../../primitives/SectionHeading/SectionHeading";
import { SplitText } from "../../primitives/SplitText/SplitText";
import styles from "./Founder.module.css";

const SOCIAL_ICONS: Record<string, ReactNode> = {
  x: <IconX />,
  dribbble: <IconDribbble />,
  instagram: <IconInstagram />,
};

/** Intro: portrait card with social links beside the founder bio and timeline. */
export function Founder() {
  return (
    <section className={styles.root} id="intro">
      <div className={styles.container}>
        <SectionHeading eyebrow={founder.eyebrow} title={founder.watermark} fade="soft" />

        <div className={styles.bottom}>
          <motion.div
            className={styles.portrait}
            initial={{ opacity: 0, x: -90 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_HALF}
            transition={spring(300, 60)}
          >
            <img className={styles.portraitImage} src={founder.portrait} alt="Franklin Clinton" />
            <span className={styles.portraitBlur} aria-hidden="true" />
            <div className={styles.socials}>
              {founder.socials.map((social) => (
                <a
                  key={social.id}
                  className={styles.social}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                >
                  {SOCIAL_ICONS[social.id]}
                </a>
              ))}
            </div>
          </motion.div>

          <img className={styles.badge} src={founder.badge} alt="" aria-hidden="true" />

          <Reveal className={styles.right} variants={revealUp50} amount={0.3}>
            <div className={styles.content}>
              <SplitText
                as="h3"
                text={founder.heading}
                className={`t t-h4 ${styles.heading}`}
                trigger="view"
                transition={charSpring}
              />
              <p className={`t t-bodyLg ${styles.bio}`}>{founder.bio}</p>
            </div>

            <span className={styles.line} aria-hidden="true" />

            <ul className={styles.timeline}>
              {founder.timeline.map((item, index) => (
                <motion.li
                  key={item.role}
                  className={styles.timelineRow}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={VIEWPORT_HALF}
                  transition={tween(0.6, index * 0.1)}
                >
                  <span className={`t t-label ${styles.timelineRole}`}>{item.role}</span>
                  <span className={`t t-label ${styles.timelinePeriod}`}>{item.period}</span>
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
