import { BLOG_POSTS } from "./blog";

/** Field + section schema that drives both the page rendering and the /admin/content editor. */

export type CmsField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "list" | "items" | "image";
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

// ── About ────────────────────────────────────────────────────────────────────
export const ABOUT_HERO_DEFAULTS = {
  eyebrow: "About Unexus AI",
  title: "Ten years of digital marketing. Relaunched for the AI era.",
  subtitle: "Unexus AI didn't start from scratch. It was built on a decade of running real campaigns for real businesses — and relaunched when it became clear that AI and GEO were changing the rules fast enough that a new kind of agency was needed.",
  note: "Unexus AI is an SE Digicon company",
};
export const ABOUT_STATS_DEFAULTS = {
  items: [
    { value: "10+", label: "Years of digital marketing experience" },
    { value: "80+", label: "Businesses grown across India, UAE & beyond" },
    { value: "5", label: "Countries actively serving clients" },
    { value: "6", label: "Services under one roof" },
  ],
};
export const ABOUT_STORY_DEFAULTS = {
  badge: "Our story",
  title: "From SE Digicon to Unexus AI — here's what changed and why.",
  paragraphs: [
    "In 2015, Richa Gupta founded SE Digicon in India — a digital marketing agency built around one belief: that businesses deserve marketing that produces real results, not vanity metrics. Over the next decade, SE Digicon worked with 80+ businesses across retail, hospitality, education, and enterprise — in India, the UAE, the UK, and the US.",
    "Then two things happened at once. AI started changing how people search — and how businesses operate. And GEO emerged as an entirely new discipline that almost no agency had figured out yet. Running the same playbook with a different name felt like the wrong answer. So Unexus AI was born — registered in the UAE, built to serve businesses globally, and focused specifically on the intersection of digital marketing, AI, and GEO that SE Digicon had spent years moving toward.",
  ],
  highlight: "The clients are real. The experience is real. The difference is the focus.",
};
export const ABOUT_TIMELINE_DEFAULTS = {
  badge: "How we got here",
  title: "A decade in, one clear direction.",
  items: [
    { year: "2015", title: "SE Digicon founded in India", desc: "Started with a handful of clients and a clear focus on digital marketing that could be measured in revenue, not impressions. Based in India, serving clients across sectors." },
    { year: "2015–2024", title: "80+ businesses. Four countries. Six services.", desc: "Grew SE Digicon across retail, hospitality, healthcare, real estate, and enterprise — working with clients in India, UAE, UK, and US. Added website development, AI automation, and market research alongside core digital marketing." },
    { year: "2024", title: "GEO changes everything", desc: "As AI search engines started answering questions that used to belong to Google, a new discipline emerged — Generative Engine Optimisation. We started building GEO capability before most agencies had heard of it." },
    { year: "2025", title: "Unexus AI launched in the UAE", desc: "Registered in the UAE and relaunched with a sharper focus — AI training, GEO, and integrated digital marketing for businesses across the Middle East, India, and beyond. SE Digicon continues to operate alongside it." },
  ],
};
export const ABOUT_VALUES_DEFAULTS = {
  badge: "What we believe",
  title: "The principles that haven't changed in ten years.",
  items: [
    { title: "Revenue over reports", desc: "Impressions and clicks don't pay anyone's bills. Every service we run is measured on what it produces — leads, bookings, revenue. If it's not moving the needle, we say so." },
    { title: "Honest before comfortable", desc: "If something isn't working, you'll hear it from us before you have to ask. We'd rather have an awkward conversation early than a bigger one later." },
    { title: "Systems, not silos", desc: "Your SEO, website, and AI tools should feed each other — not operate in isolation. We build everything to connect, because that's where results compound." },
    { title: "See what's coming", desc: "GEO didn't exist as a discipline two years ago. We built for it early. We're always watching what's changing in search, AI, and digital — so our clients aren't caught off guard." },
  ],
};
export const ABOUT_FOUNDER_DEFAULTS = {
  badge: "The founder",
  title: "The person behind it.",
  initials: "RG",
  name: "Richa Gupta",
  role: "Founder — Unexus AI & SE Digicon · Based in Dubai, UAE 🇦🇪",
  bio: "Richa founded SE Digicon in India in 2015 and spent a decade building it into a full-service digital marketing agency serving clients across India, the UAE, the UK, and the US. When AI started reshaping search and GEO emerged as the discipline nobody had figured out yet, she launched Unexus AI in the UAE — to bring together everything SE Digicon had learned, focused specifically on what businesses need to grow in the AI era.",
};
export const ABOUT_TEAM_DEFAULTS = {
  badge: "The team",
  title: "The people doing the work.",
  members: [
    { name: "Team Member", role: "Role · Unexus AI", bio: "A short line about this team member goes here." },
    { name: "Team Member", role: "Role · Unexus AI", bio: "A short line about this team member goes here." },
    { name: "Team Member", role: "Role · Unexus AI", bio: "A short line about this team member goes here." },
  ],
};
export const ABOUT_PARTNERS_DEFAULTS = {
  badge: "Credentials & partners",
  title: "Who we work with and what we're certified in.",
  list: ["Zoho Partner", "WebEngage Partner", "MoEngage Partner", "Vercel Partner"],
  note: "Operating globally from Dubai. Unexus AI is registered in the UAE and serves clients across the Middle East, India, the UK, and the US. SE Digicon, our parent company, has been operating in India since 2015.",
};

