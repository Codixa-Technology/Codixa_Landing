import { works, worksSection, type Work } from "../../../content/works";
import { charTween } from "../../../lib/motion";
import { SectionHeading } from "../../primitives/SectionHeading/SectionHeading";
import { SplitText } from "../../primitives/SplitText/SplitText";
import styles from "./Works.module.css";

/** Sticky offsets so each card parks a little lower than the previous one. */
const STICKY_TOP = [50, 80, 100];

function WorkCard({ work, index, total }: { work: Work; index: number; total: number }) {
  return (
    <article className={styles.card}>
      <img className={styles.cardBackground} src={work.background} alt="" aria-hidden="true" />
      <span className={styles.cardBlur} aria-hidden="true" />
      <img className={styles.cardNoise} src={worksSection.noise} alt="" aria-hidden="true" />

      <div className={styles.cardInner}>
        <div className={styles.cardLeft}>
          <div className={styles.descriptionRow}>
            <p className={`t t-label ${styles.description}`}>{work.description}</p>
          </div>

          <div className={styles.brand}>
            <div className={styles.counterRow}>
              <span className={`t t-label ${styles.counterCurrent}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={`t t-label ${styles.counterTotal}`}>
                {` / ${String(total).padStart(2, "0")}`}
              </span>
            </div>
            <SplitText
              as="h3"
              text={work.title}
              className={`t t-h2 ${styles.title}`}
              trigger="view"
              transition={charTween}
            />
          </div>
        </div>

        <div className={styles.cardRight}>
          <a className={styles.imageLink} href={work.href} aria-label={`${work.title} case study`}>
            <span className={styles.imageBorder} aria-hidden="true" />
            <span className={styles.imageFrame}>
              <img src={work.image} alt={`${work.title} project preview`} loading="lazy" />
            </span>
          </a>

          <dl className={styles.meta}>
            <div className={styles.metaTop}>
              <div className={styles.metaGroup}>
                <dt className={`t t-label ${styles.metaLabel}`}>Year</dt>
                <dd className={`t t-h6 ${styles.metaValueLarge}`}>{work.year}</dd>
              </div>
              <div className={`${styles.metaGroup} ${styles.metaGroupCentered}`}>
                <dt className={`t t-label ${styles.metaLabel}`}>Role</dt>
                <dd className={`t t-label ${styles.metaValue}`}>{work.role}</dd>
              </div>
            </div>
            <div className={styles.metaGroup}>
              <dt className={`t t-label ${styles.metaLabel}`}>Services</dt>
              {work.services.map((service) => (
                <dd key={service} className={`t t-label ${styles.metaValue}`}>
                  {service}
                </dd>
              ))}
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
}

/** Works: three case-study cards that stack as sticky layers while scrolling. */
export function Works() {
  return (
    <section className={styles.root} id="works">
      <div className={styles.container}>
        <SectionHeading eyebrow={worksSection.eyebrow} title={worksSection.title} />

        <div className={styles.stack}>
          {works.map((work, index) => (
            <div
              key={work.slug}
              className={styles.sticky}
              style={{ top: STICKY_TOP[index] ?? 100 }}
            >
              <WorkCard work={work} index={index} total={works.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
