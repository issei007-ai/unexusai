/** Field + section schema that drives both the page rendering and the /admin/content editor. */

export type CmsField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "list" | "items";
  help?: string;
  /** Subfields for a repeater ("items") field. */
  itemFields?: CmsField[];
  /** Label for the "add" button on a repeater. */
  itemLabel?: string;
};

export type CmsSection = {
  key: string;
  label: string;
  group: string;
  fields: CmsField[];
  defaults: Record<string, unknown>;
};

// ── Homepage: Hero ───────────────────────────────────────────────────────────
export const HOME_HERO_DEFAULTS = {
  badge: "AI-Powered Digital Marketing • Precision. Performance. Growth.",
  headlineFixed: "You're spending on marketing",
  rotatingLines: [
    "You're not seeing it in revenue",
    "You're not getting enough leads",
    "You're not showing up on AI search",
  ],
  sub: "We fix that — with GEO, Google Ads, Meta Ads, Digital Marketing and website development built to work together, for businesses across UAE, KSA, India and beyond.",
  ctaPrimary: "Book Free Consultation",
  ctaSecondary: "Book Free Call →",
  trustLabel: "Our clients span industries and time zones.",
};

export const SECTIONS: CmsSection[] = [
  {
    key: "home.hero",
    label: "Hero",
    group: "Homepage",
    fields: [
      { name: "badge", label: "Top badge", type: "text" },
      { name: "headlineFixed", label: "Headline — fixed line", type: "text" },
      { name: "rotatingLines", label: "Headline — rotating lines", type: "list", help: "One line per row. These type in/out under the fixed headline." },
      { name: "sub", label: "Sub-headline", type: "textarea" },
      { name: "ctaPrimary", label: "Primary button label", type: "text" },
      { name: "ctaSecondary", label: "Secondary button label", type: "text" },
      { name: "trustLabel", label: "Client strip label", type: "text" },
    ],
    defaults: HOME_HERO_DEFAULTS,
  },
];

// ── Homepage: Industries header ──────────────────────────────────────────────
export const HOME_INDUSTRIES_DEFAULTS = {
  eyebrow: "Who we work with",
  title: "We've seen what's holding your industry back.",
  intro: "Every industry has its own version of the same problem — money going into marketing, not enough coming back out. Here's what we see most often, and what we do about it.",
};

// ── Homepage: Services grid header ───────────────────────────────────────────
export const HOME_SERVICES_DEFAULTS = {
  heading: "Six services. One team. Built to work together.",
  intro: "Each service is powerful on its own. The real difference is when they connect — your SEO feeds your content, your website converts what your ads bring in, your AI tools make it all faster.",
};

// ── Homepage: Why Unexus AI ──────────────────────────────────────────────────
export const HOME_WHY_DEFAULTS = {
  badge: "Why Unexus AI",
  title: "Not promises. Just how we actually work.",
  intro: "The things that matter when you're choosing who to trust with your growth.",
  reasons: [
    { title: "One team across everything", desc: "Your SEO, your website, your AI tools, and your paid ads are all handled by the same team — so nothing falls through the gap between vendors." },
    { title: "Built for the UAE and beyond", desc: "We understand the Middle East market — consumer behaviour, platform preferences, local compliance, and what actually works here. You won't be explaining your market to us." },
    { title: "GEO-ready before your competitors are", desc: "We're one of the very few agencies in the UAE offering Generative Engine Optimisation — helping businesses show up in ChatGPT, Perplexity, and Gemini answers, not just Google." },
    { title: "No lock-in, no hiding", desc: "Month to month. A real update every week. A live dashboard you can check anytime. We'd rather earn your business every month than hold you to a contract." },
    { title: "We talk in revenue, not reports", desc: "Every service we run is measured on what it produces for your business — leads, bookings, sales — not impressions or follower counts." },
  ],
};