SECTIONS.push(
  {
    key: "about.hero", label: "Hero", group: "About",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      { name: "note", label: "SE Digicon badge", type: "text" },
    ],
    defaults: ABOUT_HERO_DEFAULTS,
  },
  {
    key: "about.stats", label: "Stats", group: "About",
    fields: [
      { name: "items", label: "Stats", type: "items", itemLabel: "stat", itemFields: [
        { name: "value", label: "Value", type: "text" },
        { name: "label", label: "Label", type: "text" },
      ] },
    ],
    defaults: ABOUT_STATS_DEFAULTS,
  },
  {
    key: "about.story", label: "Story", group: "About",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "paragraphs", label: "Paragraphs (one per line)", type: "list" },
      { name: "highlight", label: "Closing highlight line", type: "text" },
    ],
    defaults: ABOUT_STORY_DEFAULTS,
  },
  {
    key: "about.timeline", label: "Timeline", group: "About",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "items", label: "Milestones", type: "items", itemLabel: "milestone", itemFields: [
        { name: "year", label: "Year", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "desc", label: "Description", type: "textarea" },
      ] },
    ],
    defaults: ABOUT_TIMELINE_DEFAULTS,
  },
  {
    key: "about.values", label: "Values", group: "About",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "items", label: "Values", type: "items", itemLabel: "value", itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "desc", label: "Description", type: "textarea" },
      ] },
    ],
    defaults: ABOUT_VALUES_DEFAULTS,
  },
  {
    key: "about.founder", label: "Founder", group: "About",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "initials", label: "Monogram initials", type: "text" },
      { name: "name", label: "Name", type: "text" },
      { name: "role", label: "Role line", type: "text" },
      { name: "bio", label: "Bio", type: "textarea" },
    ],
    defaults: ABOUT_FOUNDER_DEFAULTS,
  },
  {
    key: "about.team", label: "Team", group: "About",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "members", label: "Members", type: "items", itemLabel: "member", itemFields: [
        { name: "name", label: "Name", type: "text" },
        { name: "role", label: "Role", type: "text" },
        { name: "bio", label: "Bio", type: "textarea" },
      ] },
    ],
    defaults: ABOUT_TEAM_DEFAULTS,
  },
  {
    key: "about.partners", label: "Credentials & partners", group: "About",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "list", label: "Partners (one per line)", type: "list" },
      { name: "note", label: "Footer note", type: "textarea" },
    ],
    defaults: ABOUT_PARTNERS_DEFAULTS,
  },
);

// ── Contact ──────────────────────────────────────────────────────────────────
export const CONTACT_HERO_DEFAULTS = {
  eyebrow: "Get in touch",
  title: "Talk to us before you decide anything.",
  subtitle: "Book a free 30-minute call or send a message — either way you'll hear back from a real person within one business day. No pitch, no pressure, no obligation.",
};
export const CONTACT_INFO_DEFAULTS = {
  items: [
    { label: "WhatsApp", value: "+971 50 125 7204", sub: "Fastest way to reach us. We respond same day.", href: "https://wa.me/971501257204" },
    { label: "Email", value: "richa@unexusai.com", sub: "Reply within one business day, always.", href: "mailto:richa@unexusai.com" },
    { label: "Based in", value: "Dubai, UAE 🇦🇪", sub: "Also serving India 🇮🇳 and the wider Middle East.", href: "" },
    { label: "Working hours", value: "Sun – Thu, 9am – 6pm", sub: "Gulf Standard Time (GST, UTC+4).", href: "" },
  ],
};
export const CONTACT_BOOK_DEFAULTS = {
  eyebrow: "Book a free call",
  title: "30 minutes. No pitch. Something useful either way.",
  body: "We'll take an honest look at where things stand and tell you the two or three things we'd focus on first — whether you work with us afterwards or not.",
  note: "You'll be speaking with Richa Gupta, our founder. Times shown in GST (UTC+4) — joining from India? We'll adjust.",
};
export const CONTACT_MESSAGE_DEFAULTS = {
  eyebrow: "Send a message",
  title: "Prefer to write? We'll come back with something specific.",
  body: "Tell us where things feel stuck and what you're trying to achieve. We'll reply with specific ideas — not a generic pitch.",
};

