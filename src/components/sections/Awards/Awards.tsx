import { awards, awardsSection } from "../../../content/awards";
import { charSpring, revealUp40 } from "../../../lib/motion";
import { Reveal } from "../../primitives/Reveal/Reveal";
import { SplitText } from "../../primitives/SplitText/SplitText";
import styles from "./Awards.module.css";

/** Awards: a rule-separated table of recognitions, each row linking out. */
export function Awards() {
  return (
    <section className={styles.root} id="awards">
      <div className={styles.container}>
        <div className={styles.title}>
          <p className={`t t-label ${styles.eyebrow}`}>{awardsSection.eyebrow}</p>
          <SplitText
            as="h2"
            text={awardsSection.title}
            className={`t t-h2 ${styles.heading}`}
            trigger="view"
            transition={charSpring}
          />
        </div>

        <Reveal className={styles.list} variants={revealUp40} amount={0.15}>
          {awards.map((award) => (
            <a
              key={`${award.organisation}-${award.project}`}
              className={styles.row}
              href={award.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className={`t t-label ${styles.organisation}`}>{award.organisation}</span>
              <span className={styles.center}>
                <span className={`t t-bodyLg ${styles.achievement}`}>{award.achievement}</span>
              </span>
              <span className={`t t-label ${styles.project}`}>{award.project}</span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
