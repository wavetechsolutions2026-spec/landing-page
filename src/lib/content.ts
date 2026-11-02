export const siteConfig = {
  name: "Wave Tech Solution",
  tagline:
    "We design and build software for businesses in Myanmar, Thailand, and beyond.",
  description:
    "Wave Tech Solution designs and builds landing pages, CMS websites, e-commerce stores, mobile apps, and custom software for growing businesses.",
  url: "https://wave-tech-solution.wavetechsolutions2026.workers.dev", // TODO: switch to the custom domain when it is set up
  email: "wavetechsolutions2026@gmail.com",
  locations: ["Bangkok, Thailand", "Yangon, Myanmar", "Remote"], // TODO: replace placeholder with real locations
};

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

// Tools the team works with. Shown in place of client logos, which the
// agency does not have yet.
export const builtWith = [
  "Next.js",
  "React Native",
  "TypeScript",
  "C# .NET",
  "Python",
  "PostgreSQL",
  "AWS",
  "Figma",
] as const;

// Team facts only; no invented client numbers.
export const stats = [
  {
    id: "specialists",
    value: "3",
    label: "Specialists in development, design, and project management",
  },
  {
    id: "languages",
    value: "3",
    label: "Languages we work in: English, Burmese, and Thai",
  },
] as const;

// The types and lists below are the fallback copy. The live services, FAQs,
// team, and projects are edited in Sanity (/studio) and loaded by
// src/sanity/lib/landing.ts.
export type Service = {
  id: string;
  title: string;
  icon: string; // lucide-react icon name, see SERVICE_ICONS in the schema
  description: string;
  bullets: string[];
};

export type FAQItem = { id: string; question: string; answer: string };

export const services: Service[] = [
  {
    id: "landing-pages",
    title: "Landing Pages",
    icon: "Layout",
    description:
      "Fast, modern pages that turn visitors into leads.",
    bullets: [
      "Clear headline and call to action",
      "Looks good on phones",
      "Designed to get you more enquiries",
    ],
  },
  {
    id: "cms-websites",
    title: "CMS Websites",
    icon: "LayoutGrid",
    description:
      "Websites your team can update without a developer.",
    bullets: [
      "Easy to update text and images",
      "No code required to edit",
      "Fast and secure",
    ],
  },
  {
    id: "e-commerce",
    title: "E-commerce",
    icon: "ShoppingCart",
    description:
      "Online stores with products, orders, and payments.",
    bullets: [
      "Product catalog",
      "Order management",
      "Payment integration",
    ],
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    icon: "Smartphone",
    description:
      "iOS and Android apps for your customers or staff.",
    bullets: [
      "iOS and Android",
      "Fast and smooth on any phone",
      "App store ready",
    ],
  },
  {
    id: "custom-solutions",
    title: "Custom Software",
    icon: "Code",
    description:
      "Internal tools, dashboards, and systems built around how you work.",
    bullets: [
      "Fits the way you work",
      "Dashboards and reports",
      "Connects with tools you already use",
    ],
  },
];

export const whyUs = [
  {
    id: "communication",
    icon: "MessageCircle",
    title: "Your language",
    label: "Clear communication in English, Burmese, or Thai.",
  },
  {
    id: "technology",
    icon: "Cpu",
    title: "Proven technology",
    label: "We build with modern tools that are proven and widely used.",
  },
  {
    id: "pricing",
    icon: "Scale",
    title: "Fair pricing",
    label: "Your price is based on the scope of your project.",
  },
  {
    id: "support",
    icon: "Headphones",
    title: "Support after launch",
    label: "We help with maintenance after your project goes live.",
  },
] as const;

