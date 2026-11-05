import type { Metadata } from "next";
import { CtaBlock } from "@/components/sections/CtaBlock";
import {
  Audiences,
  Capabilities,
  Hero,
  HomeFaq,
  Intro,
  Principles,
  Problems,
  Process,
  ServicesOverview,
} from "@/components/sections/home/HomeSections";
import { JsonLd } from "@/components/seo/JsonLd";
import { getContent } from "@/i18n/content";
import { resolveLocale } from "@/i18n/params";
import { graph, webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({ locale, path: "/", meta: getContent(locale).home.meta, isHome: true });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  const { home, common, services } = getContent(locale);

  return (
    <>
      <Hero locale={locale} home={home} common={common} />
      <Intro home={home} />
      <ServicesOverview locale={locale} home={home} services={services} common={common} />
      <Problems home={home} />
      <Process home={home} />
      <Principles home={home} />
      <Capabilities home={home} />
      <Audiences home={home} />
      <HomeFaq locale={locale} home={home} common={common} />
      <CtaBlock locale={locale} common={common} />
      <JsonLd data={graph(webPageSchema(locale, "/", home.meta))} />
    </>
  );
}
