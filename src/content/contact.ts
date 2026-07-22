import { asset, site } from "./site";

export const contact = {
  watermark: "Let's Connect",
  heading: "Got a project in mind?",
  subheading: "Let's make something happen together",
  background: asset("1sREGvYWbdhqXmijCOMUIsD7A.png"),
  marqueeIcon: asset("bPFUMYGmKDGU6pubiY2MFnjtBAk.svg"),
  email: site.email,
  fields: [
    { id: "name", label: "Your Name", placeholder: "Enter your Name", type: "text" as const },
    { id: "email", label: "Your Email", placeholder: "Enter the Email", type: "email" as const },
    {
      id: "message",
      label: "Project Description",
      placeholder: "Type Here...",
      type: "textarea" as const,
    },
  ],
  submitLabel: "Send Now!",
} as const;
