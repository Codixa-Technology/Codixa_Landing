import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  label: string;
  title: ReactNode;
  text?: string;
  /** Two-digit sequence number shown before the label, e.g. "02". */
  index?: string;
  as?: "h1" | "h2";
  layout?: "stacked" | "split";
  id?: string;
}

/** Brand "section number" label (orange rule + mono caps), heading and optional lead. */
export function SectionHeading({ label, title, text, index, as: Heading = "h2", layout = "stacked", id }: SectionHeadingProps) {
  return (
    <header className={`${styles.root} ${layout === "split" ? styles.split : ""}`} data-reveal>
      <div className={styles.titleCol}>
        <p className={styles.label}>
          <span className={styles.rule} aria-hidden="true" />
          {index && <span className={styles.index}>{index}</span>}
          <span>{label}</span>
        </p>
        <Heading id={id} className={Heading === "h1" ? "t-h1" : "t-h2"}>
          {title}
        </Heading>
      </div>
      {text && <p className={`t-lead ${styles.text}`}>{text}</p>}
    </header>
  );
}
