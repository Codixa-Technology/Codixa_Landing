import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { defaultOpenFaq, faqColumns, faqSection, type FaqItem } from "../../../content/faq";
import { charSpring, revealUp50, tween } from "../../../lib/motion";
import { MinusCircle, PlusCircle } from "../../primitives/Icon/icons";
import { Reveal } from "../../primitives/Reveal/Reveal";
import { SplitText } from "../../primitives/SplitText/SplitText";
import styles from "./Faq.module.css";

const key = (column: number, index: number) => `${column}-${index}`;

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <Reveal className={styles.itemWrapper} variants={revealUp50} amount={0.3}>
      <button
        type="button"
        className={styles.item}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className={styles.itemTop}>
          <span className={`t t-bodyLg ${styles.question}`}>{item.question}</span>
          <span className={styles.itemIcon} aria-hidden="true">
            {isOpen ? <MinusCircle /> : <PlusCircle />}
          </span>
        </span>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.span
              className={styles.answerWrapper}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={tween(0.4)}
            >
              <span className={`t t-bodyLg ${styles.answer}`}>{item.answer}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </Reveal>
  );
}

/** FAQ: two accordion columns beneath a split-text heading. */
export function Faq() {
  const [openKey, setOpenKey] = useState<string | null>(key(...defaultOpenFaq));

  return (
    <section className={styles.root} id="faq">
      <div className={styles.container}>
        <div className={styles.top}>
          <p className={`t t-label ${styles.eyebrow}`}>{faqSection.eyebrow}</p>
          <SplitText
            as="h2"
            text={faqSection.title}
            className={`t t-h2 ${styles.heading}`}
            trigger="view"
            transition={charSpring}
          />
          <p className={`t t-label ${styles.subtitle}`}>{faqSection.subtitle}</p>
        </div>

        <div className={styles.bottom}>
          {faqColumns.map((column, columnIndex) => (
            <div key={columnIndex} className={styles.column}>
              {column.map((item, index) => {
                const itemKey = key(columnIndex, index);
                return (
                  <AccordionItem
                    key={itemKey}
                    item={item}
                    isOpen={openKey === itemKey}
                    onToggle={() => setOpenKey(openKey === itemKey ? null : itemKey)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
