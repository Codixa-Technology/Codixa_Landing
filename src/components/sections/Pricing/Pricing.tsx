import { plans, pricingSection, type Plan } from "../../../content/pricing";
import { charSpring } from "../../../lib/motion";
import { ArrowRight, IconCheck } from "../../primitives/Icon/icons";
import { SplitText } from "../../primitives/SplitText/SplitText";
import styles from "./Pricing.module.css";

const TONE_CLASS = {
  ink: styles.toneInk,
  white: styles.toneWhite,
  accent: styles.toneAccent,
} as const;

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <div
      className={`${styles.card} ${plan.variant === "dark" ? styles.cardDark : styles.cardLight}`}
      style={{ top: 50 + index * 24 }}
    >
      {plan.background && (
        <img className={styles.cardBackground} src={plan.background} alt="" aria-hidden="true" />
      )}

      <div className={styles.left}>
        <div className={styles.leftTop}>
          <span className={styles.icon} aria-hidden="true">
            <img src={plan.icon} alt="" />
          </span>
          <div className={styles.planText}>
            <h3 className={`t t-h6 ${styles.planName}`}>{plan.name}</h3>
            <p className={`t t-label ${styles.planDescription}`}>{plan.description}</p>
          </div>
        </div>

        <div className={styles.leftBottom}>
          <div className={styles.delivery}>
            <span className={`t t-label ${styles.deliveryLabel}`}>{plan.deliveryLabel}</span>
            <span className={`t t-label ${styles.deliveryValue}`}>{plan.deliveryValue}</span>
          </div>
          <span className={styles.rule} aria-hidden="true" />
        </div>
      </div>

      <div className={styles.right}>
        <div className={`${styles.price} ${plan.price.length > 1 ? styles.priceStacked : ""}`}>
          {plan.price.map((line) => (
            <p key={line.text} className={`t t-h3 ${styles.priceValue} ${TONE_CLASS[line.tone]}`}>
              {line.text}
            </p>
          ))}
          {plan.priceSuffix && (
            <span className={styles.priceSuffixWrap}>
              <span className={`t t-label ${styles.priceSuffix}`}>{plan.priceSuffix}</span>
            </span>
          )}
        </div>

        <span className={styles.rule} aria-hidden="true" />

        <ul className={styles.features}>
          {plan.features.map((feature) => (
            <li key={feature} className={styles.feature}>
              <span className={styles.featureIcon} aria-hidden="true">
                <IconCheck />
              </span>
              <span className={`t t-label ${styles.featureText}`}>{feature}</span>
            </li>
          ))}
        </ul>

        <a className={styles.cta} href={plan.cta.href}>
          <span className={styles.ctaBorder} aria-hidden="true" />
          <span className={styles.ctaBackground} aria-hidden="true" />
          <span className={`t t-label ${styles.ctaLabel}`}>{plan.cta.label}</span>
          <span className={styles.ctaIcon} aria-hidden="true">
            <ArrowRight width={20} height={20} />
          </span>
        </a>
      </div>
    </div>
  );
}

/** Pricing: two sticky-stacked plan cards under a split-text heading. */
export function Pricing() {
  return (
    <section className={styles.root} id="pricing">
      <div className={styles.container}>
        <div className={styles.head}>
          <p className={`t t-label ${styles.eyebrow}`}>{pricingSection.eyebrow}</p>
          <SplitText
            as="h2"
            text={pricingSection.title}
            className={`t t-h2 ${styles.heading}`}
            trigger="view"
            transition={charSpring}
          />
        </div>

        <div className={styles.body}>
          {plans.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
