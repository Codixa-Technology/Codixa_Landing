import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { localePath, locales } from "@/i18n/config";
import { getContent } from "@/i18n/content";
import { resolveLocale } from "@/i18n/params";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import styles from "../work.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getContent(locale).work.projects.map((p) => ({ locale, slug: p.slug })));
}

const findProject = (locale: Parameters<typeof getContent>[0], slug: string) =>
  getContent(locale).work.projects.find((project) => project.slug === slug);

export async function generateMetadata({ params }: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const project = findProject(locale, (await params).slug);
  if (!project) return {};
  return buildMetadata({ locale, path: `/work/${project.slug}`, meta: project.meta });
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const locale = await resolveLocale(params);
  const project = findProject(locale, (await params).slug);
  if (!project) notFound();

  const { common, work, services } = getContent(locale);
  const path = `/work/${project.slug}`;
  const crumbs: Crumb[] = [
    { name: common.nav.home, path: "/" },
    { name: work.label, path: "/work" },
    { name: project.name, path },
  ];
  const lists: [string, string[]][] = [
    [work.labels.features, project.features],
    [work.labels.technologies, project.technologies],
    [work.labels.results, project.results],
  ];

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={crumbs}
        breadcrumbLabel={common.nav.mainLabel}
        label={`${project.category} · ${project.year}`}
        title={project.name}
        intro={project.summary}
      />
      <section className="section">
        <div className={`container ${styles.detail}`}>
          <div className={styles.story}>
            <h2 className="t-h3">{work.labels.problem}</h2>
            <p className="t-body">{project.problem}</p>
            <h2 className="t-h3">{work.labels.solution}</h2>
            <p className="t-body">{project.solution}</p>
            {lists
              .filter(([, items]) => items.length > 0)
              .map(([title, items]) => (
                <div key={title}>
                  <h2 className="t-h3">{title}</h2>
                  <ul className={styles.bullets}>
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            <h2 className="t-h3">{work.labels.services}</h2>
            <ul className={styles.bullets}>
              {project.services.map((slug) => (
                <li key={slug}>
                  <Link className="link" href={localePath(locale, `/services/${slug}`)}>
                    {services[slug].name}
                  </Link>
                </li>
              ))}
            </ul>
            {project.url && (
              <a className="link" href={project.url} target="_blank" rel="noopener noreferrer">
                {work.labels.visit}
              </a>
            )}
          </div>
          <div className={styles.gallery}>
            {project.images.map((image) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 64em) 55vw, 100vw"
                className={styles.cover}
              />
            ))}
          </div>
        </div>
      </section>
      <CtaBlock locale={locale} common={common} />
      <JsonLd data={graph(webPageSchema(locale, path, project.meta), breadcrumbSchema(locale, crumbs))} />
    </>
  );
}