// ── Homepage: Process ────────────────────────────────────────────────────────
export const HOME_PROCESS_DEFAULTS = {
  badge: "How it works",
  title: "From first call to real results — here's what working with us actually looks like.",
  intro: "No black boxes. No waiting weeks to hear back. You'll know exactly what's happening and why at every stage.",
  steps: [
    { feeling: "YOU FEEL → HEARD", title: "We listen before we suggest anything.", desc: "A 30-minute call where we ask the questions most agencies skip — what's actually not working, what you've already tried, and what success looks like for your business specifically.", action: "Talk to us honestly. The more context you give, the sharper our plan." },
    { feeling: "YOU FEEL → CLEAR", title: "You get a plan built around your business — not a template.", desc: "Within a week, we come back with a focused plan — which services, in which order, with what expected outcomes. We show you exactly where your money goes and why.", action: "Review, ask questions, push back. We'd rather get it right than move fast." },
    { feeling: "YOU FEEL → IN CONTROL", title: "Things go live — with tracking on from day one.", desc: "Campaigns, automations, new pages — nothing launches without proper measurement in place. You'll have visibility into what's happening from the start.", action: "Watch it go live. Ask us anything. We're reachable when you need us." },
    { feeling: "YOU FEEL → MOMENTUM", title: "We tell you what's working — and fix what isn't, fast.", desc: "A real update every week. A proper review every month. If something isn't moving the needle, we say so and change it. No waiting, no excuses.", action: "Stay looped in. Growth compounds when both sides are engaged." },
    { feeling: "YOU FEEL → CONFIDENT", title: "You always know what comes next.", desc: "Every month ends with a clear picture — what happened, what it produced, and what we're doing next. No guessing. No chasing.", action: "Approve the next month, or don't. No lock-in — ever." },
  ],
};

// ── Homepage: Testimonials ───────────────────────────────────────────────────
export const HOME_TESTIMONIALS_DEFAULTS = {
  badge: "Social proof",
  title: "Don't take our word for it",
  intro: "A few words from the people we've worked with.",
  items: [
    { quote: "We'd been posting on social media for two years with almost no engagement. Within six weeks of working with Unexus AI, our content actually started conversations — and three of those conversations turned into paying clients.", name: "Navneet Jain", role: "Founder", company: "Amritsari Express" },
    { quote: "We were burning through budget on Meta with a 1.2x ROAS. Unexus restructured the entire account, rebuilt the creatives, and got us to 3.8x in 60 days. Same budget — completely different outcome.", name: "Performance marketing client", role: "Name withheld", company: "" },
    { quote: "Our old site looked fine but converted terribly. Unexus rebuilt it in six weeks — faster, cleaner, and actually designed around what our clients need to see before they book. Enquiries went up almost immediately.", name: "Yash Raj Gupta", role: "Manager", company: "Lilawati Vidya Mandir" },
    { quote: "What surprised me most was how everything connected. The SEO fed the content, the content supported the ads, the ads drove traffic to a website that actually converted. It stopped feeling like random activity and started feeling like a system.", name: "Anurag Sharma", role: "Founder", company: "Learning From Ant" },
  ],
};

SECTIONS.push(
  {
    key: "home.industries",
    label: "Industries — header",
    group: "Homepage",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "intro", label: "Intro", type: "textarea" },
    ],
    defaults: HOME_INDUSTRIES_DEFAULTS,
  },
  {
    key: "home.services",
    label: "Services grid — header",
    group: "Homepage",
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "intro", label: "Intro", type: "textarea" },
    ],
    defaults: HOME_SERVICES_DEFAULTS,
  },
  {
    key: "home.why",
    label: "Why Unexus AI",
    group: "Homepage",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "intro", label: "Intro", type: "textarea" },
      { name: "reasons", label: "Reasons", type: "items", itemLabel: "reason", itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "desc", label: "Description", type: "textarea" },
      ] },
    ],
    defaults: HOME_WHY_DEFAULTS,
  },
  {
    key: "home.process",
    label: "Process",
    group: "Homepage",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "intro", label: "Intro", type: "textarea" },
      { name: "steps", label: "Steps", type: "items", itemLabel: "step", itemFields: [
        { name: "feeling", label: "Feeling line", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "desc", label: "Description", type: "textarea" },
        { name: "action", label: "Your part", type: "textarea" },
      ] },
    ],
    defaults: HOME_PROCESS_DEFAULTS,
  },
  {
    key: "home.testimonials",
    label: "Testimonials",
    group: "Homepage",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "intro", label: "Intro", type: "textarea" },
      { name: "items", label: "Testimonials", type: "items", itemLabel: "testimonial", itemFields: [
        { name: "quote", label: "Quote", type: "textarea" },
        { name: "name", label: "Name", type: "text" },
        { name: "role", label: "Role", type: "text" },
        { name: "company", label: "Company", type: "text" },
      ] },
    ],
    defaults: HOME_TESTIMONIALS_DEFAULTS,
  },
);

export function getSectionSchema(key: string): CmsSection | undefined {
  return SECTIONS.find((s) => s.key === key);
}
