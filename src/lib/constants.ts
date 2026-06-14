import type { NavLink, Service, Stat, ProcessStep, Testimonial } from "./types";

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Digital Marketing",
    desc: "SEO, paid ads, email — the channels that actually bring people to your door, run as one joined-up plan instead of five agencies pulling in different directions.",
    href: "/services/digital-marketing",
  },
  {
    num: "02",
    title: "Website Development",
    desc: "We design and build sites in Next.js that load quickly, feel good to use, and are built around getting visitors to actually do something.",
    href: "/services/website-development",
  },
  {
    num: "03",
    title: "AI Automation",
    desc: "Agents, RAG pipelines, voice bots — whatever fits. We look at the repetitive stuff eating your team's week and build something that takes it off their plate.",
    href: "/services/ai-automation",
  },
  {
    num: "04",
    title: "AI Training",
    desc: "Most teams have AI tools sitting half-used. We run practical, hands-on sessions so people actually know what to do with them day to day.",
    href: "/services/ai-training",
  },
  {
    num: "05",
    title: "Market Research",
    desc: "Before you spend a penny on marketing, it helps to know exactly who you're talking to. We go and find out, then help you work out what to say.",
    href: "/services/market-research",
  },
];

export const STATS: Stat[] = [
  { value: "312%", label: "Average lift in qualified leads" },
  { value: "£24M+", label: "Revenue we've helped clients generate" },
  { value: "98%", label: "Clients who stick around year after year" },
  { value: "48h", label: "From first chat to a working plan" },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { step: "01", title: "Discover", desc: "We start by looking at where things actually stand — traffic, conversion, tech, competitors, whatever data you've already got." },
  { step: "02", title: "Plan", desc: "Then we put together a plan built around your business, not a template we run for everyone who walks in." },
  { step: "03", title: "Build & Launch", desc: "Campaigns, automations, new pages — they go live with proper tracking switched on from the start, not bolted on after." },
  { step: "04", title: "Improve", desc: "We check in weekly, tweak things monthly, and keep building on whatever's actually moving the needle." },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Our inbound leads nearly tripled in four months. What actually surprised me was how well the SEO and paid media people talked to each other — most agencies just don't do that.",
    name: "Marketing Director",
    role: "B2B SaaS company",
    company: "",
  },
  {
    quote: "They rebuilt our site and set up an agent that screens leads before they even land in our CRM. I genuinely don't know how we managed without it before.",
    name: "Founder & CEO",
    role: "AI services firm",
    company: "",
  },
  {
    quote: "The research phase alone was worth the call. It changed how we talk about our product, and our conversion rate had basically doubled by the time we checked again.",
    name: "Founder",
    role: "D2C e-commerce brand",
    company: "",
  },
];

export type Client = { name: string; logo?: string; short?: string };

// `logo` points to a file in /public/clients. Clients without a usable logo
// fall back to a styled monogram (handled by the ClientLogo component).
export const CLIENTS: Client[] = [
  { name: "British Council Gurgaon", logo: "/clients/british-council.png" },
  { name: "Mphasis", logo: "/clients/mphasis.png" },
  { name: "GEOX India", logo: "/clients/geox.png" },
  { name: "DPS Sirsa", logo: "/clients/dps-sirsa.png" },
  { name: "FlowerAura", logo: "/clients/floweraura.png" },
  { name: "Bakingo", logo: "/clients/bakingo.png" },
  { name: "Amritsari Express", logo: "/clients/amritsari-express.png" },
  { name: "5àSec", logo: "/clients/5asec.png" },
  { name: "Werecle", logo: "/clients/werecle.png" },
  { name: "Awake Solar" },
  { name: "Wentworth House" },
  { name: "Shaadi Emporio" },
  { name: "Café Chennai Delhi" },
  { name: "Rajwada Delhi" },
  { name: "Lilawati Vidya Mandir" },
  { name: "Richies Laundry", logo: "/clients/richies.png", short: "Richies" },
];

export const TRUST_LOGOS = CLIENTS.map((c) => c.name);

export const WHY_US = [
  { title: "Nothing's locked in", desc: "We work month to month. If it's not working for you, you're free to go — though most people stick around." },
  { title: "We reply the same day, not next week", desc: "Most agencies take a week to answer a simple email. Message us and expect to hear back within a day — usually sooner." },
  { title: "One team, not five vendors", desc: "Your SEO person and your developer actually talk to each other. So does everyone else on the team." },
  { title: "You'll always know what's going on", desc: "A real update in Slack every week, a proper review every month, nothing hidden behind a login you never use." },
];
