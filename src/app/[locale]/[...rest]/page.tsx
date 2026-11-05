import { notFound } from "next/navigation";

/**
 * Any unknown path inside a locale (e.g. /hy/old-page) renders the localized
 * 404 within the site layout — with navigation and language switcher — and
 * returns HTTP 404 with noindex.
 */
export default function CatchAll() {
  notFound();
}
