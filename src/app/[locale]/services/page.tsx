import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceIndex } from "@/components/sections/ServiceIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getContent } from "@/i18n/content";
import { resolveLocale } from "@/i18n/params";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { serviceSlugs } from "@/lib/services";
import styles from "./services.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({ locale, path: "/services", meta: getContent(locale).servicesIndex.meta });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const locale = await resolveLocale(params);
  const { common, servicesIndex, services } = getContent(locale);
  const crumbs: Crumb[] = [
    { name: common.nav.home, path: "/" },
    { name: servicesIndex.label, path: "/services" },
  ];

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={crumbs}
        breadcrumbLabel={common.nav.mainLabel}
        label={servicesIndex.label}
        title={servicesIndex.title}
        intro={servicesIndex.intro}
      />
      <section className="section" aria-label={servicesIndex.label}>
        <div className="container">
          <ServiceIndex locale={locale} slugs={serviceSlugs} services={services} detailed headingLevel="h2" />
        </div>
      </section>
      <section className="section" data-tone="ink" aria-labelledby="guide-title">
        <div className="container">
          <SectionHeading
            id="guide-title"
            label={servicesIndex.guide.label}
            title={servicesIndex.guide.title}
            text={servicesIndex.guide.text}
            layout="split"
          />
          <ul role="list" className={styles.guide}>
            {servicesIndex.guide.items.map((item, i) => (
              <li key={item.title} className={styles.guideItem} data-reveal style={{ "--reveal-i": i } as CSSProperties}>
                <p className={styles.quote}>{item.title}</p>
                <p className={styles.answer}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBlock locale={locale} common={common} />
      <JsonLd
        data={graph(webPageSchema(locale, "/services", servicesIndex.meta, "CollectionPage"), breadcrumbSchema(locale, crumbs))}
      />
    </>
  );
}
