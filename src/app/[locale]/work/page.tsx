import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { localePath } from "@/i18n/config";
import { getContent } from "@/i18n/content";
import { resolveLocale } from "@/i18n/params";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import styles from "./work.module.css";

/**
 * Portfolio index. Returns 404 (and is excluded from the sitemap and
 * navigation) until at least one verified project exists in the content.
 */
export async function generateMetadata({ params }: PageProps<"/[locale]/work">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({ locale, path: "/work", meta: getContent(locale).work.meta });
}

export default async function WorkPage({ params }: PageProps<"/[locale]/work">) {
  const locale = await resolveLocale(params);
  const { common, work } = getContent(locale);
  if (work.projects.length === 0) notFound();

  const crumbs: Crumb[] = [
    { name: common.nav.home, path: "/" },
    { name: work.label, path: "/work" },
  ];

  return (
    <>
      <PageHero locale={locale} crumbs={crumbs} breadcrumbLabel={common.nav.mainLabel} label={work.label} title={work.title} intro={work.intro} />
      <section className="section" aria-label={work.label}>
        <ul role="list" className={`container ${styles.grid}`}>
          {work.projects.map((project) => {
            const cover = project.images[0];
            return (
              <li key={project.slug}>
                <Link href={localePath(locale, `/work/${project.slug}`)} className={styles.card}>
                  {cover && (
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      width={cover.width}
                      height={cover.height}
                      sizes="(min-width: 48em) 50vw, 100vw"
                      className={styles.cover}
                    />
                  )}
                  <span className={styles.meta}>
                    {project.category} · {project.year}
                  </span>
                  <h2 className="t-h3">{project.name}</h2>
                  <p className="t-body">{project.summary}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <CtaBlock locale={locale} common={common} />
      <JsonLd data={graph(webPageSchema(locale, "/work", work.meta, "CollectionPage"), breadcrumbSchema(locale, crumbs))} />
    </>
  );
}
