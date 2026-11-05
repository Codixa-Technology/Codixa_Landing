import type { CSSProperties } from "react";
import type { Item } from "@/content/types";
import styles from "./ProcessSteps.module.css";

/** Numbered stepper (brand G6 "Dividers & markers"). Horizontal on desktop, vertical on mobile. */
export function ProcessSteps({ steps }: { steps: Item[] }) {
  return (
    <ol role="list" className={styles.list} style={{ "--count": steps.length } as CSSProperties}>
      {steps.map((step, index) => (
        <li key={step.title} className={styles.step} data-reveal style={{ "--reveal-i": index } as CSSProperties}>
          <span className={styles.marker} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className={`t-h3 ${styles.title}`}>{step.title}</h3>
          <p className={styles.text}>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
