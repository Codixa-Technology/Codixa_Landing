"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { CommonContent } from "@/content/types";
import { localePath, stripLocale, type Locale } from "@/i18n/config";
import { buttonClass } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Logo } from "../ui/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import styles from "./Header.module.css";

interface HeaderProps {
  locale: Locale;
  nav: CommonContent["nav"];
  brand: string;
  showWork: boolean;
  workLabel: string;
}

export function Header({ locale, nav, brand, showWork, workLabel }: HeaderProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const path = stripLocale(pathname);
  // The menu is open only for the path it was opened on, so any navigation closes it.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = (value: boolean) => setOpenPath(value ? pathname : null);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const items = [
    { href: "/services", label: nav.services, match: (p: string) => p.startsWith("/services") },
    ...(showWork ? [{ href: "/work", label: workLabel, match: (p: string) => p.startsWith("/work") }] : []),
    { href: "/#process", label: nav.process, match: () => false },
    { href: "/about", label: nav.about, match: (p: string) => p === "/about" },
    { href: "/contact", label: nav.contact, match: (p: string) => p === "/contact" },
  ];

  // Elevated header once the page scrolls. One passive listener, state only flips at the threshold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape, keep focus inside the panel.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const panel = panelRef.current;
    document.documentElement.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
        return;
      }
      if (event.key !== "Tab" || !panel || !toggle) return;
      const focusables = [toggle, ...panel.querySelectorAll<HTMLElement>("a, button")];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${open ? styles.isOpen : ""}`}>
      <div className={`container ${styles.bar}`}>
        <Link href={localePath(locale)} className={styles.logoLink} aria-label={`${brand} — ${nav.home}`}>
          {/* Brand reveal: plays once per session on first load (see globals.css). */}
          <span className="brand-mark">
            <Logo className={styles.logo} />
            <span className="brand-mark__cut" aria-hidden="true" />
          </span>
        </Link>

        <nav aria-label={nav.mainLabel} className={styles.desktopNav}>
          <ul role="list" className={styles.navList}>
            {items.map((item) => {
              const active = item.match(path);
              return (
                <li key={item.href}>
                  <Link
                    href={localePath(locale, item.href)}
                    className={`${styles.navLink} ${active ? styles.active : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.desktopOnly}>
            <LanguageSwitcher locale={locale} label={nav.language} />
          </div>
          <Link href={localePath(locale, "/contact")} className={`${buttonClass("primary")} ${styles.cta}`}>
            {nav.cta}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} size={22} />
            <span className="visually-hidden">{open ? nav.closeMenu : nav.openMenu}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={styles.panel}
        data-tone="ink"
        hidden={!open}
      >
        <nav aria-label={nav.mainLabel} className={`container ${styles.panelInner}`}>
          <ul role="list" className={styles.panelList}>
            {items.map((item, index) => (
              <li key={item.href} style={{ "--i": index } as CSSProperties}>
                <Link
                  href={localePath(locale, item.href)}
                  className={styles.panelLink}
                  aria-current={item.match(path) ? "page" : undefined}
                  onClick={close}
                >
                  <span className={styles.panelIndex}>{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.panelFooter}>
            <LanguageSwitcher locale={locale} label={nav.language} tone="dark" onNavigate={close} />
            <Link href={localePath(locale, "/contact")} className={buttonClass("primary", "lg")} onClick={close}>
              {nav.cta}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
