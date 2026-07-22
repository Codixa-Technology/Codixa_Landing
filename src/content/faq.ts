export const faqSection = {
  eyebrow: "(FAQs)",
  title: "Your Questions, Answered",
  subtitle: "Helping you understand our process and offerings at Codixa.",
} as const;

export interface FaqItem {
  question: string;
  answer: string;
}

/** Rendered as two balanced columns, left column first. */
export const faqColumns: FaqItem[][] = [
  [
    {
      question: "Why’s Codixa instead of full-time designer?",
      answer:
        "You get senior-level design without the overhead of a full-time hire — no recruiting, no benefits, no downtime between projects.",
    },
    {
      question: "Speed of design delivery?",
      answer:
        "Pretty quick! Most designs are delivered in 2–3 business days. We prioritize quality without slowing you down.",
    },
    {
      question: "What’s the Codixa progress like?",
      answer:
        "We scope the work together, share early directions, then iterate in short loops until the design is production ready.",
    },
  ],
  [
    {
      question: "How to request a design?",
      answer:
        "Send a brief through the contact form. We reply within a day with scope, timing and the next available slot.",
    },
    {
      question: "What if I don’t like design?",
      answer:
        "We keep revising until it lands. Every plan includes iteration rounds so you are never stuck with a direction you don’t love.",
    },
    {
      question: "Are there any refund?",
      answer:
        "If we haven’t started production work, you get a full refund — no questions asked.",
    },
  ],
];

/** Index of the item that is expanded by default (column, item). */
export const defaultOpenFaq: [number, number] = [0, 1];