export const processSteps = [
  {
    id: "discover",
    step: 1,
    title: "Discover",
    description: "We learn your goals and requirements.",
  },
  {
    id: "design",
    step: 2,
    title: "Design",
    description: "We plan the structure and design the look.",
  },
  {
    id: "build",
    step: 3,
    title: "Build",
    description: "We develop, test, and share progress with you.",
  },
  {
    id: "launch",
    step: 4,
    title: "Launch & Support",
    description: "We go live and keep things running.",
  },
] as const;

export const faqs: FAQItem[] = [
  {
    id: "cost",
    question: "How much does a project cost?",
    answer:
      "Every project is different. Tell us what you need and we will send a free quote.",
  },
  {
    id: "timeline",
    question: "How long does a project take?",
    answer:
      "A landing page can take 1–2 weeks. Larger projects like e-commerce or mobile apps take longer. We give a timeline with every quote.",
  },
  {
    id: "international",
    question: "Do you work with clients outside Myanmar and Thailand?",
    answer:
      "Yes. We work remotely with clients anywhere.",
  },
  {
    id: "cms-update",
    question: "Can I update the website myself after launch?",
    answer:
      "Yes. If you choose an editable website, you can change the content yourself.",
  },
  {
    id: "support-after-launch",
    question: "Do you offer support after launch?",
    answer:
      "Yes. We offer maintenance and support after your project goes live.",
  },
];

export type TeamMember = {
  id?: string;
  name: string;
  shortName: string; // used in project credits, e.g. "Designed by Christine"
  role: string;
  bio: string;
  photo?: string; // 192px square face crop under /public/team/, for small avatars
  portrait?: string; // 1200x900 (4:3) photo under /public/team/, for the team card
  photoAlt?: string;
  skills: string[];
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
};

export const team: TeamMember[] = [
  {
    // Source: https://kyawpaingoo.dev
    name: "Kyaw Paing Oo",
    shortName: "Kyaw",
    role: "Full-Stack Developer",
    bio: "Full-stack developer with 3+ years of hands-on experience across CRM, healthcare, and social apps.",
    photo: "/team/kyaw-paing-oo.jpg",
    portrait: "/team/kyaw-paing-oo-portrait.jpg",
    skills: ["TypeScript", "C#", "ASP.NET Core", "Next.js", "React Native"],
    portfolioUrl: "https://kyawpaingoo.dev",
    githubUrl: "https://github.com/Kyawpaingoo",
    linkedinUrl: "https://www.linkedin.com/in/kyaw-paing-oo-dev",
  },
  {
    // Source: docs/Thuta_Aung_CV.pdf
    name: "Thuta Aung",
    shortName: "Thuta",
    role: "Project Manager",
    bio: "Keeps projects on schedule and clients in the loop. Has delivered end-to-end cloud and telecom projects, coordinating clients and vendors and running user acceptance testing before launch. Holds a BSc in Business IT and is studying an MSc in Computer Science.",
    photo: undefined, // TODO: add thuta-aung.jpg and thuta-aung-portrait.jpg under /public/team/
    skills: ["Project Delivery", "Stakeholder Communication", "Requirements Gathering", "UAT & QA", "Cloud (AWS, VMware)"],
    githubUrl: "https://github.com/wizzard1010",
    linkedinUrl: "https://www.linkedin.com/in/thuta-aung-2b3b96263",
  },
  {
    // Source: Christine_PwintYeeMon_2026.pdf
    name: "Pwint Yee Mon (Christine)",
    shortName: "Christine",
    role: "Product Designer (UX/UI)",
    bio: "Product designer with 4+ years of experience turning complex enterprise and government systems into interfaces that are easy to use, across web, mobile, and kiosk.",
    photo: undefined, // TODO: add christine-mon.jpg and christine-mon-portrait.jpg under /public/team/
    skills: ["UX Research", "UI Design", "Design Systems", "Prototyping", "Figma"],
    portfolioUrl: "https://www.behance.net/christine-mon/projects",
    linkedinUrl: "https://www.linkedin.com/in/christine-mon",
  },
];

