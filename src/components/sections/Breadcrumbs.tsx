import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Crumb } from "@/lib/jsonld";
import styles from "./Breadcrumbs.module.css";

/** Visible breadcrumb trail; the same crumbs feed the BreadcrumbList schema. */
export function Breadcrumbs({ locale, crumbs, label }: { locale: Locale; crumbs: Crumb[]; label: string }) {
  return (
    <nav aria-label={label} className={styles.root}>
      <ol role="list" className={styles.list}>
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className={styles.item}>
              {last ? (
                <span aria-current="page">{crumb.name}</span>
              ) : (
                <Link href={localePath(locale, crumb.path)} className={styles.link}>
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