SECTIONS.push(
  {
    key: "contact.hero", label: "Hero", group: "Contact",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
    ],
    defaults: CONTACT_HERO_DEFAULTS,
  },
  {
    key: "contact.info", label: "Contact info cards", group: "Contact",
    fields: [
      { name: "items", label: "Cards", type: "items", itemLabel: "card", help: "Icons are fixed by position: 1 WhatsApp, 2 Email, 3 Location, 4 Clock.", itemFields: [
        { name: "label", label: "Label", type: "text" },
        { name: "value", label: "Value", type: "text" },
        { name: "sub", label: "Sub-text", type: "textarea" },
        { name: "href", label: "Link (optional)", type: "text" },
      ] },
    ],
    defaults: CONTACT_INFO_DEFAULTS,
  },
  {
    key: "contact.book", label: "Book a call card", group: "Contact",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "body", label: "Body", type: "textarea" },
      { name: "note", label: "Note under scheduler", type: "textarea" },
    ],
    defaults: CONTACT_BOOK_DEFAULTS,
  },
  {
    key: "contact.message", label: "Message card", group: "Contact",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "body", label: "Body", type: "textarea" },
    ],
    defaults: CONTACT_MESSAGE_DEFAULTS,
  },
);

// ── Blog ─────────────────────────────────────────────────────────────────────
export const BLOG_PAGE_DEFAULTS = {
  heroEyebrow: "Blog",
  heroTitle: "Ideas, playbooks & field notes",
  heroSubtitle: "Practical notes on growth, AI, GEO, and marketing — written because they're useful, not to chase keywords.",
  newsletterTitle: "Get the weekly playbook",
  newsletterSub: "One useful thing a week on growth, AI, and marketing. We try to keep it short.",
};
export const BLOG_POSTS_DEFAULTS = { items: BLOG_POSTS };

// ── Case Studies ─────────────────────────────────────────────────────────────
export const CASESTUDIES_PAGE_DEFAULTS = {
  heroEyebrow: "Case Studies",
  heroTitle: "Real problems. Real work. Real results.",
  heroSubtitle: "Every case study here starts with a business that was stuck — and ends with one that isn't. Numbers are placeholders until replaced with real client data. The problems and approaches are real.",
  ctaHeading: "Want to be the next case study?",
  ctaBody: "Tell us where things feel stuck and we'll talk through specifically what we'd do about it — no pitch, no pressure.",
};
export const CASESTUDIES_CASES_DEFAULTS = {
  items: [
    { category: "Retail & e-commerce", flag: "🇦🇪", headline: "Dubai retailer spending AED 30k/month on ads with no idea what was converting.", quote: "We had three campaigns running on Meta and Google. Nobody could tell us which one was actually driving sales — or if any of them were.", tags: ["Paid Media", "Conversion Tracking", "Website"], metrics: ["2.8x | Return on ad spend", "43% | Drop in cost per purchase", "90 | Days to results"] },
    { category: "Hospitality & F&B", flag: "🇦🇪", headline: "Dubai restaurant group invisible in AI search — losing bookings to competitors.", quote: "Walk-ins were fine. But when we tested it ourselves, we weren't showing up anywhere in ChatGPT or Google when someone searched for restaurants in our area.", tags: ["GEO", "Local SEO", "Social Content"], metrics: ["5x | GEO visibility score", "38% | More online reservations", "4 | Months to results"] },
    { category: "Real estate", flag: "🇦🇪", headline: "Abu Dhabi agency generating high lead volume — almost none of them serious buyers.", quote: "We were getting 200+ leads a month from our campaigns. Our sales team was spending all their time qualifying them out. Maybe 5% were worth talking to.", tags: ["Paid Media", "AI Automation", "Landing Pages"], metrics: ["61% | Drop in unqualified leads", "3x | Sales team efficiency", "60 | Days to results"] },
    { category: "Healthcare & wellness", flag: "🇮🇳", headline: "Bangalore clinic with 200+ happy patients and almost no online presence.", quote: "Every patient came through word of mouth. We had great reviews from people who knew us — but nobody could find us online, and new patient bookings were flat.", tags: ["SEO", "Reputation Mgmt", "Content"], metrics: ["3.5x | Organic search traffic", "60% | More online bookings", "6 | Months to results"] },
    { category: "Startups", flag: "🇦🇪", headline: "Dubai startup burning runway on marketing with no clear attribution.", quote: "We were spending on ads, content, and a freelance SEO — none of it connected. Three months in we had no idea what was working and we were running out of runway.", tags: ["Digital Marketing", "Market Research", "GEO"], metrics: ["4x | Qualified leads", "52% | Lower cost per lead", "90 | Days to results"] },
    { category: "Retail & e-commerce", flag: "🇮🇳", headline: "Indian D2C brand with strong product — messaging that wasn't landing.", quote: "Our conversion rate was stuck at 1.1%. We kept changing the creative but nothing moved. We didn't realise the problem was the messaging, not the ads.", tags: ["Market Research", "Positioning", "Paid Media"], metrics: ["2.1x | Conversion rate", "3.9x | Return on ad spend", "120 | Days to results"] },
    { category: "Hospitality & F&B", flag: "🇮🇳", headline: "Delhi F&B brand with zero digital presence trying to expand to a second location.", quote: "We were well known locally. But when we tried to open a second location, we had no digital foundation to build on — no SEO, no social, no reviews strategy.", tags: ["Digital Marketing", "Website", "Local SEO"], metrics: ["8x | Online visibility", "40% | New location bookings", "5 | Months to results"] },
    { category: "Healthcare & wellness", flag: "🇦🇪", headline: "Dubai wellness brand with great retention but struggling to acquire new clients.", quote: "Existing clients loved us. But we couldn't crack new client acquisition. We were invisible to anyone who hadn't already been referred to us.", tags: ["GEO", "SEO", "Paid Media"], metrics: ["3x | New client enquiries", "55% | Lower acquisition cost", "90 | Days to results"] },
  ],
};

