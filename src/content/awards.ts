export const awardsSection = {
  eyebrow: "(Awards)",
  title: "Awards Winning",
} as const;

export interface Award {
  organisation: string;
  achievement: string;
  project: string;
  href: string;
}

export const awards: Award[] = [
  {
    organisation: "Awwwards",
    achievement: "SOTY 2023-1st Winner",
    project: "Archin",
    href: "https://www.awwwards.com/",
  },
  {
    organisation: "CSS Awards",
    achievement: "Top 5 Best of eCommerce Websites 2023",
    project: "VNTNR",
    href: "https://www.cssdesignawards.com/",
  },
  {
    organisation: "CSS Awards",
    achievement: "Winner - US Behance Portfolio Review 2024",
    project: "Aeorim",
    href: "https://thedanceawards.com/studio-awards",
  },
  {
    organisation: "Dribble",
    achievement: "Top 10 Best of Mobile App Design 2024",
    project: "Swat Co.",
    href: "https://www.dandad.org/en/d-ad-awards/",
  },
  {
    organisation: "FWA Awards",
    achievement: "Winner - Best of Architecture Website 2025",
    project: "Unerio",
    href: "https://thefwa.com/",
  },
];
