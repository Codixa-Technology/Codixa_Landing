import Link from "next/link";
import type { SiteContent } from "@/content/types";
import { localePath, type Locale } from "@/i18n/config";
import { ButtonLink } from "../ui/Button";
import styles from "./NotFoundView.module.css";

interface NotFoundViewProps {
  locale: Locale;
  content: SiteContent;
}

export function NotFoundView({ locale, content }: NotFoundViewProps) {
  const { common, notFound } = content;
  return (
    <section className={`section hairgrid ${styles.root}`} data-tone="paper" aria-labelledby="nf-title">
      <div className={`container ${styles.inner}`}>
        <p className={styles.code} aria-hidden="true">
          404<span className={styles.cut} />
        </p>
        <h1 id="nf-title" className="t-h1">
          {notFound.title}
        </h1>
        <p className="t-lead">{notFound.text}</p>
        <div className={styles.actions}>
          <ButtonLink href={localePath(locale)}>{common.actions.backToHome}</ButtonLink>
          <ButtonLink href={localePath(locale, "/services")} variant="secondary" icon={null}>
            {common.actions.allServices}
          </ButtonLink>
        </div>
        <ul role="list" className={styles.links}>
          <li>
            <Link className="link" href={localePath(locale, "/about")}>
              {common.nav.about}
            </Link>
          </li>
          <li>
            <Link className="link" href={localePath(locale, "/contact")}>
              {common.nav.contact}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
