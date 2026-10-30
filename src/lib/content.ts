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
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const services = [
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
    title: "Editable Websites",
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
] as const;

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

export const faqs = [
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
] as const;

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo?: string; // path under /public/team/
  skills: string[];
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
};

export const team: TeamMember[] = [
  {
    // Source: https://kyawpaingoo.dev
    name: "Kyaw Paing Oo",
    role: "Full-Stack Developer",
    bio: "Full-stack developer with 3+ years of hands-on experience across CRM, healthcare, and social apps.",
    photo: "/team/kyaw-paing-oo.jpg",
    skills: ["TypeScript", "C#", "ASP.NET Core", "Next.js", "React Native"],
    portfolioUrl: "https://kyawpaingoo.dev",
    githubUrl: "https://github.com/Kyawpaingoo",
    linkedinUrl: "https://www.linkedin.com/in/kyaw-paing-oo-dev",
  },
  {
    // Source: docs/Thuta_Aung_CV.pdf
    name: "Thuta Aung",
    role: "Backend & Cloud Developer",
    bio: "Builds backend APIs with Python and PostgreSQL, with a background in cloud on AWS and VMware. Studying an MSc in Computer Science focused on AI.",
    photo: undefined, // TODO: add /public/team/thuta-aung.jpg when a photo is available
    skills: ["Python", "Litestar", "PostgreSQL", "Docker", "AWS"],
    githubUrl: "https://github.com/wizzard1010",
    linkedinUrl: "https://www.linkedin.com/in/thuta-aung-2b3b96263",
  },
];
