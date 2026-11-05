/**
 * Content contract shared by every locale. Each locale folder
 * (src/content/en, /hy, /ru) exports one `SiteContent` object, so a missing
 * or extra translation is a TypeScript error rather than a silent gap.
 *
 * Writing rules: no invented statistics, clients, awards or testimonials.
 */

export const serviceSlugs = [
  "website-development",
  "web-application-development",
  "ecommerce-development",
  "crm-development",
  "business-automation",
  "custom-software-development",
  "ui-ux-design",
  "maintenance-support",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export interface PageMeta {
  /** <title> without the brand suffix. Aim for 30–60 characters. */
  title: string;
  /** Meta description. Aim for 120–160 characters. */
  description: string;
}

export interface Item {
  title: string;
  text: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface SectionIntro {
  /** Short mono label shown above the heading, e.g. "Services". */
  label: string;
  title: string;
  text?: string;
}

/* ------------------------------------------------------------------ common */

export interface CommonContent {
  /** Brand line used in titles: "Codixa Technologies". Not translated. */
  brand: string;
  /** Short descriptor used in the default title and Organization schema. */
  tagline: string;
  skipToContent: string;
  nav: {
    services: string;
    process: string;
    about: string;
    contact: string;
    /** Header call to action. */
    cta: string;
    /** aria-label of the main navigation. */
    mainLabel: string;
    openMenu: string;
    closeMenu: string;
    /** aria-label for the language switcher group. */
    language: string;
    home: string;
  };
  actions: {
    startProject: string;
    exploreServices: string;
    learnMore: string;
    allServices: string;
    contactUs: string;
    backToHome: string;
    emailUs: string;
  };
  /** Closing conversion block reused at the bottom of most pages. */
  ctaBlock: {
    label: string;
    title: string;
    text: string;
  };
  footer: {
    statement: string;
    servicesTitle: string;
    companyTitle: string;
    contactTitle: string;
    location: string;
    privacy: string;
    rights: string;
    backToTop: string;
  };
  servicePage: {
    problemsLabel: string;
    problemsTitle: string;
    benefitsLabel: string;
    benefitsTitle: string;
    capabilitiesLabel: string;
    capabilitiesTitle: string;
    useCasesLabel: string;
    useCasesTitle: string;
    processLabel: string;
    processTitle: string;
    faqLabel: string;
    faqTitle: string;
    relatedLabel: string;
    relatedTitle: string;
  };
  /** Accessible text for the per-service schematic illustrations. */
  visualAlt: string;
}

/* -------------------------------------------------------------------- form */

export interface FormContent {
  title: string;
  intro: string;
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    company: { label: string; placeholder: string };
    service: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  /** Shown next to optional field labels, e.g. "(optional)". */
  optional: string;
  /** Last option in the service select. */
  otherService: string;
  validation: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    messageRequired: string;
    /** Use {min} for the minimum number of characters. */
    messageTooShort: string;
    /** Summary announced when submission is blocked by errors. */
    summary: string;
  };
  submit: string;
  sending: string;
  successTitle: string;
  successText: string;
  sendAnother: string;
  errorTitle: string;
  /** Use {email} for the company e-mail address. */
  errorText: string;
  /** Shown when EmailJS credentials are missing. Use {email}. */
  notConfigured: string;
  /** Use {privacy} where the privacy policy link should appear. */
  consent: string;
  privacyLinkText: string;
}

/* -------------------------------------------------------------------- home */

export interface HomeContent {
  meta: PageMeta;
  hero: {
    label: string;
    /** Headline is rendered as: titleStart + <accent>titleAccent</accent> + titleEnd. */
    titleStart: string;
    titleAccent: string;
    titleEnd: string;
    text: string;
    /** Floating note on the hero visual. */
    noteTitle: string;
    noteText: string;
  };
  /** Four pillars shown directly under the hero. */
  pillars: Item[];
  intro: SectionIntro & { text: string; statement: string };
  services: SectionIntro;
  problems: SectionIntro & { items: { problem: string; solution: string }[] };
  process: SectionIntro & { steps: Item[] };
  principles: SectionIntro & { items: Item[] };
  capabilities: SectionIntro & { groups: { title: string; items: string[] }[] };
  audiences: SectionIntro & { items: Item[] };
  faq: SectionIntro & { items: Faq[] };
}

/* ---------------------------------------------------------------- services */

export interface ServiceContent {
  meta: PageMeta;
  /** Short name used in navigation, cards, breadcrumbs: "Website Development". */
  name: string;
  /** One-sentence summary for lists and cards (max ~110 characters). */
  summary: string;
  /** Page H1. */
  title: string;
  intro: string;
  /** Value proposition statement shown as a large lead paragraph. */
  value: string;
  problems: Item[];
  benefits: Item[];
  capabilities: string[];
  useCases: Item[];
  process: Item[];
  faqs: Faq[];
}

export interface ServicesIndexContent {
  meta: PageMeta;
  label: string;
  title: string;
  intro: string;
  guide: SectionIntro & { items: Item[] };
}

/* ------------------------------------------------------------------- pages */

export interface AboutContent {
  meta: PageMeta;
  label: string;
  title: string;
  intro: string;
  story: SectionIntro & { paragraphs: string[] };
  approach: SectionIntro & { items: Item[] };
  values: SectionIntro & { items: Item[] };
  direction: {
    label: string;
    vision: Item;
    mission: Item;
  };
  founder: {
    label: string;
    name: string;
    role: string;
    text: string;
    imageAlt: string;
  };
}

export interface ContactContent {
  meta: PageMeta;
  label: string;
  title: string;
  intro: string;
  emailLabel: string;
  locationLabel: string;
  location: string;
  responseNote: string;
  nextSteps: SectionIntro & { items: Item[] };
}

export interface PrivacyContent {
  meta: PageMeta;
  title: string;
  updatedLabel: string;
  intro: string;
  sections: { title: string; paragraphs: string[] }[];
}

export interface NotFoundContent {
  title: string;
  text: string;
}

/* ---------------------------------------------------------------- projects */

/**
 * Portfolio entries. Only add verified client work, with the client's
 * permission. The /work routes and navigation link appear automatically once
 * at least one project exists.
 */
export interface ProjectContent {
  slug: string;
  meta: PageMeta;
  name: string;
  category: string;
  year: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  /** Only verified, client-approved results. Leave empty otherwise. */
  results: string[];
  services: ServiceSlug[];
  /** Real screenshots in /public/images/work/<slug>/. */
  images: { src: string; alt: string; width: number; height: number }[];
  url?: string;
}

export interface WorkContent {
  meta: PageMeta;
  label: string;
  title: string;
  intro: string;
  labels: {
    problem: string;
    solution: string;
    features: string;
    technologies: string;
    results: string;
    services: string;
    visit: string;
  };
  projects: ProjectContent[];
}

/* ------------------------------------------------------------------- root */

export interface SiteContent {
  common: CommonContent;
  form: FormContent;
  home: HomeContent;
  servicesIndex: ServicesIndexContent;
  services: Record<ServiceSlug, ServiceContent>;
  about: AboutContent;
  contact: ContactContent;
  work: WorkContent;
  privacy: PrivacyContent;
  notFound: NotFoundContent;
}
