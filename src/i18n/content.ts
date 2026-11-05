import "server-only";
import { en } from "@/content/en";
import { hy } from "@/content/hy";
import { ru } from "@/content/ru";
import type { SiteContent } from "@/content/types";
import type { Locale } from "./config";

const content: Record<Locale, SiteContent> = { en, hy, ru };

/** Content is bundled at build time; every page is statically generated. */
export const getContent = (locale: Locale): SiteContent => content[locale];
