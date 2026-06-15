import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata = {
  title: "Market Research — Unexus AI",
  description: "Audience research, competitor analysis, positioning, and market-entry research for the UAE and India — built to feed straight into your marketing.",
};

export default function MarketResearchPage() {
  return (
    <ServicePageTemplate
      num="05"
      accent="#10b981"
      badge="Service 05 — Market Research"
      headline="Most marketing fails before it starts — because nobody asked the right questions first."
      body="Businesses across the UAE and India spend on campaigns, content, and ads built on assumptions about who their customer is and what they want. When it doesn't work, they change the creative. The real problem is almost always the research that never happened. We do that research — so everything that comes after it is built on something solid."
      specialisms={["Audience Research", "Competitor Analysis", "ICP Definition", "Positioning & Messaging", "Market Entry", "UAE & India Markets"]}
      primaryCta={{ label: "Book a free discovery call", href: "/book" }}
      secondaryCta={{ label: "See what's included →", href: "#contact" }}
      audienceTitle="For businesses spending on marketing that isn't landing — and not sure why."
      audienceIntro="If any of these sound familiar, the problem is almost certainly upstream of your marketing."
      audience={[
        { title: "Retail & e-commerce", desc: "Running campaigns to a broad audience with low conversion and no clear picture of who's actually buying." },
        { title: "Real estate", desc: "Messaging that attracts lots of tyre-kickers but not the serious buyers worth spending budget on." },
        { title: "Healthcare & wellness", desc: "Entering a crowded market with no clear positioning — and no data to back up why patients should choose you." },
        { title: "Hospitality & F&B", desc: "Unclear on who the core customer actually is — and marketing to everyone, which means winning no one." },
        { title: "Startups & scale-ups", desc: "Launching into the UAE or India market without local data — and hoping the product speaks for itself." },
      ]}
      includedTitle="Research that's built to be used — not filed away after the presentation."
      includedIntro="Every engagement ends with clear, actionable outputs your team can take directly into marketing, sales, and product decisions."
      subServices={[
        {
          title: "Audience Research & ICP Definition",
          desc: "Marketing to everyone means winning no one. We build detailed customer profiles from real interviews and behaviour data — not guesses about who might buy.",
          points: ["Customer interviews — real conversations, not surveys", "Behavioural & demographic analysis", "Ideal Customer Profile (ICP) document", "Audience segmentation & priority ranking"],
        },
        {
          title: "Competitor Analysis",
          desc: "We map your competitive landscape in detail — who's winning, why, where the gaps are, and where you can position to win without going head-to-head on budget.",
          points: ["Direct & indirect competitor mapping", "Messaging & positioning analysis", "Digital presence & SEO benchmarking", "Gap & opportunity identification"],
        },
        {
          title: "Positioning & Messaging",
          desc: "The right message is the one that makes the right person stop scrolling. We work out what that is for your business — and how to say it across every channel.",
          points: ["Core positioning statement", "Key messages per audience segment", "Channel-specific messaging guidance", "Messaging playbook your team can use"],
        },
        {
          title: "UAE & India Market Entry Research",
          desc: "Entering the UAE or Indian market from outside — or expanding within it — without local data is expensive. We do the groundwork so your entry is based on what's real, not what you assumed.",
          points: ["Local market size & demand analysis", "Consumer behaviour & preference research", "Regulatory & compliance landscape overview", "Market entry strategy recommendations"],
        },
        {
          title: "Go-to-Market Strategy",
          desc: "A launch plan built on what we actually found out — not assumptions carried over from a previous market or a template someone ran for a different business.",
          points: ["Channel prioritisation & budget guidance", "Launch timeline & milestone planning", "KPIs & success metrics definition", "Handoff into marketing execution"],
        },
        {
          title: "Research Report & Presentation",
          desc: "Everything we find gets delivered in a clear, actionable report — written so your team can actually use it, not a 60-page deck that sits in someone's Downloads folder.",
          points: ["Executive summary with key findings", "Full research report & data appendix", "Presentation walkthrough with your team", "30-day follow-up Q&A session"],
        },
      ]}
      approachTitle="From first conversation to actionable research — here's the process."
      approach={[
        { title: "Scoping — we define exactly what needs answering", desc: "We start by understanding what decisions this research needs to support — a market entry, a relaunch, a new product, a messaging overhaul. The research is designed around the questions that actually matter to your business right now." },
        { title: "Research design — methodology built around your market", desc: "We design the research approach — which combination of customer interviews, competitor analysis, data sources, and market analysis will answer your questions most accurately. You approve the plan before we start." },
        { title: "Fieldwork — we talk to real people in your market", desc: "We recruit and interview your target customers ourselves — in the UAE, India, or wherever your market is. Real conversations surface things that data alone never does. We also analyse competitor positioning, digital presence, and market data in parallel." },
        { title: "Analysis — we turn what we found into what it means", desc: "Raw data doesn't make decisions — interpretation does. We analyse everything we've gathered and turn it into clear findings, patterns, and recommendations your team can act on." },
        { title: "Delivery — a report built to be used, not filed away", desc: "We present the findings to your team, walk through the recommendations, and answer questions. You get a full report, an executive summary, and a 30-day follow-up session to work through anything that comes up once you start applying it." },
      ]}
      whyTitle="What makes this different from a generic research report."
      whyCards={[
        { title: "UAE and India on-the-ground knowledge", desc: "We operate in these markets every day. We understand local consumer behaviour, cultural nuance, platform preferences, and what actually drives purchase decisions in the UAE and India — not from a textbook, from experience." },
        { title: "Research that connects to execution", desc: "Because we also run marketing and build websites, our research is designed to feed directly into action. Positioning findings go straight into messaging. ICP insights go straight into targeting. Nothing gets lost in translation between research and doing." },
        { title: "Real interviews, not just data pulls", desc: "We talk to actual customers and prospects in your market — not just pull numbers from reports. The insights that change how a business communicates almost always come from conversations, not dashboards." },
        { title: "Deliverables built to be used", desc: "We write reports that your team can pick up and use immediately — not 80-slide decks that need a consultant to interpret. Clear findings, clear recommendations, clear next steps." },
      ]}
      faqIntro="Things people usually ask before getting started."
      faqs={[
        { q: "We're launching in the UAE from outside the region. Can you help?", a: "Yes — market entry research for businesses coming into the UAE or India is one of the most common engagements we run. We look at local demand, consumer behaviour, competitor landscape, and regulatory considerations so your entry is based on real data, not assumptions." },
        { q: "We don't have any customers yet. Can you still do audience research?", a: "Yes. If you don't have customers yet, we talk to the people you're hoping will become customers — recruiting from your target demographic in your target market. Testing positioning before launch is significantly cheaper than fixing it after." },
        { q: "How long does a research engagement take?", a: "Most engagements take 4 to 6 weeks from scoping call to final report delivery. Larger or more complex projects — multiple markets, multiple audience segments — can take up to 8 weeks. We give you a specific timeline after scoping." },
        { q: "What do we actually get at the end?", a: "An ICP document, a competitor landscape overview, a positioning framework, a messaging playbook, and a full research report with findings and recommendations. Everything is written so your team can use it directly — no interpretation required." },
        { q: "Can you run research in Arabic for the UAE market?", a: "Yes — customer interviews and surveys can be conducted in Arabic for UAE and wider Middle East audiences. This is often important for getting accurate responses, particularly from local Emirati and Arab expat segments." },
        { q: "Does the research connect to your other services?", a: "Yes — and this is one of the reasons clients find it valuable. If we run research and then run your marketing, the findings go directly into your SEO strategy, ad targeting, and content. Nothing gets lost between research and execution because it's the same team doing both." },
      ]}
      closing="Clarity on exactly who to target, what to say, and where to show up — so every marketing decision that follows is built on something real, not a guess."
    />
  );
}
