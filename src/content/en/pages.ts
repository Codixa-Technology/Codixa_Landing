import type { AboutContent, ContactContent, PrivacyContent, WorkContent } from "../types";

export const about: AboutContent = {
  meta: {
    title: "About Codixa Technologies",
    description:
      "Codixa Technologies is a software development company in Yerevan, Armenia, building websites, web applications, CRM systems and automation with care and clarity.",
  },
  label: "About",
  title: "Engineering rigour with a studio’s eye for experience.",
  intro:
    "Codixa Technologies is a software development company founded in 2025 in Yerevan, Armenia. We design and build the digital tools businesses rely on — websites, web applications, CRM systems and automation.",
  story: {
    label: "Who we are",
    title: "Why Codixa exists.",
    paragraphs: [
      "Many businesses are stuck between two options: generic tools that never quite fit, and development projects that become expensive, slow and hard to maintain. Codixa was founded to offer a better path — software that fits the business, built to a high standard and explained in plain language.",
      "We combine engineering discipline with careful design. That means clean architecture and tested code, but also interfaces that people enjoy using and content that makes sense to the client’s customers.",
      "We work with startups, small and medium-sized businesses and established companies, in Armenia and internationally, in English, Armenian and Russian.",
    ],
  },
  approach: {
    label: "Our approach",
    title: "How we approach every project.",
    items: [
      { title: "Business first", text: "We start with the outcome you need — more enquiries, less manual work, better data — and design the solution backwards from it." },
      { title: "Small, solid steps", text: "We release in phases, so you see working results early and invest in what proves its value." },
      { title: "Built to be maintained", text: "Mainstream technologies, readable code and documentation keep your software independent of any single developer." },
      { title: "Honest advice", text: "If a simpler or cheaper option will do the job, we say so — even when it means a smaller project for us." },
    ],
  },
  values: {
    label: "Values",
    title: "What we stand for.",
    items: [
      { title: "Craft", text: "Code and design built with care, down to the detail." },
      { title: "Clarity", text: "Simple solutions, honest communication, no noise." },
      { title: "Reliability", text: "Products that perform and partners who deliver." },
      { title: "Curiosity", text: "A forward-looking approach to tools and ideas." },
      { title: "Partnership", text: "Working alongside clients, not just for them." },
    ],
  },
  direction: {
    label: "Direction",
    vision: {
      title: "Vision",
      text: "To be the technology partner businesses trust to turn complex ideas into simple, dependable digital products.",
    },
    mission: {
      title: "Mission",
      text: "To design and build websites, software and CRM systems that are technically excellent, easy to use and ready to grow.",
    },
  },
  founder: {
    label: "Founder",
    name: "Andranik Baghdasaryan",
    role: "Founder, Codixa Technologies",
    text: "Andranik founded Codixa Technologies in 2025. A frontend engineer working with React and TypeScript, he oversees the technical quality of every project and is a direct point of contact for clients.",
    imageAlt: "Portrait of Andranik Baghdasaryan, founder of Codixa Technologies",
  },
};

export const contact: ContactContent = {
  meta: {
    title: "Contact Us — Start Your Project",
    description:
      "Tell Codixa Technologies about your website, application, CRM or automation project. Send an enquiry or email codixatechnologies@gmail.com.",
  },
  label: "Contact",
  title: "Let’s talk about your project.",
  intro:
    "Share what you want to build or improve. We will review it, ask the right questions and suggest a clear way forward.",
  emailLabel: "Email",
  locationLabel: "Location",
  location: "Yerevan, Armenia — working with clients worldwide",
  responseNote: "We usually reply within one business day.",
  nextSteps: {
    label: "What happens next",
    title: "From first message to a clear plan.",
    items: [
      { title: "We review your enquiry", text: "We read your message carefully and come back with clarifying questions if needed." },
      { title: "A short call", text: "We discuss goals, scope, timing and constraints — in English, Armenian or Russian." },
      { title: "A written proposal", text: "You receive a recommended approach, timeline and estimate before any commitment." },
    ],
  },
};

export const work: WorkContent = {
  meta: {
    title: "Projects & Case Studies",
    description: "Selected websites, applications and systems designed and developed by Codixa Technologies.",
  },
  label: "Work",
  title: "Selected projects.",
  intro: "A selection of projects we have designed and developed, with the problems they solved.",
  labels: {
    problem: "The challenge",
    solution: "The solution",
    features: "Key features",
    technologies: "Technologies",
    results: "Results",
    services: "Services",
    visit: "Visit website",
  },
  projects: [],
};

export const privacy: PrivacyContent = {
  meta: {
    title: "Privacy Policy",
    description: "How Codixa Technologies collects, uses and protects the personal data you share through this website.",
  },
  title: "Privacy policy",
  updatedLabel: "Last updated",
  intro:
    "This policy explains what personal data Codixa Technologies collects through codixa.space, why we collect it and how you can control it. We collect as little as possible.",
  sections: [
    {
      title: "Who we are",
      paragraphs: [
        "Codixa Technologies is a software development company based in Yerevan, Armenia. For any privacy question, contact us at codixatechnologies@gmail.com.",
      ],
    },
    {
      title: "What we collect",
      paragraphs: [
        "When you submit the contact form, we receive the details you enter: your name, email address, optional company name, the service you are interested in and your message.",
        "This website does not use advertising or analytics cookies and does not track you across other websites. Our hosting provider records technical request data, such as IP addresses, in server logs for security and reliability.",
      ],
    },
    {
      title: "How we use it",
      paragraphs: [
        "We use the information you send only to reply to your enquiry, prepare a proposal and continue the business conversation you started. We do not sell your data or use it for unrelated marketing.",
      ],
    },
    {
      title: "Service providers",
      paragraphs: [
        "Form submissions are delivered to our inbox through EmailJS, an email delivery service, and stored in our email account. The website is hosted on Vercel. These providers process data on our behalf only as needed to provide their services.",
      ],
    },
    {
      title: "How long we keep it",
      paragraphs: [
        "We keep enquiry emails for as long as needed to respond and to maintain a record of our business correspondence, unless you ask us to delete them.",
      ],
    },
    {
      title: "Your rights",
      paragraphs: [
        "You can ask us to tell you what data we hold about you, correct it or delete it at any time by writing to codixatechnologies@gmail.com. We will respond within a reasonable time.",
      ],
    },
    {
      title: "Changes to this policy",
      paragraphs: [
        "If we change how we handle personal data, we will update this page and the date above.",
      ],
    },
  ],
};
