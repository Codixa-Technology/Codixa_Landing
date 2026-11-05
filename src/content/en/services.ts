import type { ServiceContent, ServiceSlug, ServicesIndexContent } from "../types";

export const servicesIndex: ServicesIndexContent = {
  meta: {
    title: "Software & Web Development Services",
    description:
      "Website and web application development, e-commerce, CRM systems, business automation, custom software, UI/UX design and ongoing support from Codixa Technologies.",
  },
  label: "Services",
  title: "Everything you need to build, run and grow digital products.",
  intro:
    "From a first website to a company-wide CRM, every service is delivered by one team with one standard of quality. Start with what you need today and extend it as the business grows.",
  guide: {
    label: "Not sure where to start?",
    title: "Start from the problem, not the service.",
    text: "Many clients come to us with a goal rather than a technical brief. A few common starting points:",
    items: [
      { title: "“We need more enquiries.”", text: "Usually a website redesign or a new website with clearer structure and stronger calls to action." },
      { title: "“We are losing track of clients.”", text: "Usually a CRM system, sometimes combined with automation of follow-ups and reporting." },
      { title: "“Our team wastes hours on routine work.”", text: "Usually business automation or a custom internal tool that replaces spreadsheets." },
      { title: "“We have an idea for a product.”", text: "Usually UI/UX design followed by a web application, built in phases from a first version." },
    ],
  },
};

