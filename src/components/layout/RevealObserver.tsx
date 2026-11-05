"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    __cxReveal?: boolean;
  }
}

/**
 * One IntersectionObserver for every [data-reveal] element on the page.
 * Re-scans after each client navigation. No scroll listeners.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    window.__cxReveal = true;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
