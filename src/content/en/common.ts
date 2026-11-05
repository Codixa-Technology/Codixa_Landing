import type { CommonContent, FormContent, NotFoundContent } from "../types";

export const common: CommonContent = {
  brand: "Codixa Technologies",
  tagline: "Web, software and CRM development",
  skipToContent: "Skip to content",
  nav: {
    services: "Services",
    process: "Process",
    about: "About",
    contact: "Contact",
    cta: "Start a project",
    mainLabel: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    home: "Home",
  },
  actions: {
    startProject: "Start a project",
    exploreServices: "Explore services",
    learnMore: "Learn more",
    allServices: "All services",
    contactUs: "Contact us",
    backToHome: "Back to homepage",
    emailUs: "Email us",
  },
  ctaBlock: {
    label: "Next step",
    title: "Tell us what you need to build.",
    text: "Describe the project in a few sentences. We will come back with questions, a recommended approach and a written estimate.",
  },
  footer: {
    statement:
      "Websites, web applications, CRM systems and automation for businesses that want software that works as hard as they do.",
    servicesTitle: "Services",
    companyTitle: "Company",
    contactTitle: "Contact",
    location: "Yerevan, Armenia",
    privacy: "Privacy policy",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
  servicePage: {
    problemsLabel: "The problem",
    problemsTitle: "What usually gets in the way",
    benefitsLabel: "The outcome",
    benefitsTitle: "What you get",
    capabilitiesLabel: "Scope",
    capabilitiesTitle: "What we can build for you",
    useCasesLabel: "Use cases",
    useCasesTitle: "Where it fits",
    processLabel: "Process",
    processTitle: "How the work runs",
    faqLabel: "FAQ",
    faqTitle: "Questions we often hear",
    relatedLabel: "Related",
    relatedTitle: "Services that work well together",
  },
  visualAlt: "Schematic illustration of the service",
};

export const form: FormContent = {
  title: "Tell us about your project",
  intro: "Fields marked with an asterisk are required. The more context you share, the more precise our first reply will be.",
  fields: {
    name: { label: "Your name", placeholder: "Full name" },
    email: { label: "Email", placeholder: "name@company.com" },
    company: { label: "Company", placeholder: "Company or project name" },
    service: { label: "What do you need?", placeholder: "Choose a service" },
    message: {
      label: "Project description",
      placeholder: "What are you building, who is it for, and is there a deadline?",
    },
  },
  optional: "(optional)",
  otherService: "Not sure yet / something else",
  validation: {
    nameRequired: "Please enter your name.",
    emailRequired: "Please enter your email address.",
    emailInvalid: "Please enter a valid email address, e.g. name@company.com.",
    messageRequired: "Please describe your project.",
    messageTooShort: "Please add a little more detail — at least {min} characters.",
    summary: "Please correct the highlighted fields.",
  },
  submit: "Send enquiry",
  sending: "Sending…",
  successTitle: "Thank you — your enquiry has been sent.",
  successText: "We have received your message and will reply to the email address you provided.",
  sendAnother: "Send another message",
  errorTitle: "The message could not be sent.",
  errorText: "Please try again in a moment, or write to us directly at {email}.",
  notConfigured:
    "Online sending is temporarily unavailable. Please write to us directly at {email} — we read every message.",
  consent: "By sending this form you agree that we process your details to answer your enquiry, as described in our {privacy}.",
  privacyLinkText: "privacy policy",
};

export const notFound: NotFoundContent = {
  title: "This page doesn’t exist.",
  text: "The link may be outdated or the address mistyped. Everything we offer is one click away from the homepage.",
};
