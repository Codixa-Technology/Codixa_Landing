import type { HomeContent } from "../types";

export const home: HomeContent = {
  meta: {
    title: "Web, Software & CRM Development in Armenia",
    description:
      "Codixa Technologies designs and builds websites, web applications, e-commerce, CRM systems and business automation for companies in Armenia and abroad.",
  },
  hero: {
    label: "Web · Software · CRM",
    titleStart: "Digital products, engineered with ",
    titleAccent: "precision",
    titleEnd: ".",
    text: "Codixa Technologies designs and builds websites, software and CRM systems that are technically sound, easy to use and ready to grow with your business.",
    noteTitle: "Built to last",
    noteText: "Tested, documented, maintainable",
  },
  pillars: [
    { title: "Web development", text: "Fast, accessible websites built to turn visitors into enquiries." },
    { title: "Software development", text: "Custom applications shaped around how your team actually works." },
    { title: "CRM systems", text: "Pipelines, customer data and follow-ups in one clear place." },
    { title: "Automation", text: "Integrations that connect your tools and remove repetitive work." },
  ],
  intro: {
    label: "Who we are",
    title: "A technology partner for businesses that have outgrown templates.",
    statement:
      "We turn business requirements into software that is simple to use and dependable to run.",
    text: "Codixa Technologies is a software development company based in Yerevan, Armenia. We work with startups, small and medium-sized businesses and established companies — in Armenia and internationally — on the digital tools they depend on every day: the website that brings in clients, the system that manages them and the automation that saves hours of manual work.",
  },
  services: {
    label: "Services",
    title: "What we build",
    text: "Each engagement is scoped around a business outcome, not a list of features. Choose a starting point — or describe the problem and we will recommend the right approach.",
  },
  problems: {
    label: "Problems we solve",
    title: "When the tools hold the business back.",
    text: "Most projects start with a frustration, not a specification. These are the ones we hear most often.",
    items: [
      {
        problem: "The website looks outdated and brings in few enquiries.",
        solution: "A fast, modern website with clear structure, focused messaging and contact paths that convert visitors into leads.",
      },
      {
        problem: "Customer data lives in spreadsheets, chats and inboxes.",
        solution: "A CRM built around your sales process, so every lead, deal and follow-up is visible in one place.",
      },
      {
        problem: "The team repeats the same manual tasks every day.",
        solution: "Automated workflows and integrations that move data between systems without copy-and-paste.",
      },
      {
        problem: "Off-the-shelf software forces you to work its way.",
        solution: "Custom applications designed around your processes, with room to add features as you grow.",
      },
    ],
  },
  process: {
    label: "Process",
    title: "A clear process, from brief to launch.",
    text: "You always know what is being built, why, and what comes next.",
    steps: [
      { title: "Discover", text: "We learn your business, users and goals, and agree on what success looks like." },
      { title: "Plan", text: "Scope, structure and priorities are set out in a written proposal with a timeline and estimate." },
      { title: "Design", text: "Interfaces are designed and reviewed with you before a line of production code is written." },
      { title: "Develop", text: "We build in short iterations and share progress regularly, so feedback arrives early." },
      { title: "Launch & support", text: "Testing, deployment and handover — then ongoing improvements and support if you need them." },
    ],
  },
  principles: {
    label: "Why Codixa",
    title: "How we work — and what you can expect from us.",
    items: [
      { title: "Craft", text: "Code and design built with care, down to the detail. Quality is not a phase at the end; it is how the work is done." },
      { title: "Clarity", text: "Simple solutions and honest communication. You get straight answers on scope, cost and trade-offs." },
      { title: "Reliability", text: "Software that performs and a partner that delivers what was agreed, when it was agreed." },
      { title: "Curiosity", text: "A forward-looking approach to tools and ideas, applied only where it genuinely helps your business." },
      { title: "Partnership", text: "We work alongside you, not just for you — and we stay available after launch." },
    ],
  },
  capabilities: {
    label: "Technology",
    title: "Modern, proven technology — chosen for the job.",
    text: "We select tools for long-term maintainability and performance, not trends. Your project gets a stack that the next developer can understand.",
    groups: [
      { title: "Frontend", items: ["React", "Next.js", "TypeScript", "Responsive HTML & CSS", "Accessibility (WCAG)"] },
      { title: "Backend", items: ["Node.js", "REST APIs", "Relational databases", "Authentication & roles", "Server-side rendering"] },
      { title: "Integrations", items: ["Payment gateways", "Email & messaging", "Third-party APIs", "Analytics", "Webhooks"] },
      { title: "Delivery", items: ["Figma design", "Technical SEO", "Performance optimisation", "Cloud deployment", "Maintenance"] },
    ],
  },
  audiences: {
    label: "Who we work with",
    title: "Built for businesses at different stages.",
    items: [
      { title: "Startups & founders", text: "Turn an idea into a working product or a launch-ready website, without overbuilding the first version." },
      { title: "Small businesses", text: "A professional online presence and simple tools that save time from day one." },
      { title: "Growing companies", text: "CRM, automation and internal systems that keep operations organised as the team grows." },
      { title: "Established organisations", text: "Modernisation of outdated websites and software, with a careful migration path." },
      { title: "Online stores", text: "E-commerce built for conversion, with catalogue, payments and order management." },
      { title: "International clients", text: "Remote collaboration in English, Armenian and Russian, with clear written communication." },
    ],
  },
  faq: {
    label: "FAQ",
    title: "Questions, answered.",
    text: "Can’t find what you are looking for? Write to us — we answer every enquiry personally.",
    items: [
      {
        question: "How much does a website or application cost?",
        answer: "It depends on scope: the number of pages or features, integrations and content. After a short conversation about your goals we send a written estimate, so you know the cost before any work begins.",
      },
      {
        question: "How long does a typical project take?",
        answer: "A focused landing page can be ready in about a week. A multi-page business website usually takes a few weeks. Web applications, CRM systems and automation are planned in phases, so you can start using the first part sooner.",
      },
      {
        question: "Do you work with clients outside Armenia?",
        answer: "Yes. We work remotely with clients in other countries and communicate in English, Armenian or Russian. Meetings, documents and updates are arranged around your time zone.",
      },
      {
        question: "Can you improve or redesign our existing website or system?",
        answer: "Yes. We review what you have, keep what works and propose a redesign or rebuild where it makes sense — including redirects and SEO care so existing search visibility is protected.",
      },
      {
        question: "Do you provide support after launch?",
        answer: "Yes. We offer maintenance and support: updates, monitoring, fixes and new features, so your website or software keeps running smoothly.",
      },
      {
        question: "Do I need technical knowledge to work with you?",
        answer: "No. We explain decisions in plain language and handle the technical side. You focus on your business goals; we translate them into a working product.",
      },
    ],
  },
};
