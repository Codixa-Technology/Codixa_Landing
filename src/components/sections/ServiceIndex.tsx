import Link from "next/link";
import type { CSSProperties } from "react";
import type { ServiceContent, ServiceSlug } from "@/content/types";
import { localePath, type Locale } from "@/i18n/config";
import { serviceConfig } from "@/lib/services";
import { Icon } from "../ui/Icon";
import styles from "./ServiceIndex.module.css";

interface ServiceIndexProps {
  locale: Locale;
  slugs: readonly ServiceSlug[];
  services: Record<ServiceSlug, ServiceContent>;
  /** Show the first capabilities as tags (services overview page). */
  detailed?: boolean;
  headingLevel?: "h2" | "h3";
}

/** Editorial index of services — numbered rows rather than a card grid. */
export function ServiceIndex({ locale, slugs, services, detailed = false, headingLevel: Heading = "h3" }: ServiceIndexProps) {
  return (
    <ol role="list" className={`${styles.list} ${detailed ? styles.detailed : ""}`}>
      {slugs.map((slug, index) => {
        const service = services[slug];
        return (
          <li key={slug} data-reveal style={{ "--reveal-i": index % 4 } as CSSProperties}>
            <Link href={localePath(locale, `/services/${slug}`)} className={styles.row}>
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.icon} aria-hidden="true">
                <Icon name={serviceConfig[slug].icon} />
              </span>
              <span className={styles.body}>
                <Heading className={styles.name}>{service.name}</Heading>
                <span className={styles.summary}>{service.summary}</span>
                {detailed && (
                  <span className={styles.tags}>
                    {service.capabilities.slice(0, 4).map((capability) => (
                      <span key={capability} className={styles.tag}>
                        {capability}
                      </span>
                    ))}
                  </span>
                )}
              </span>
              <span className={styles.arrow} aria-hidden="true">
                <Icon name="arrowUpRight" size={22} />
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
