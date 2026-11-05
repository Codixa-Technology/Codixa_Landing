import Link from "next/link";
import type { SiteContent } from "@/content/types";
import { localePath, type Locale } from "@/i18n/config";
import { serviceSlugs } from "@/lib/services";
import { site } from "@/lib/site";
import { Icon } from "../ui/Icon";
import { Logo } from "../ui/Logo";
import styles from "./Footer.module.css";

/** Pages are statically generated, so the year is fixed at build time. */
const BUILD_YEAR = new Date().getFullYear();

interface FooterProps {
  locale: Locale;
  content: SiteContent;
  showWork: boolean;
}

export function Footer({ locale, content, showWork }: FooterProps) {
  const { common, services, work } = content;
  const { footer, nav } = common;

  const company = [
    { href: "/about", label: nav.about },
    ...(showWork ? [{ href: "/work", label: work.label }] : []),
    { href: "/#process", label: nav.process },
    { href: "/contact", label: nav.contact },
    { href: "/privacy", label: footer.privacy },
  ];

  return (
    <footer className={styles.footer} data-tone="ink">
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Link href={localePath(locale)} aria-label={`${common.brand} — ${nav.home}`} className={styles.logoLink}>
            <Logo className={styles.logo} />
          </Link>
          <p className={styles.statement}>{footer.statement}</p>
        </div>

        <nav className={styles.columns} aria-label={footer.servicesTitle}>
          <div>
            <h2 className={styles.heading}>{footer.servicesTitle}</h2>
            <ul role="list" className={styles.list}>
              {serviceSlugs.map((slug) => (
                <li key={slug}>
                  <Link href={localePath(locale, `/services/${slug}`)} className={styles.link}>
                    {services[slug].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={styles.heading}>{footer.companyTitle}</h2>
            <ul role="list" className={styles.list}>
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={localePath(locale, item.href)} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={styles.heading}>{footer.contactTitle}</h2>
            <ul role="list" className={styles.list}>
              <li>
                <a href={`mailto:${site.email}`} className={`${styles.link} ${styles.contactLink}`}>
                  <Icon name="mail" size={18} />
                  {site.email}
                </a>
              </li>
              <li className={styles.contactLink}>
                <Icon name="pin" size={18} />
                {footer.location}
              </li>
              {site.socials.map((social) => (
                <li key={social.href}>
                  <a href={social.href} className={styles.link} target="_blank" rel="noopener noreferrer">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {BUILD_YEAR} {common.brand}. {footer.rights}
        </p>
        <a href="#top" className={styles.toTop}>
          {footer.backToTop}
          <Icon name="arrowUp" size={16} />
        </a>
      </div>
      <div className={styles.cut} aria-hidden="true" />
    </footer>
  );
}
