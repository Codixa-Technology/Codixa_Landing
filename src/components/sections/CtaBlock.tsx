import type { CommonContent } from "@/content/types";
import { localePath, type Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import { ButtonLink } from "../ui/Button";
import { Icon } from "../ui/Icon";
import styles from "./CtaBlock.module.css";

/** Closing conversion block: one orange action, one direct email route. */
export function CtaBlock({ locale, common }: { locale: Locale; common: CommonContent }) {
  const { ctaBlock, actions } = common;
  return (
    <section className={`section ${styles.root}`} data-tone="ink" aria-labelledby="cta-title">
      <div className={styles.lines} aria-hidden="true" />
      <div className={styles.cut} aria-hidden="true" />
      <div className={`container ${styles.inner}`} data-reveal>
        <p className={styles.label}>
          <span className="tick" aria-hidden="true" />
          {ctaBlock.label}
        </p>
        <h2 id="cta-title" className={`t-h1 ${styles.title}`}>
          {ctaBlock.title}
        </h2>
        <p className={`t-lead ${styles.text}`}>{ctaBlock.text}</p>
        <div className={styles.actions}>
          <ButtonLink href={localePath(locale, "/contact")} size="lg">
            {actions.startProject}
          </ButtonLink>
          <a href={`mailto:${site.email}`} className={styles.mail}>
            <Icon name="mail" size={20} />
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
