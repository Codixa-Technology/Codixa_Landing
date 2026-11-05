import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getContent } from "@/i18n/content";
import { resolveLocale } from "@/i18n/params";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import founderPortrait from "../../../../public/images/founder.png";
import styles from "./about.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({ locale, path: "/about", meta: getContent(locale).about.meta });
}

const pad = (n: number) => String(n).padStart(2, "0");
const reveal = (i: number) => ({ "--reveal-i": i }) as CSSProperties;

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = await resolveLocale(params);
  const { common, about } = getContent(locale);
  const crumbs: Crumb[] = [
    { name: common.nav.home, path: "/" },
    { name: about.label, path: "/about" },
  ];

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={crumbs}
        breadcrumbLabel={common.nav.mainLabel}
        label={about.label}
        title={about.title}
        intro={about.intro}
      />

      <section className="section" aria-labelledby="story-title">
        <div className={`container ${styles.story}`}>
          <SectionHeading id="story-title" index="01" label={about.story.label} title={about.story.title} />
          <div className={styles.storyBody}>
            {about.story.paragraphs.map((paragraph, i) => (
              <p key={paragraph} className={i === 0 ? "t-lead" : "t-body"} data-reveal style={reveal(i)}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-tone="ink" aria-labelledby="direction-title">
        <div className="container">
          <h2 id="direction-title" className={styles.directionLabel}>
            <span className="tick" aria-hidden="true" />
            {about.direction.label}
          </h2>
          <div className={styles.direction}>
            {[about.direction.vision, about.direction.mission].map((item) => (
              <div key={item.title} className={styles.directionItem} data-reveal>
                <h3 className={styles.directionTitle}>{item.title}</h3>
                <p className={styles.directionText}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="approach-title">
        <div className="container">
          <SectionHeading id="approach-title" index="02" label={about.approach.label} title={about.approach.title} />
          <ol role="list" className={styles.approach}>
            {about.approach.items.map((item, i) => (
              <li key={item.title} data-reveal style={reveal(i % 2)}>
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

      <section className="section" data-tone="paper" aria-labelledby="values-title">
        <div className="container">
          <SectionHeading id="values-title" index="03" label={about.values.label} title={about.values.title} />
          <ul role="list" className={styles.values}>
            {about.values.items.map((item, i) => (
              <li key={item.title} data-reveal style={reveal(i)}>
                <span className={styles.valueNo} aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <h3 className={styles.valueTitle}>{item.title}</h3>
                <p className="t-small">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="founder-title">
        <div className={`container ${styles.founder}`}>
          <figure className={styles.portrait} data-reveal>
            <Image
              src={founderPortrait}
              alt={about.founder.imageAlt}
              sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 90vw"
              placeholder="blur"
              className={styles.portraitImg}
            />
            <span className={styles.portraitCut} aria-hidden="true" />
          </figure>
          <div className={styles.founderText} data-reveal>
            <p className={styles.directionLabel}>
              <span className="tick" aria-hidden="true" />
              {about.founder.label}
            </p>
            <h2 id="founder-title" className="t-h2">
              {about.founder.name}
            </h2>
            <p className={styles.role}>{about.founder.role}</p>
            <p className="t-lead">{about.founder.text}</p>
          </div>
        </div>
      </section>

      <CtaBlock locale={locale} common={common} />
      <JsonLd data={graph(webPageSchema(locale, "/about", about.meta, "AboutPage"), breadcrumbSchema(locale, crumbs))} />
    </>
  );
}