export const services: Record<ServiceSlug, ServiceContent> = {
  "website-development": {
    meta: {
      title: "Website Development for Businesses",
      description:
        "Custom business websites that are fast, mobile-friendly and SEO-ready. Codixa Technologies designs and develops websites that turn visitors into enquiries.",
    },
    name: "Website Development",
    summary: "Fast, modern business websites with clear structure, strong SEO foundations and real lead generation.",
    title: "Business websites that bring in clients, not just visitors.",
    intro:
      "Your website is often the first conversation a client has with your company. We design and develop custom websites that explain what you do in seconds, load quickly on every device and make it easy to get in touch.",
    value:
      "Every website we build is designed around one question: what should a visitor do next? Structure, copy, design and code all serve that answer.",
    problems: [
      { title: "An outdated first impression", text: "Old design and slow pages make a capable company look less professional than it is." },
      { title: "Visitors leave without contacting you", text: "Unclear messaging and hidden contact paths turn interest into lost opportunities." },
      { title: "Hard to find on Google", text: "Weak technical foundations and thin content keep the site out of relevant search results." },
    ],
    benefits: [
      { title: "A professional presence", text: "A distinctive design that reflects the quality of your work and builds trust at first glance." },
      { title: "More qualified enquiries", text: "Clear service pages, calls to action and forms designed to turn visitors into leads." },
      { title: "Search-ready from launch", text: "Clean semantic code, metadata, sitemaps, structured data and fast loading as standard." },
      { title: "Easy to grow", text: "A component-based build that makes new pages, languages and sections straightforward to add." },
    ],
    capabilities: [
      "Corporate and business websites",
      "Landing pages for campaigns and launches",
      "Website redesign and migration",
      "Multilingual websites",
      "Technical SEO foundations",
      "Contact forms and lead capture",
      "Performance and Core Web Vitals optimisation",
      "Analytics and conversion tracking setup",
    ],
    useCases: [
      { title: "Service companies", text: "Present services clearly and generate consultation requests from search and referrals." },
      { title: "Product launches", text: "A focused landing page that explains a new product and collects sign-ups or orders." },
      { title: "Company rebrands", text: "A complete website rebuild that matches a new identity while protecting existing search rankings." },
    ],
    process: [
      { title: "Structure & content plan", text: "We map the pages, the messages and the actions each page should drive." },
      { title: "Design", text: "Desktop and mobile layouts are designed and approved before development." },
      { title: "Development", text: "A fast, responsive build with SEO, accessibility and analytics in place." },
      { title: "Launch", text: "Testing across devices, redirects from old URLs, and a smooth go-live." },
    ],
    faqs: [
      { question: "Will my website work well on mobile phones?", answer: "Yes. Every layout is designed for mobile, tablet and desktop separately, then tested on real device sizes before launch." },
      { question: "Can I update the content myself?", answer: "Yes, if you need to. We can connect a content management system or set up a simple editing workflow, depending on how often your content changes." },
      { question: "Will the redesign hurt our current Google rankings?", answer: "We plan redesigns to protect them: important URLs are kept or permanently redirected, and metadata is migrated carefully." },
      { question: "Do you write the website content?", answer: "We help structure the content and edit it for clarity. For larger projects, copywriting can be included in the scope." },
    ],
  },

  "web-application-development": {
    meta: {
      title: "Custom Web Application Development",
      description:
        "Secure, scalable web applications built around your workflows: client portals, dashboards, booking systems and SaaS products by Codixa Technologies.",
    },
    name: "Web Application Development",
    summary: "Portals, dashboards and platforms that run in the browser — secure, fast and built around your users.",
    title: "Web applications built around the way your users work.",
    intro:
      "When a website needs to do more than inform — accept bookings, manage accounts, process data or serve customers — it becomes an application. We design and develop web applications that are reliable, secure and pleasant to use every day.",
    value:
      "We build the version that solves the real problem first, then extend it in measured steps — so you invest in features that prove their value.",
    problems: [
      { title: "Processes stuck in spreadsheets", text: "Critical workflows depend on files that break, duplicate and get out of date." },
      { title: "Clients can’t help themselves", text: "Every status check or change request becomes a call or an email to your team." },
      { title: "Software that doesn’t scale", text: "A quick prototype or patched tool slows down as more users and data arrive." },
    ],
    benefits: [
      { title: "Shaped to your process", text: "Screens, roles and rules that match how your business actually operates." },
      { title: "Secure by design", text: "Authentication, permissions and data validation built in from the first release." },
      { title: "Ready to scale", text: "A clean architecture that handles growing users and data without a rewrite." },
      { title: "Usable from day one", text: "Interfaces designed for clarity, so people adopt the tool instead of avoiding it." },
    ],
    capabilities: [
      "Client and partner portals",
      "Admin panels and dashboards",
      "Booking and reservation systems",
      "SaaS products and MVPs",
      "User accounts, roles and permissions",
      "Data import, export and reporting",
      "API development and integrations",
      "Progressive web apps",
    ],
    useCases: [
      { title: "Client portal", text: "Customers log in to see orders, documents and statuses without contacting your team." },
      { title: "Internal dashboard", text: "Managers see key numbers and operations in real time instead of compiling reports." },
      { title: "Product MVP", text: "A first working version of a new digital product to test with real users." },
    ],
    process: [
      { title: "Discovery & requirements", text: "We define users, roles, key scenarios and the scope of the first release." },
      { title: "UX & interface design", text: "Flows and screens are prototyped and validated before development." },
      { title: "Iterative development", text: "Features ship in short cycles with regular demos and feedback." },
      { title: "Release & evolution", text: "Testing, deployment, monitoring and a roadmap for the next iterations." },
    ],
    faqs: [
      { question: "What is the difference between a website and a web application?", answer: "A website mainly presents information. A web application lets users do things — log in, manage data, book, buy or collaborate — and usually involves a database and business logic." },
      { question: "Can you start with a small first version?", answer: "Yes, and we usually recommend it. A focused first release lets you validate the idea and prioritise the next features based on real use." },
      { question: "How do you keep user data secure?", answer: "We use proven authentication, role-based access, input validation, encrypted connections and careful handling of personal data throughout the application." },
      { question: "Can the application connect to our existing tools?", answer: "Usually, yes. If a tool offers an API, we can integrate it — payments, email, accounting, CRM or messaging services." },
    ],
  },

  "ecommerce-development": {
    meta: {
      title: "E-commerce Website Development",
      description:
        "Online stores built to sell: product catalogues, secure checkout, payments and order management. E-commerce development by Codixa Technologies.",
    },
    name: "E-commerce Development",
    summary: "Online stores with fast catalogues, smooth checkout, payments and practical order management.",
    title: "Online stores designed to turn browsing into buying.",
    intro:
      "A successful online store is more than a product grid. We build e-commerce websites with fast catalogues, clear product pages, a friction-free checkout and the back-office tools you need to process orders efficiently.",
    value:
      "We focus on the moments that decide a sale — finding the product, trusting the page and completing the checkout — and remove everything that slows them down.",
    problems: [
      { title: "Abandoned carts", text: "Long or confusing checkouts lose customers at the very last step." },
      { title: "Manual order handling", text: "Orders, stock and customer messages are processed by hand and mistakes slip through." },
      { title: "Slow product pages", text: "Heavy pages on mobile drive shoppers away before they see the price." },
    ],
    benefits: [
      { title: "A checkout that converts", text: "Short, clear and mobile-friendly, with the payment methods your customers expect." },
      { title: "Products that sell themselves", text: "Product pages with strong imagery, clear options and the details buyers look for." },
      { title: "Efficient operations", text: "Order, stock and customer management that reduces manual work." },
      { title: "Visible in search", text: "Structured product data and SEO-friendly category pages to attract organic traffic." },
    ],
    capabilities: [
      "Custom online stores",
      "Product catalogues and filters",
      "Shopping cart and checkout",
      "Payment gateway integration",
      "Order and inventory management",
      "Delivery and shipping options",
      "Customer accounts and order history",
      "Multilingual and multi-currency stores",
    ],
    useCases: [
      { title: "Retail brands", text: "Take a physical store online with a catalogue that mirrors your range." },
      { title: "Direct-to-consumer products", text: "A focused store for a small range of products with a strong brand story." },
      { title: "B2B ordering", text: "Repeat orders for business customers with tailored catalogues and pricing." },
    ],
    process: [
      { title: "Catalogue & flow planning", text: "We structure categories, product data and the purchase journey." },
      { title: "Store design", text: "Category, product, cart and checkout pages are designed for mobile first." },
      { title: "Build & integrations", text: "Development with payments, delivery and notifications connected." },
      { title: "Test orders & launch", text: "End-to-end test purchases, then launch with tracking in place." },
    ],
    faqs: [
      { question: "Which payment methods can you integrate?", answer: "We integrate the payment providers available in your market, including local Armenian banks and international gateways, depending on their API support." },
      { question: "Can we manage products ourselves?", answer: "Yes. You get an admin area to add products, update prices and stock, and process orders without developer help." },
      { question: "Can you migrate our existing store?", answer: "Yes. We can move products, customers and order history, and redirect old product URLs to protect search visibility." },
      { question: "Do you support selling in several languages or currencies?", answer: "Yes. Stores can be built multilingual from the start, with currency and pricing options suited to your markets." },
    ],
  },

  "crm-development": {
    meta: {
      title: "Custom CRM Development",
      description:
        "Custom CRM systems built around your sales process: lead pipelines, client records, tasks, reminders and reporting. CRM development by Codixa Technologies.",
    },
    name: "CRM Development",
    summary: "Custom CRM systems that keep leads, clients, deals and follow-ups organised in one place.",
    title: "A CRM that fits your sales process — not the other way round.",
    intro:
      "Generic CRMs often mean paying for features you don’t use while the ones you need are missing. We build custom CRM systems around your pipeline, your data and your team, so customer management becomes simpler, not heavier.",
    value:
      "Every lead visible, every follow-up on time, every manager with the numbers they need — without forcing your team into someone else’s workflow.",
    problems: [
      { title: "Leads slip through the cracks", text: "Enquiries arrive from many channels and some are never followed up." },
      { title: "Client history is scattered", text: "Calls, messages and agreements live in different inboxes and personal notes." },
      { title: "No reliable reporting", text: "Managers can’t see the pipeline or team performance without manual spreadsheets." },
    ],
    benefits: [
      { title: "One source of truth", text: "Every client, contact, deal and conversation stored in one structured system." },
      { title: "A pipeline you can see", text: "Visual stages that show where each deal stands and what needs attention." },
      { title: "Follow-ups that happen", text: "Tasks, reminders and notifications that keep the team on schedule." },
      { title: "Decisions based on data", text: "Reports and dashboards on sales, sources and performance, always up to date." },
    ],
    capabilities: [
      "Lead and deal pipelines",
      "Client and contact records",
      "Tasks, reminders and notifications",
      "Roles and access permissions",
      "Website form and messenger integration",
      "Email and document templates",
      "Sales reports and dashboards",
      "Data migration from spreadsheets or old systems",
    ],
    useCases: [
      { title: "Sales teams", text: "Track leads from first contact to closed deal with clear stages and responsibilities." },
      { title: "Service businesses", text: "Manage clients, appointments, projects and repeat orders in one place." },
      { title: "Agencies and studios", text: "Keep briefs, proposals, client communication and project status connected." },
    ],
    process: [
      { title: "Process mapping", text: "We document how leads and clients move through your business today." },
      { title: "System design", text: "Data model, pipeline stages, roles and screens are designed with your team." },
      { title: "Build & migration", text: "Development, integrations and transfer of your existing client data." },
      { title: "Onboarding & refinement", text: "Team introduction, feedback and adjustments after real use." },
    ],
    faqs: [
      { question: "Why build a custom CRM instead of using an existing one?", answer: "A custom CRM matches your process exactly, has no per-user licence fees and grows with your business. If an existing product suits you better, we will tell you honestly." },
      { question: "Can you move our data from spreadsheets?", answer: "Yes. We clean, structure and import your existing client and deal data so the team can start working immediately." },
      { question: "Can the CRM receive leads from our website automatically?", answer: "Yes. Website forms, messengers and other channels can create leads in the CRM automatically, with the source recorded." },
      { question: "Can different employees have different access?", answer: "Yes. Roles and permissions control who can view, edit or export each type of data." },
    ],
  },

  "business-automation": {
    meta: {
      title: "Business Process Automation Services",
      description:
        "Automate repetitive work: integrations, workflows, automatic documents, notifications and reports. Business automation by Codixa Technologies.",
    },
    name: "Business Automation",
    summary: "Integrations and workflows that remove repetitive manual tasks and connect the tools you already use.",
    title: "Let software handle the routine. Let your team handle the business.",
    intro:
      "Copying data between systems, sending the same emails, compiling the same reports — routine work costs hours every week and invites mistakes. We automate these processes and connect your tools, so information flows without manual effort.",
    value:
      "We look for the tasks that are frequent, rule-based and error-prone — and replace them with reliable automated workflows that your team can trust.",
    problems: [
      { title: "Hours lost to routine", text: "Skilled people spend their day on copy-and-paste and repetitive admin." },
      { title: "Disconnected tools", text: "Your website, CRM, accounting and messaging don’t share data." },
      { title: "Human errors", text: "Manual data entry leads to wrong invoices, missed orders and inconsistent records." },
    ],
    benefits: [
      { title: "Time back for the team", text: "Routine tasks run automatically, freeing people for work that needs judgement." },
      { title: "Fewer mistakes", text: "Data moves between systems exactly as defined, every time." },
      { title: "Faster response", text: "Clients receive confirmations, updates and documents instantly." },
      { title: "Clear visibility", text: "Automated reports and alerts show what is happening without manual compilation." },
    ],
    capabilities: [
      "System integrations via APIs",
      "Automated workflows and triggers",
      "Document and invoice generation",
      "Email and messenger notifications",
      "Scheduled reports",
      "Data synchronisation between tools",
      "Form processing and routing",
      "Internal bots and assistants",
    ],
    useCases: [
      { title: "Order processing", text: "A new order updates stock, notifies the warehouse and sends the customer a confirmation." },
      { title: "Lead routing", text: "Website enquiries are assigned to the right manager with a reminder to follow up." },
      { title: "Reporting", text: "Weekly sales and operations reports are generated and delivered automatically." },
    ],
    process: [
      { title: "Process audit", text: "We identify repetitive tasks and estimate the time and risk they involve." },
      { title: "Automation design", text: "Triggers, rules, exceptions and integrations are defined and agreed." },
      { title: "Implementation", text: "Workflows are built, connected and tested with real scenarios." },
      { title: "Monitoring", text: "Logs and alerts confirm everything runs, with adjustments as processes change." },
    ],
    faqs: [
      { question: "Which processes are worth automating?", answer: "Tasks that happen often, follow clear rules and are prone to errors — data entry, notifications, document creation and reporting are typical candidates." },
      { question: "Do we need to replace our current software?", answer: "Usually not. Automation often connects the tools you already use. We only suggest replacing something when it blocks the result." },
      { question: "What happens if an automated step fails?", answer: "We build in logging and alerts, so failures are visible immediately and can be handled without losing data." },
      { question: "Can we start with one process?", answer: "Yes. Automating one high-impact process first is a good way to see results quickly before expanding." },
    ],
  },

  "custom-software-development": {
    meta: {
      title: "Custom Software Development",
      description:
        "Custom software designed for your business: internal tools, management systems, integrations and platforms. Software development by Codixa Technologies.",
    },
    name: "Custom Software Development",
    summary: "Software designed for your specific operations — internal tools, management systems and platforms.",
    title: "Software built for your business — exactly as it works.",
    intro:
      "When no existing product fits, custom software gives you a tool built for your operations, your rules and your growth plans. We design, develop and maintain software that becomes a long-term asset rather than a workaround.",
    value:
      "We treat custom software as an investment: clear architecture, documented code and a roadmap, so the system stays valuable for years.",
    problems: [
      { title: "Workarounds everywhere", text: "Generic tools are bent to fit, with spreadsheets filling the gaps." },
      { title: "Licence costs keep rising", text: "Per-user fees grow with your team while the product still doesn’t fit." },
      { title: "Vendor lock-in", text: "Your data and processes depend on a product you can’t change." },
    ],
    benefits: [
      { title: "A precise fit", text: "Features, terminology and rules that match your operations." },
      { title: "Full control", text: "You decide how the software evolves and where your data lives." },
      { title: "Long-term value", text: "Maintainable architecture that can be extended without starting over." },
      { title: "A competitive edge", text: "Capabilities your competitors cannot simply buy off the shelf." },
    ],
    capabilities: [
      "Internal business tools",
      "Management and accounting systems",
      "Inventory and logistics software",
      "Scheduling and resource planning",
      "Integration platforms",
      "Legacy system modernisation",
      "Database design",
      "Technical documentation",
    ],
    useCases: [
      { title: "Operations management", text: "A single system for orders, staff, schedules and resources." },
      { title: "Modernising legacy tools", text: "Replacing outdated desktop software with a modern web-based system." },
      { title: "Industry-specific workflows", text: "Software for processes too specialised for generic products." },
    ],
    process: [
      { title: "Requirements & architecture", text: "We define the domain, data, integrations and technical architecture." },
      { title: "Prototype", text: "Key screens and flows are validated with the people who will use them." },
      { title: "Phased development", text: "The system is delivered module by module, each ready for real use." },
      { title: "Handover & support", text: "Documentation, training and long-term maintenance options." },
    ],
    faqs: [
      { question: "How do we know custom software is the right choice?", answer: "We start by checking whether an existing product could meet your needs. Custom software makes sense when your processes are distinctive, when licences are expensive, or when control over data matters." },
      { question: "Can it be delivered in stages?", answer: "Yes. We split larger systems into modules, so you can start using the most important part early and fund the rest step by step." },
      { question: "Will other developers be able to work on it?", answer: "Yes. We use mainstream technologies, consistent code structure and documentation, so the software is never dependent on a single person." },
      { question: "Can it replace our old software without losing data?", answer: "Yes. We plan the migration carefully, transfer existing data and can run old and new systems in parallel during the transition." },
    ],
  },

  "ui-ux-design": {
    meta: {
      title: "UI/UX Design for Websites & Applications",
      description:
        "User research, information architecture, wireframes, prototypes and interface design for websites and applications. UI/UX design by Codixa Technologies.",
    },
    name: "UI/UX Design",
    summary: "Interfaces that are clear, consistent and easy to use — from research and wireframes to design systems.",
    title: "Interfaces people understand at first glance.",
    intro:
      "Good design is how a product works, not only how it looks. We design websites and applications that guide users naturally to their goal, reflect your brand and give developers a precise, consistent blueprint.",
    value:
      "Because we also build what we design, every interface is realistic to develop, consistent across screens and ready for production.",
    problems: [
      { title: "Users get lost", text: "Confusing navigation and cluttered screens lead to support requests and drop-offs." },
      { title: "Inconsistent interfaces", text: "Each screen looks and behaves differently, eroding trust in the product." },
      { title: "Design that can’t be built", text: "Beautiful mockups that ignore technical constraints cause delays and compromises." },
    ],
    benefits: [
      { title: "Clear user journeys", text: "Information architecture and flows built around what users need to do." },
      { title: "A consistent system", text: "Reusable components and styles that keep every screen coherent." },
      { title: "Fewer development surprises", text: "Designs validated for feasibility, states and edge cases." },
      { title: "Accessible by default", text: "Contrast, focus states and readable typography for every user." },
    ],
    capabilities: [
      "User research and interviews",
      "Information architecture",
      "Wireframes and user flows",
      "Interactive prototypes",
      "Interface (UI) design",
      "Design systems and component libraries",
      "Usability testing",
      "Accessibility review",
    ],
    useCases: [
      { title: "New product design", text: "From idea to a tested prototype ready for development." },
      { title: "Redesign of an existing product", text: "Fixing usability issues and modernising the interface without disrupting users." },
      { title: "Design system creation", text: "A shared component library that speeds up future design and development." },
    ],
    process: [
      { title: "Research", text: "We study users, goals, competitors and your existing product data." },
      { title: "Structure & wireframes", text: "Navigation, page structure and key flows are mapped in low fidelity." },
      { title: "Visual design", text: "High-fidelity screens for mobile and desktop, aligned with your brand." },
      { title: "Prototype & handover", text: "Interactive prototypes, specifications and assets for development." },
    ],
    faqs: [
      { question: "Can you design without developing?", answer: "Yes. We can deliver design only, with prototypes and specifications ready for your own developers." },
      { question: "What tools do you use?", answer: "We design in Figma, which makes prototypes easy to review and share, and simplifies handover to developers." },
      { question: "Can you work with our existing brand guidelines?", answer: "Yes. We follow your brand identity and translate it into a digital design system where needed." },
      { question: "How do you validate a design?", answer: "Through interactive prototypes, reviews with your team and, where useful, usability tests with real users." },
    ],
  },

  "maintenance-support": {
    meta: {
      title: "Website Maintenance & Technical Support",
      description:
        "Ongoing website and software maintenance: updates, security, backups, monitoring, fixes and improvements. Technical support from Codixa Technologies.",
    },
    name: "Maintenance & Support",
    summary: "Updates, security, monitoring and improvements that keep your website and software healthy after launch.",
    title: "Keep your website and software secure, fast and up to date.",
    intro:
      "Launch is the beginning, not the end. Technologies age, security risks appear and business needs change. We maintain and support websites and applications — including ones we didn’t build — so they keep working reliably.",
    value:
      "Regular care costs far less than emergency repairs. We keep your systems healthy and improve them steadily, so problems are prevented instead of fixed in a hurry.",
    problems: [
      { title: "Nobody owns the website", text: "The original developer is gone and nobody knows how to make changes safely." },
      { title: "Security and update risks", text: "Outdated dependencies and missing backups put data and reputation at risk." },
      { title: "Slow, accumulating issues", text: "Small bugs and slowdowns pile up and quietly cost you clients." },
    ],
    benefits: [
      { title: "Peace of mind", text: "Updates, backups and monitoring handled on a regular schedule." },
      { title: "Quick help", text: "A team that knows your system and responds when something needs attention." },
      { title: "Continuous improvement", text: "Small enhancements and new features delivered steadily over time." },
      { title: "Stable performance", text: "Speed and availability checked and optimised before users notice issues." },
    ],
    capabilities: [
      "Technical audit of existing projects",
      "Dependency and security updates",
      "Backups and recovery",
      "Uptime and error monitoring",
      "Bug fixing",
      "Performance optimisation",
      "Content and feature updates",
      "Hosting and domain management",
    ],
    useCases: [
      { title: "After launch", text: "Ongoing care for a website or application we built together." },
      { title: "Taking over a project", text: "Support for a system built by another developer, after a technical audit." },
      { title: "Growing products", text: "A steady stream of improvements and new features based on user feedback." },
    ],
    process: [
      { title: "Technical audit", text: "We review the code, hosting, security and performance of your system." },
      { title: "Support plan", text: "We agree on scope, priorities and how requests are submitted and handled." },
      { title: "Regular maintenance", text: "Updates, backups, monitoring and fixes on an agreed schedule." },
      { title: "Reporting", text: "Clear summaries of the work done and recommendations for next steps." },
    ],
    faqs: [
      { question: "Can you support a website you didn’t build?", answer: "Yes. We start with a technical audit to understand the code and infrastructure, then propose a support plan." },
      { question: "What is included in maintenance?", answer: "Typically updates, security patches, backups, monitoring, bug fixes and a set amount of time for small improvements. The exact scope is agreed per project." },
      { question: "How quickly do you respond to issues?", answer: "Response times are agreed in the support plan, with critical issues such as downtime treated as the highest priority." },
      { question: "Can maintenance include new features?", answer: "Yes. Many clients use support time for continuous improvements, from new pages to new functionality." },
    ],
  },
};
