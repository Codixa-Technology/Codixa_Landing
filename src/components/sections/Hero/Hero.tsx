import { motion } from "motion/react";
import { clientLogos, hero, heroHeadline, type HeadlineToken } from "../../../content/hero";
import {
  appearBanner,
  appearFounders,
  appearPillRight,
  appearPillUp,
  appearSoftUp,
  charSpring,
  revealUp40,
  VIEWPORT,
} from "../../../lib/motion";
import { Button } from "../../primitives/Button/Button";
import { Marquee } from "../../primitives/Marquee/Marquee";
import { SplitText } from "../../primitives/SplitText/SplitText";
import styles from "./Hero.module.css";

const TONE_CLASS = {
  ink: styles.toneInk,
  gray: styles.toneGray,
  accent: styles.toneAccent,
} as const;

function HeadlineImage({ token }: { token: Extract<HeadlineToken, { kind: "image" }> }) {
  const variants = token.enter === "right" ? appearPillRight(token.delay) : appearPillUp(token.delay);
  return (
    <motion.span
      className={`${styles.pill} ${token.hideOnMobile ? styles.hideOnMobile : ""}`}
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <img src={token.src} alt={token.alt} loading="eager" decoding="async" />
    </motion.span>
  );
}

/**
 * Hero: staggered character headline interleaved with image pills, a founder
 * avatar cluster, the primary CTA, a perspective-tilt banner reveal and the
 * client logo ticker.
 */
export function Hero() {
  return (
    <section className={styles.root} id="hero">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <motion.div
              className={styles.founders}
              variants={appearFounders}
              initial="hidden"
              animate="visible"
            >
              <div className={styles.avatars}>
                {hero.avatars.map((avatar, index) => (
                  <span key={avatar.src} className={styles[`avatar${index + 1}` as "avatar1"]}>
                    <img src={avatar.src} alt={avatar.alt} width={32} height={32} loading="eager" />
                  </span>
                ))}
              </div>
              <p className={`t t-label ${styles.eyebrow}`}>{hero.eyebrow}</p>
            </motion.div>

            <h1 className={styles.headline}>
              <span className="sr-only">
                {heroHeadline
                  .flat()
                  .map((token) => (token.kind === "text" ? token.text : ""))
                  .filter(Boolean)
                  .join(" ")}
              </span>
              {heroHeadline.map((row, rowIndex) => (
                <span className={styles.headlineRow} key={rowIndex} aria-hidden="true">
                  {row.map((token, tokenIndex) =>
                    token.kind === "image" ? (
                      <HeadlineImage key={tokenIndex} token={token} />
                    ) : (
                      <SplitText
                        key={tokenIndex}
                        as="span"
                        text={token.text}
                        className={`t t-display1 ${styles.headlineText} ${TONE_CLASS[token.tone]}`}
                        startDelay={token.startDelay}
                        transition={charSpring}
                      />
                    ),
                  )}
                </span>
              ))}
            </h1>

            <motion.p
              className={`t t-body ${styles.paragraph}`}
              variants={appearSoftUp(1.4)}
              initial="hidden"
              animate="visible"
            >
              {hero.paragraph}
            </motion.p>
          </div>

          <motion.div variants={appearSoftUp(1.6)} initial="hidden" animate="visible">
            <Button label={hero.cta.label} href={hero.cta.href} variant="primary" withIcon />
          </motion.div>
        </div>

        <motion.div
          className={styles.banner}
          variants={appearBanner}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.bannerFrame}>
            <img src={hero.banner.src} alt={hero.banner.alt} loading="eager" decoding="async" />
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.logos}
        variants={revealUp40}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <div className={styles.logosInner}>
          <Marquee gap={80} speed={50} itemHeight={32}>
            {clientLogos.map((logo) => (
              <span key={logo.src} className={styles.logo}>
                <img src={logo.src} alt={logo.alt} loading="lazy" />
              </span>
            ))}
          </Marquee>
        </div>
      </motion.div>
    </section>
  );
}
