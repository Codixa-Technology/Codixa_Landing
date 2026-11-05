import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/service/ServiceDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceVisual } from "@/components/visuals/ServiceVisual";
import { localePath, locales } from "@/i18n/config";
import { getContent } from "@/i18n/content";
import { resolveLocale } from "@/i18n/params";
import { breadcrumbSchema, graph, serviceSchema, webPageSchema, type Crumb } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { isServiceSlug, serviceSlugs } from "@/lib/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => serviceSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  if (!isServiceSlug(slug)) return {};
  return buildMetadata({ locale, path: `/services/${slug}`, meta: getContent(locale).services[slug].meta });
}

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[slug]">) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();

  const content = getContent(locale);
  const { common, services, servicesIndex } = content;
  const service = services[slug];
  const path = `/services/${slug}`;
  const crumbs: Crumb[] = [
    { name: common.nav.home, path: "/" },
    { name: servicesIndex.label, path: "/services" },
    { name: service.name, path },
  ];

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={crumbs}
        breadcrumbLabel={common.nav.mainLabel}
        label={service.name}
        title={service.title}
        intro={service.intro}
        actions={
          <>
            <ButtonLink href={localePath(locale, "/contact")} size="lg">
              {common.actions.startProject}
            </ButtonLink>
            <ButtonLink href={localePath(locale, "/services")} size="lg" variant="secondary" icon={null}>
              {common.actions.allServices}
            </ButtonLink>
          </>
        }
        aside={<ServiceVisual slug={slug} label={`${common.visualAlt}: ${service.name}`} />}
      />
      <ServiceDetail locale={locale} slug={slug} service={service} common={common} services={services} />
      <CtaBlock locale={locale} common={common} />
      <JsonLd
        data={graph(
          webPageSchema(locale, path, service.meta),
          serviceSchema(locale, path, service.name, service.meta.description),
          breadcrumbSchema(locale, crumbs),
        )}
      />
    </>
  );
}
