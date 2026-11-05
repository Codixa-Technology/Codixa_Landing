import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { Crumb } from "@/lib/jsonld";
import { Breadcrumbs } from "./Breadcrumbs";
import styles from "./PageHero.module.css";

interface PageHeroProps {
  locale: Locale;
  crumbs: Crumb[];
  breadcrumbLabel: string;
  label: string;
  title: string;
  intro: string;
  actions?: ReactNode;
  aside?: ReactNode;
}

/** Hero for inner pages: breadcrumbs, mono label, H1, intro, optional actions and visual. */
export function PageHero({ locale, crumbs, breadcrumbLabel, label, title, intro, actions, aside }: PageHeroProps) {
  return (
    <section className={`section ${styles.root}`} data-tone="paper" aria-labelledby="page-title">
      <div className={`hairgrid ${styles.grid}`} aria-hidden="true" />
      <div className={`container ${styles.inner} ${aside ? styles.withAside : ""}`}>
        <div className={styles.text}>
          <Breadcrumbs locale={locale} crumbs={crumbs} label={breadcrumbLabel} />
          <p className={styles.label}>
            <span className="tick" aria-hidden="true" />
            {label}
          </p>
          <h1 id="page-title" className="t-h1">
            {title}
          </h1>
          <p className={`t-lead ${styles.intro}`}>{intro}</p>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
        {aside && <div className={styles.aside}>{aside}</div>}
      </div>
    </section>
  );
}
