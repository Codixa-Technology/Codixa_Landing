import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { headScript } from "@/components/layout/headScript";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { JsonLd } from "@/components/seo/JsonLd";
import { getContent } from "@/i18n/content";
import { isLocale, localeInfo, locales } from "@/i18n/config";
import { graph, organizationSchema, websiteSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { fontVariables } from "../fonts";
import "@/styles/globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, address: false, email: false },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "192x192" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  const showWork = content.work.projects.length > 0;

  return (
    <html lang={localeInfo[locale].hreflang} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body id="top">
        <a href="#main" className="skip-link">
          {content.common.skipToContent}
        </a>
        <Header
          locale={locale}
          nav={content.common.nav}
          brand={content.common.brand}
          showWork={showWork}
          workLabel={content.work.label}
        />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={locale} content={content} showWork={showWork} />
        <RevealObserver />
        <JsonLd data={graph(organizationSchema(content.home.meta.description), websiteSchema())} />
      </body>
    </html>
  );
}
