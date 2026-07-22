import type { ReactNode } from "react";
import { about } from "../../../content/about";
import { revealLeft60 } from "../../../lib/motion";
import { Chip } from "../../primitives/Chip/Chip";
import {
  IconCompass,
  IconGlobe,
  IconPalette,
  IconSparkle,
  IconWindow,
  SignatureMark,
} from "../../primitives/Icon/icons";
import { Reveal } from "../../primitives/Reveal/Reveal";
import { RevealText } from "../../primitives/RevealText/RevealText";
import styles from "./About.module.css";

const CHIP_ICONS: Record<string, ReactNode> = {
  sparkle: <IconSparkle />,
  globe: <IconGlobe />,
  palette: <IconPalette />,
  window: <IconWindow />,
  compass: <IconCompass />,
};

/** About: bracketed signature mark, scroll-linked statement, capability chips. */
export function About() {
  return (
    <section className={styles.root} id="about">
      <div className={styles.container}>
        <div className={styles.top}>
          <Reveal className={styles.mark} variants={revealLeft60()} amount={0.5}>
            <p className={`t t-lead ${styles.bracket}`}>(</p>
            <SignatureMark className={styles.signature} aria-hidden="true" />
            <p className={`t t-lead ${styles.bracket}`}>)</p>
          </Reveal>

          <div className={styles.content}>
            <div className={styles.revealWrapper}>
              <RevealText
                text={about.revealText}
                transitionStartIndex={about.transitionStartIndex}
              />
            </div>
          </div>
        </div>

        <Reveal className={styles.chips} variants={revealLeft60(0.6)} amount={0.5}>
          {about.chips.map((chip) => (
            <Chip key={chip.label} label={chip.label} icon={CHIP_ICONS[chip.icon]} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
