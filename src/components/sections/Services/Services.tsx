import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { defaultServiceId, services, servicesSection } from "../../../content/services";
import { charSpring, tween, VIEWPORT_HALF } from "../../../lib/motion";
import { Chip } from "../../primitives/Chip/Chip";
import { Marquee } from "../../primitives/Marquee/Marquee";
import { SplitText } from "../../primitives/SplitText/SplitText";
import styles from "./Services.module.css";

/** Services: tabbed showcase over a full-bleed marquee of the active service. */
export function Services() {
  const [activeId, setActiveId] = useState(defaultServiceId);
  const active = services.find((service) => service.id === activeId) ?? services[0];

  return (
    <section className={styles.root} id="services">
      <div className={styles.container}>
        <div className={styles.top}>
          <header className={styles.header}>
            <p className={`t t-label ${styles.eyebrow}`}>{servicesSection.eyebrow}</p>
            <SplitText
              as="h2"
              text={servicesSection.title}
              className={`t t-h2 ${styles.title}`}
              trigger="view"
              transition={charSpring}
            />
          </header>
        </div>

        <div className={styles.panel}>
          <div className={styles.tabs} role="tablist" aria-label="Service categories">
            {services.map((service) => {
              const isActive = service.id === active.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                  onClick={() => setActiveId(service.id)}
                >
                  <span className={styles.tabDotWrap}>
                    <span className={styles.tabDot} aria-hidden="true" />
                  </span>
                  <span className={`t t-labelMd ${styles.tabLabel}`}>{service.label}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.content}>
            <motion.div
              className={styles.imageBox}
              initial={{ opacity: 0, x: 118 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_HALF}
              transition={tween(0.6, 0.4)}
            >
              <span className={styles.imageBorder} aria-hidden="true" />
              <div className={styles.imageFrame}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active.id}
                    src={active.image}
                    alt={`${active.label} preview`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={tween(0.4)}
                  />
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.p
              className={`t t-label ${styles.description}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 1 }}
              transition={tween(0.6, 0.4)}
            >
              {active.description}
            </motion.p>

            <motion.div
              className={styles.tags}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_HALF}
              transition={tween(0.6)}
            >
              {active.tags.map((tag) => (
                <Chip key={tag} label={tag} size="bare" className={styles.tag} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className={styles.marquee} aria-hidden="true">
        <Marquee gap={48} speed={50} itemHeight={140}>
          {[0, 1, 2].map((index) => (
            <span key={index} className={styles.marqueeItem}>
              <img
                className={styles.marqueeIcon}
                src={servicesSection.marqueeIcon}
                alt=""
                aria-hidden="true"
              />
              <span className={`t t-counter ${styles.marqueeText}`}>{active.label}</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
