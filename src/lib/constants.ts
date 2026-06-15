import type { NavLink, Service, Stat, ProcessStep, Testimonial } from "./types";

// WhatsApp click-to-chat number (digits only, country code, no "+").
// Swap to a business number at launch — it's the only place it's defined.
export const WHATSAPP_NUMBER = "919142380521";

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
    desc: "SEO, paid ads, and email — run as one joined-up plan. More visibility, more pipeline, less wasted spend.",
    href: "/services/digital-marketing",
  },
  {
    num: "02",
    title: "Website Development",
    desc: "Fast, conversion-focused websites built in Next.js. Designed to turn visitors into leads — not just look good.",
    href: "/services/website-development",
  },
  {
    num: "03",
    title: "AI Automation",
    desc: "We find the repetitive work eating your team's week and build AI agents that take it off their plate — permanently.",
    href: "/services/ai-automation",
  },
  {
    num: "04",
    title: "AI Training",
    desc: "Practical, hands-on sessions so your team actually knows what to do with AI tools — not just that they exist.",
    href: "/services/ai-training",
  },
  {
    num: "05",
    title: "Market Research",
    desc: "Before you spend a penny on marketing, know exactly who you're talking to, what they want, and how to reach them.",
    href: "/services/market-research",
  },
  {
    num: "06",
    title: "GEO — Generative Engine Optimization",
    desc: "Your customers are now getting answers from ChatGPT, Perplexity, and Gemini — not just Google. We make sure your business shows up there too.",
    href: "/services/geo",
    isNew: true,
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
    quote: "We'd been posting on social media for two years with almost no engagement. Within six weeks of working with Unexus AI, our content actually started conversations — and three of those conversations turned into paying clients.",
    name: "Navneet Jain",
    role: "Founder",
    company: "Amritsari Express",
  },
  {
    quote: "We were burning through budget on Meta with a 1.2x ROAS. Unexus restructured the entire account, rebuilt the creatives, and got us to 3.8x in 60 days. Same budget — completely different outcome.",
    name: "Performance marketing client",
    role: "Name withheld",
    company: "",
  },
  {
    quote: "Our old site looked fine but converted terribly. Unexus rebuilt it in six weeks — faster, cleaner, and actually designed around what our clients need to see before they book. Enquiries went up almost immediately.",
    name: "Yash Raj Gupta",
    role: "Manager",
    company: "Lilawati Vidya Mandir",
  },
  {
    quote: "What surprised me most was how everything connected. The SEO fed the content, the content supported the ads, the ads drove traffic to a website that actually converted. It stopped feeling like random activity and started feeling like a system.",
    name: "Anurag Sharma",
    role: "Founder",
    company: "Learning From Ant",
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
