import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { localeInfo } from "@/i18n/config";
import { getContent } from "@/i18n/content";
import { resolveLocale } from "@/i18n/params";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/jsonld";
import { CONTENT_UPDATED } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import styles from "./privacy.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({ locale, path: "/privacy", meta: getContent(locale).privacy.meta });
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const locale = await resolveLocale(params);
  const { common, privacy } = getContent(locale);
  const crumbs: Crumb[] = [
    { name: common.nav.home, path: "/" },
    { name: privacy.title, path: "/privacy" },
  ];
  const updated = new Intl.DateTimeFormat(localeInfo[locale].hreflang, { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(`${CONTENT_UPDATED}T00:00:00Z`),
  );

  return (
    <>
      <article className={`section ${styles.root}`} aria-labelledby="page-title">
        <div className={`container ${styles.inner}`}>
          <Breadcrumbs locale={locale} crumbs={crumbs} label={common.nav.mainLabel} />
          <header className={styles.header}>
            <h1 id="page-title" className="t-h1">
              {privacy.title}
            </h1>
            <p className={styles.updated}>
              {privacy.updatedLabel}: <time dateTime={CONTENT_UPDATED}>{updated}</time>
            </p>
            <p className="t-lead">{privacy.intro}</p>
          </header>
          {privacy.sections.map((section, i) => (
            <section key={section.title} className={styles.section} aria-labelledby={`privacy-${i}`}>
              <h2 id={`privacy-${i}`} className={styles.heading}>
                <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
      <JsonLd data={graph(webPageSchema(locale, "/privacy", privacy.meta), breadcrumbSchema(locale, crumbs))} />
    </>
  );
}
