import { stats, testimonials, testimonialsSection } from "../../../content/testimonials";
import { Counter } from "../../primitives/Counter/Counter";
import { SectionHeading } from "../../primitives/SectionHeading/SectionHeading";
import { Slider } from "../../primitives/Slider/Slider";
import styles from "./Testimonials.module.css";

function TestimonialCard({
  index,
  total,
  quote,
  name,
  role,
  image,
}: (typeof testimonials)[number] & { index: number; total: number }) {
  return (
    <figure className={styles.card}>
      <img className={styles.cardImage} src={image} alt="" aria-hidden="true" />
      <span className={styles.cardScrim} aria-hidden="true" />
      <span className={styles.cardBlur} aria-hidden="true" />
      <div className={styles.cardContent}>
        <div className={styles.cardIndex}>
          <span className={`t t-label ${styles.cardIndexCurrent}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`t t-label ${styles.cardIndexTotal}`}>
            {` / ${String(total).padStart(2, "0")}`}
          </span>
        </div>
        <div className={styles.cardBottom}>
          <blockquote className={`t t-quote ${styles.quote}`}>{quote}</blockquote>
          <figcaption className={styles.author}>
            <span className={`t t-labelMd ${styles.authorName}`}>{name}</span>
            <span className={`t t-label ${styles.authorRole}`}>{role}</span>
          </figcaption>
        </div>
      </div>
    </figure>
  );
}

/** Testimonials: animated statistics on a video-backed card beside a carousel. */
export function Testimonials() {
  return (
    <section className={styles.root} id="testimonials">
      <div className={styles.container}>
        <SectionHeading
          eyebrow={testimonialsSection.eyebrow}
          title={testimonialsSection.title}
        />

        <div className={styles.bottom}>
          <div className={styles.statsCard}>
            <div className={styles.statsInner}>
              <video
                className={styles.statsVideo}
                src={testimonialsSection.video}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
              />
              <span className={styles.statsScrim} aria-hidden="true" />
              <img
                className={styles.statsNoise}
                src={testimonialsSection.noise}
                alt=""
                aria-hidden="true"
              />
              {stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <Counter from={stat.from} to={stat.to} suffix={stat.suffix} />
                  <p className={`t t-label ${styles.statLabel}`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.sliderWrapper}>
            <Slider
              label="Client testimonials"
              slides={testimonials.map((item, index) => (
                <TestimonialCard
                  key={item.name}
                  {...item}
                  index={index}
                  total={testimonials.length}
                />
              ))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
