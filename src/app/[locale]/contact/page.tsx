import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { localePath } from "@/i18n/config";
import { getContent } from "@/i18n/content";
import { resolveLocale } from "@/i18n/params";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { serviceSlugs } from "@/lib/services";
import { site } from "@/lib/site";
import styles from "./contact.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({ locale, path: "/contact", meta: getContent(locale).contact.meta });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = await resolveLocale(params);
  const { common, contact, form, services } = getContent(locale);
  const crumbs: Crumb[] = [
    { name: common.nav.home, path: "/" },
    { name: contact.label, path: "/contact" },
  ];
  const serviceOptions = [
    ...serviceSlugs.map((slug) => ({ value: slug, label: services[slug].name })),
    { value: "other", label: form.otherService },
  ];

  return (
    <>
      <section className={`section ${styles.root}`} data-tone="paper" aria-labelledby="page-title">
        <div className={`hairgrid ${styles.grid}`} aria-hidden="true" />
        <div className={`container ${styles.layout}`}>
          <div className={styles.info}>
            <Breadcrumbs locale={locale} crumbs={crumbs} label={common.nav.mainLabel} />
            <p className={styles.label}>
              <span className="tick" aria-hidden="true" />
              {contact.label}
            </p>
            <h1 id="page-title" className="t-h1">
              {contact.title}
            </h1>
            <p className="t-lead">{contact.intro}</p>

            <dl className={styles.details}>
              <div>
                <dt>
                  <Icon name="mail" size={20} />
                  {contact.emailLabel}
                </dt>
                <dd>
                  <a href={`mailto:${site.email}`} className={styles.email}>
                    {site.email}
                  </a>
                  <span className="t-small">{contact.responseNote}</span>
                </dd>
              </div>
              <div>
                <dt>
                  <Icon name="pin" size={20} />
                  {contact.locationLabel}
                </dt>
                <dd>{contact.location}</dd>
              </div>
            </dl>
          </div>

          <div className={styles.formCard}>
            <h2 className="t-h3">{form.title}</h2>
            <p className={`t-small ${styles.formIntro}`}>{form.intro}</p>
            <ContactForm
              locale={locale}
              content={form}
              serviceOptions={serviceOptions}
              email={site.email}
              privacyHref={localePath(locale, "/privacy")}
            />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="next-title">
        <div className="container">
          <div className={styles.nextHead} data-reveal>
            <p className={styles.label}>
              <span className="tick" aria-hidden="true" />
              {contact.nextSteps.label}
            </p>
            <h2 id="next-title" className="t-h2">
              {contact.nextSteps.title}
            </h2>
          </div>
          <ol role="list" className={styles.steps}>
            {contact.nextSteps.items.map((item, i) => (
              <li key={item.title} data-reveal style={{ "--reveal-i": i } as CSSProperties}>
                <span className={styles.stepNo} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3">{item.title}</h3>
                <p className="t-body">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <JsonLd data={graph(webPageSchema(locale, "/contact", contact.meta, "ContactPage"), breadcrumbSchema(locale, crumbs))} />
    </>
  );
}
