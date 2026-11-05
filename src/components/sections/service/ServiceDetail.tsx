import Link from "next/link";
import type { CSSProperties } from "react";
import type { CommonContent, ServiceContent, ServiceSlug } from "@/content/types";
import { localePath, type Locale } from "@/i18n/config";
import { serviceConfig } from "@/lib/services";
import { Icon, type IconName } from "../../ui/Icon";
import { SectionHeading } from "../../ui/SectionHeading";
import { FaqList } from "../FaqList";
import { ProcessSteps } from "../ProcessSteps";
import styles from "./ServiceDetail.module.css";

const reveal = (i: number) => ({ "--reveal-i": i }) as CSSProperties;
const pad = (n: number) => String(n).padStart(2, "0");

interface Props {
  locale: Locale;
  slug: ServiceSlug;
  service: ServiceContent;
  common: CommonContent;
  services: Record<ServiceSlug, ServiceContent>;
}

const benefitIcons: IconName[] = ["check", "growth", "security", "modules"];

/** Body of a service page, below the PageHero. */
export function ServiceDetail({ locale, slug, service, common, services }: Props) {
  const labels = common.servicePage;
  return (
    <>
      {/* Value proposition */}
      <section className={`section section--tight ${styles.value}`} aria-label={service.name}>
        <div className="container">
          <p className={`t-statement ${styles.valueText}`} data-reveal>
            <span className="tick" aria-hidden="true" /> {service.value}
          </p>
        </div>
      </section>

      {/* Problems */}
      <section className="section" data-tone="ink" aria-labelledby="problems-title">
        <div className="container">
          <SectionHeading id="problems-title" index="01" label={labels.problemsLabel} title={labels.problemsTitle} />
          <ol role="list" className={styles.problems}>
            {service.problems.map((item, i) => (
              <li key={item.title} className={styles.problem} data-reveal style={reveal(i)}>
                <span className={styles.no} aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <h3 className="t-h3">{item.title}</h3>
                <p className="t-body">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Benefits */}
      <section className="section" aria-labelledby="benefits-title">
        <div className="container">
          <SectionHeading id="benefits-title" index="02" label={labels.benefitsLabel} title={labels.benefitsTitle} />
          <ul role="list" className={styles.benefits}>
            {service.benefits.map((item, i) => (
              <li key={item.title} className={styles.benefit} data-reveal style={reveal(i % 2)}>
                <span className={styles.benefitIcon} aria-hidden="true">
                  <Icon name={benefitIcons[i] ?? "check"} />
                </span>
                <div>
                  <h3 className="t-h3">{item.title}</h3>
                  <p className="t-body">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Capabilities + use cases */}
      <section className="section" data-tone="paper" aria-labelledby="capabilities-title">
        <div className={`container ${styles.scope}`}>
          <div>
            <SectionHeading id="capabilities-title" index="03" label={labels.capabilitiesLabel} title={labels.capabilitiesTitle} />
            <ul role="list" className={styles.capabilities}>
              {service.capabilities.map((capability, i) => (
                <li key={capability} data-reveal style={reveal(i % 4)}>
                  <Icon name="check" size={18} strokeWidth={2.2} className={styles.check} />
                  {capability}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.useCases}>
            <h2 id="usecases-title" className={styles.useCasesLabel}>
              <span className="tick" aria-hidden="true" />
              {labels.useCasesTitle}
            </h2>
            <ul role="list" className={`brackets ${styles.useCaseList}`}>
              {service.useCases.map((item, i) => (
                <li key={item.title} data-reveal style={reveal(i)}>
                  <h3 className={styles.useCaseTitle}>{item.title}</h3>
                  <p className="t-small">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <SectionHeading id="process-title" index="04" label={labels.processLabel} title={labels.processTitle} />
          <ProcessSteps steps={service.process} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section" data-tone="paper" aria-labelledby="faq-title">
        <div className={`container ${styles.faq}`}>
          <SectionHeading id="faq-title" index="05" label={labels.faqLabel} title={labels.faqTitle} />
          <div data-reveal>
            <FaqList items={service.faqs} />
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="section section--tight" aria-labelledby="related-title">
        <div className="container">
          <SectionHeading id="related-title" label={labels.relatedLabel} title={labels.relatedTitle} />
          <ul role="list" className={styles.related}>
            {serviceConfig[slug].related.map((related, i) => (
              <li key={related} data-reveal style={reveal(i)}>
                <Link href={localePath(locale, `/services/${related}`)} className={styles.relatedCard}>
                  <span className={styles.relatedIcon} aria-hidden="true">
                    <Icon name={serviceConfig[related].icon} />
                  </span>
                  <span className={styles.relatedName}>{services[related].name}</span>
                  <span className="t-small">{services[related].summary}</span>
                  <span className={styles.relatedMore}>
                    {common.actions.learnMore}
                    <Icon name="arrowRight" size={16} strokeWidth={2.1} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
