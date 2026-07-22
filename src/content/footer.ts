import { asset } from "./site";

export const footer = {
  background: asset("PdDBhDZBbpUwCIAstL4W9sLO5M.png"),
  wordmark: asset("footer-logo-text.png"),
  backToTop: "Back to top",
  columns: [
    {
      title: "Navigation",
      links: [
        { label: "About", href: "#about" },
        { label: "Works", href: "#works" },
        { label: "Services", href: "#services" },
        { label: "Blog", href: "#blog" },
      ],
    },
    {
      title: "Social",
      links: [
        { label: "Twitter(X)", href: "https://x.com" },
        { label: "LinkedIn", href: "https://linkedin.com" },
        { label: "Dribble", href: "https://dribbble.com" },
      ],
    },
    {
      title: "Legals",
      links: [
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Term of Service", href: "#terms" },
      ],
    },
  ],
} as const;
