import type { Faq } from "@/content/types";
import { Icon } from "../ui/Icon";
import styles from "./FaqList.module.css";

/** Native <details> accordion: keyboard and screen-reader support without JavaScript. */
export function FaqList({ items, headingLevel = 3 }: { items: Faq[]; headingLevel?: 3 | 4 }) {
  const Heading = headingLevel === 3 ? "h3" : "h4";
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details key={item.question} className={styles.item}>
          <summary className={styles.summary}>
            <Heading className={styles.question}>{item.question}</Heading>
            <span className={styles.icon} aria-hidden="true">
              <Icon name="plus" size={20} />
            </span>
          </summary>
          <div className={styles.answer}>
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
