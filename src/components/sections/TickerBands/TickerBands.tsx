import { tickerBands, tickerIcon } from "../../../content/tickers";
import { revealUp40 } from "../../../lib/motion";
import { Marquee } from "../../primitives/Marquee/Marquee";
import { Reveal } from "../../primitives/Reveal/Reveal";
import styles from "./TickerBands.module.css";

const TONE_CLASS = { accent: styles.accent, ink: styles.ink } as const;
const ROTATION_CLASS = [styles.bandTop, styles.bandBottom] as const;

/** Two counter-rotated marquee ribbons crossing the page under the hero. */
export function TickerBands() {
  return (
    <Reveal className={styles.root} variants={revealUp40}>
      <div className={styles.band}>
        <div className={styles.stage}>
          {tickerBands.map((band, index) => (
            <div
              key={band.id}
              className={`${styles.ribbon} ${ROTATION_CLASS[index]} ${TONE_CLASS[band.tone]}`}
            >
              <div className={styles.ribbonTrack}>
                <Marquee gap={32} speed={50} itemHeight={170}>
                  {band.items.map((item) => (
                    <span key={item} className={styles.card}>
                      <img className={styles.cardIcon} src={tickerIcon} alt="" aria-hidden="true" />
                      <span className={`t t-h5 ${styles.cardTitle}`}>{item}</span>
                    </span>
                  ))}
                </Marquee>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
