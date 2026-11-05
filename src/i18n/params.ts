import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";

/** Awaits route params and narrows the locale, returning a 404 for unknown values. */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
