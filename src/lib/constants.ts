import type { NavLink, Service, Stat, ProcessStep, Testimonial } from "./types";

// WhatsApp click-to-chat number (digits only, country code, no "+").
// Swap to a business number at launch — it's the only place it's defined.
export const WHATSAPP_NUMBER = "971501257204";

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Digital Marketing",
    desc: "SEO, paid ads, and email — run as one joined-up system, not three separate jobs.",
    href: "/services/digital-marketing",
  },
  {
    num: "02",
    title: "Website Development",
    desc: "Fast, conversion-focused websites built to turn visitors into leads — not just look good.",
    href: "/services/website-development",
  },
  {
    num: "03",
    title: "AI Automation",
    desc: "We find the repetitive work eating your team's week and build AI that takes it off their plate — permanently.",
    href: "/services/ai-automation",
  },
  {
    num: "04",
    title: "AI Training",
    desc: "Practical, hands-on sessions so your team actually uses AI tools — not just knows they exist.",
    href: "/services/ai-training",
  },
  {
    num: "05",
    title: "Market Research",
    desc: "Know exactly who you're talking to, what they want, and how to reach them — before you spend a penny on marketing.",
    href: "/services/market-research",
  },
  {
    num: "06",
    title: "GEO — Generative Engine Optimization",
    desc: "Get your business recommended by ChatGPT, Perplexity, and Gemini — not just found on Google.",
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

export type Client = { name: string; logo?: string; short?: string; flag?: string };

// `logo` points to a file in /public/clients. Clients without a usable logo
// fall back to a styled monogram (handled by the ClientLogo component).
// `flag` is a country emoji shown as a badge on the icon.
export const CLIENTS: Client[] = [
  // India
  { name: "GEOX India", logo: "/clients/geox.png", flag: "🇮🇳" },
  { name: "Amritsari Express", logo: "/clients/amritsari-express.png", flag: "🇮🇳" },
  { name: "Café Chennai", flag: "🇮🇳" },
  { name: "Rajwada", flag: "🇮🇳" },
  { name: "DPS Sirsa", logo: "/clients/dps-sirsa.png", flag: "🇮🇳" },
  { name: "Lilawati Vidya Mandir", flag: "🇮🇳" },
  { name: "FlowerAura", logo: "/clients/floweraura.png", flag: "🇮🇳" },
  { name: "Bakingo", logo: "/clients/bakingo.png", flag: "🇮🇳" },
  { name: "Heritage Play Centre", flag: "🇮🇳" },
  { name: "Learning From Ant", flag: "🇮🇳" },
  { name: "Shaadi Emporio", flag: "🇮🇳" },
  // US
  { name: "Awake Solar", flag: "🇺🇸" },
  // UK
  { name: "Wentworth House", flag: "🇬🇧" },
  // UAE
  { name: "Richies Laundry", logo: "/clients/richies.png", short: "Richies", flag: "🇦🇪" },
  // Saudi
  { name: "Cle", flag: "🇸🇦" },
];

export const TRUST_LOGOS = CLIENTS.map((c) => c.name);

export const WHY_US = [
  { title: "One team across everything", desc: "Your SEO, your website, your AI tools, and your paid ads are all handled by the same team — so nothing falls through the gap between vendors." },
  { title: "Built for the UAE and beyond", desc: "We understand the Middle East market — consumer behaviour, platform preferences, local compliance, and what actually works here. You won't be explaining your market to us." },
  { title: "GEO-ready before your competitors are", desc: "We're one of the very few agencies in the UAE offering Generative Engine Optimisation — helping businesses show up in ChatGPT, Perplexity, and Gemini answers, not just Google." },
  { title: "No lock-in, no hiding", desc: "Month to month. A real update every week. A live dashboard you can check anytime. We'd rather earn your business every month than hold you to a contract." },
  { title: "We talk in revenue, not reports", desc: "Every service we run is measured on what it produces for your business — leads, bookings, sales — not impressions or follower counts." },
];
