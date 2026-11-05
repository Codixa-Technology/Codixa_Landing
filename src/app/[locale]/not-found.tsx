import { locale as rootLocale } from "next/root-params";
import { NotFoundView } from "@/components/sections/NotFoundView";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getContent } from "@/i18n/content";

export default async function NotFound() {
  const value = await rootLocale();
  const locale = value && isLocale(value) ? value : defaultLocale;
  return <NotFoundView locale={locale} content={getContent(locale)} />;
}