SECTIONS.push(
  {
    key: "blog.page", label: "Page (hero + newsletter)", group: "Blog",
    fields: [
      { name: "heroEyebrow", label: "Hero eyebrow", type: "text" },
      { name: "heroTitle", label: "Hero title", type: "text" },
      { name: "heroSubtitle", label: "Hero subtitle", type: "textarea" },
      { name: "newsletterTitle", label: "Newsletter title", type: "text" },
      { name: "newsletterSub", label: "Newsletter sub", type: "textarea" },
    ],
    defaults: BLOG_PAGE_DEFAULTS,
  },
  {
    key: "blog.posts", label: "Articles", group: "Blog",
    fields: [
      { name: "items", label: "Articles", type: "items", itemLabel: "article", help: "Body accepts HTML (headings, lists, tables). Slug must be unique and URL-safe.", itemFields: [
        { name: "slug", label: "URL slug", type: "text" },
        { name: "image", label: "Cover image", type: "image" },
        { name: "cat", label: "Category", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "date", label: "Date", type: "text" },
        { name: "read", label: "Read time", type: "text" },
        { name: "accent", label: "Accent colour (hex)", type: "text" },
        { name: "metaTitle", label: "SEO title", type: "text" },
        { name: "metaDescription", label: "SEO description", type: "textarea" },
        { name: "body", label: "Body (HTML)", type: "textarea" },
      ] },
    ],
    defaults: BLOG_POSTS_DEFAULTS,
  },
  {
    key: "casestudies.page", label: "Page (hero + CTA)", group: "Case Studies",
    fields: [
      { name: "heroEyebrow", label: "Hero eyebrow", type: "text" },
      { name: "heroTitle", label: "Hero title", type: "text" },
      { name: "heroSubtitle", label: "Hero subtitle", type: "textarea" },
      { name: "ctaHeading", label: "Closing CTA heading", type: "text" },
      { name: "ctaBody", label: "Closing CTA body", type: "textarea" },
    ],
    defaults: CASESTUDIES_PAGE_DEFAULTS,
  },
  {
    key: "casestudies.cases", label: "Case cards", group: "Case Studies",
    fields: [
      { name: "items", label: "Cases", type: "items", itemLabel: "case", itemFields: [
        { name: "category", label: "Industry", type: "text", help: "Must match a filter: Retail & e-commerce, Hospitality & F&B, Real estate, Healthcare & wellness, Startups." },
        { name: "flag", label: "Flag emoji", type: "text" },
        { name: "headline", label: "Headline", type: "text" },
        { name: "quote", label: "Quote", type: "textarea" },
        { name: "tags", label: "Tags (one per line)", type: "list" },
        { name: "metrics", label: "Metrics (value | label, one per line)", type: "list" },
      ] },
    ],
    defaults: CASESTUDIES_CASES_DEFAULTS,
  },
);

export function getSectionSchema(key: string): CmsSection | undefined {
  return SECTIONS.find((s) => s.key === key);
}
