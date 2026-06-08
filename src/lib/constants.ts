import type { NavLink, Service, Stat, ProcessStep, Testimonial } from "./types";

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Digital Marketing",
    desc: "From ranking on Google to converting your email list, we run every channel with one goal: more of the right customers, at a lower cost.",
    href: "/services/digital-marketing",
  },
  {
    num: "02",
    title: "Website Development",
    desc: "Your website is your best salesperson. We build fast, conversion-optimised sites in Next.js that actually close.",
    href: "/services/website-development",
  },
  {
    num: "03",
    title: "AI Automation",
    desc: "We build AI agents, RAG pipelines, and voice systems that take repetitive work off your team's plate — permanently.",
    href: "/services/ai-automation",
  },
  {
    num: "04",
    title: "AI Training",
    desc: "Your team has AI tools they're not using properly. We fix that with practical training, prompt engineering, and workflow design.",
    href: "/services/ai-training",
  },
  {
    num: "05",
    title: "Market Research",
    desc: "Before you spend a pound on marketing, you need to know exactly who you're talking to. We find them and figure out what to say.",
    href: "/services/market-research",
  },
];

export const STATS: Stat[] = [
  { value: "312%", label: "Average increase in qualified leads" },
  { value: "£24M+", label: "Client revenue attributed to our work" },
  { value: "98%", label: "Client retention rate year-on-year" },
  { value: "48h", label: "Average time from brief to strategy" },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { step: "01", title: "Discover", desc: "We audit your current position: traffic, conversion, tech stack, competitors, customer data." },
  { step: "02", title: "Strategise", desc: "We build a growth plan specific to your business, not a template." },
  { step: "03", title: "Build & Launch", desc: "Campaigns, automations, and builds go live with full tracking in place." },
  { step: "04", title: "Optimise & Grow", desc: "We report weekly, iterate monthly, and compound results over time." },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Richa increased our inbound leads by 280% in four months. The SEO and paid media teams worked together like one unit — we'd never seen that before.",
    name: "Sarah M.",
    role: "Marketing Director",
    company: "Velocity SaaS",
  },
  {
    quote: "They built our new site and set up an AI agent that qualifies leads before they hit our CRM. I genuinely don't know how we managed without it.",
    name: "Tom R.",
    role: "CEO",
    company: "Nexus AI",
  },
  {
    quote: "The market research they did changed how we talk about our product entirely. Three months later, our conversion rate doubled.",
    name: "Priya K.",
    role: "Founder",
    company: "Orbit",
  },
];

export const TRUST_LOGOS = ["Acme Corp", "Velocity", "Nexus AI", "Orbit", "Stratford"];

export const WHY_US = [
  { title: "No lock-in contracts", desc: "Monthly rolling engagements. We earn your business every month." },
  { title: "Senior-only delivery", desc: "Your work is never passed to a junior. The people who pitch are the people who deliver." },
  { title: "Integrated, not siloed", desc: "Your SEO team talks to your dev team. Your paid media team talks to your AI team. Always." },
  { title: "Transparent reporting", desc: "Weekly Slack updates. Monthly performance reviews. No black boxes." },
];