// Industries the team has worked in, before Wave Tech. Keys match
// `projects[].industry`. The people shown on each tile come from the projects.
export const industries = [
  { id: "healthcare", icon: "HeartPulse", title: "Healthcare" },
  { id: "rewards", icon: "Gift", title: "Rewards & CRM" },
  { id: "government", icon: "GraduationCap", title: "Government & e-learning" },
  { id: "mobility", icon: "Car", title: "Mobility & car rental" },
  { id: "property", icon: "House", title: "Housing & social apps" },
  { id: "telecom", icon: "Cloud", title: "Telecom & cloud" },
] as const;

export type Project = {
  id: string;
  title: string;
  category: string;
  summary: string;
  industry: string; // industries[].id
  members: string[]; // team[].shortName, at least one
  context: string; // where the work was done; these are individual, not agency, projects
  href: string;
  linkLabel: string;
  image?: string; // 16:10 image under /public/work/, supplied by the team member
};

// Individual work by team members, from their portfolios and CVs.
export const projects: Project[] = [
  {
    // Source: https://kyawpaingoo.dev
    id: "surebenefits",
    title: "SureBenefits",
    category: "Mobile API + admin CRM",
    summary:
      "Built the mobile API and admin CRM for a rewards and loyalty platform, covering payments, pre-orders, a real-time queue, and high-volume transactions.",
    industry: "rewards",
    members: ["Kyaw"],
    context: "At Yammobots",
    href: "https://kyawpaingoo.dev",
    linkLabel: "View on portfolio",
  },
  {
    // Source: Christine_PwintYeeMon_2026.pdf
    id: "haupcar",
    title: "Haupcar",
    category: "UX/UI redesign",
    summary:
      "Redesigned the car rental mobile app, websites, and partner app, set up the design system, and simplified subscription, payment, and partner sign-up flows.",
    industry: "mobility",
    members: ["Christine"],
    context: "At Haupcar",
    href: "https://www.behance.net/christine-mon/projects",
    linkLabel: "View on Behance",
  },
  {
    // Source: docs/Thuta_Aung_CV.pdf
    id: "cloud-delivery",
    title: "Cloud & telecom delivery",
    category: "Project delivery",
    summary:
      "Supported end-to-end cloud and telecom projects: migrations across multi-cloud environments, user acceptance testing, and regular updates with clients and vendors.",
    industry: "telecom",
    members: ["Thuta"],
    context: "At Myanmar Post and Telecommunication",
    href: "https://www.linkedin.com/in/thuta-aung-2b3b96263",
    linkLabel: "View on LinkedIn",
  },
  {
    // Source: https://kyawpaingoo.dev
    id: "careme",
    title: "CareMe",
    category: "Admin dashboard",
    summary:
      "Developed the admin dashboard for a clinic management platform and moved it from ASP.NET to Blazor with a .NET API.",
    industry: "healthcare",
    members: ["Kyaw"],
    context: "At Yammobots",
    href: "https://kyawpaingoo.dev",
    linkLabel: "View on portfolio",
  },
  {
    // Source: Christine_PwintYeeMon_2026.pdf
    id: "digital-learning-space",
    title: "Digital Learning Space",
    category: "Product design",
    summary:
      "Designed a large-scale e-learning system covering library, learning, training, and exam management for many kinds of users.",
    industry: "government",
    members: ["Christine"],
    context: "For MINDEF Singapore, at EMQ2",
    href: "https://www.behance.net/christine-mon/projects",
    linkLabel: "View on Behance",
  },
  {
    // Source: https://kyawpaingoo.dev
    id: "colive",
    title: "CoLive",
    category: "Web & mobile app",
    summary:
      "Took a roommate-finder prototype to a production app on web and mobile, with compatibility matching, secure sign-in, and real-time chat.",
    industry: "property",
    members: ["Kyaw"],
    context: "Lead developer",
    href: "https://colive.info",
    linkLabel: "Visit colive.info",
  },
];
