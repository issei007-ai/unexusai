import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata = {
  title: "Digital Marketing — Unexus AI",
  description: "SEO, GEO, paid media, email, and conversion tracking — run as one connected system, measured on revenue. For businesses across the UAE and India.",
};

export default function DigitalMarketingPage() {
  return (
    <ServicePageTemplate
      num="01"
      accent="#6366f1"
      badge="Service 01 — Digital Marketing"
      headline="Your marketing channels should feed each other. Most don't."
      body="Businesses across the UAE and India are running SEO, paid ads, and email through separate vendors with no shared strategy. Every channel reports its own numbers. Nobody's accountable for revenue. We fix that — by running all of it as one connected system, measured on what actually matters."
      specialisms={["SEO", "GEO", "Paid Media", "Email & Lifecycle", "Conversion Tracking"]}
      primaryCta={{ label: "Get a free audit", href: "/audit" }}
      secondaryCta={{ label: "Book a 30-min call →", href: "/book" }}
      outcomes={[
        { value: "312%", label: "Average lift in qualified leads" },
        { value: "4.2x", label: "Return on ad spend" },
        { value: "−38%", label: "Cost per acquisition" },
      ]}
      audienceTitle="Built for businesses that are spending — but not seeing it in revenue."
      audienceIntro="If any of these sound familiar, this is where we start."
      audience={[
        { title: "Retail & e-commerce", desc: "Running Meta and Google ads with no clear picture of what's converting." },
        { title: "Hospitality & F&B", desc: "Getting walk-ins but invisible online — losing bookings to competitors." },
        { title: "Healthcare & wellness", desc: "Relying on word of mouth with no digital system to scale it." },
        { title: "Real estate", desc: "High ad spend, high lead volume — but low quality and low conversion." },
        { title: "Startups & scale-ups", desc: "Burning runway on marketing with no attribution and no clear ROI." },
      ]}
      includedTitle="Every channel that brings the right people to your door — run as one plan."
      includedIntro="No siloed reports. No separate vendors. One team across all of it."
      subServices={[
        {
          title: "Search Engine Optimisation",
          desc: "We focus on searches that lead to revenue — not just traffic for its own sake. Technical fixes, content, and link building prioritised by commercial intent.",
          points: ["Technical SEO audit & fixes", "Keyword research — UAE & India markets", "On-page optimisation & content strategy", "Link building & authority growth"],
        },
        {
          title: "Generative Engine Optimisation",
          desc: "ChatGPT, Perplexity, and Gemini are answering your customers' questions before they click anything. GEO makes sure your business is part of that answer.",
          points: ["GEO visibility audit", "AI-citation-ready content creation", "Entity & brand signal building", "Monthly GEO performance tracking"],
        },
        {
          title: "Paid Media",
          desc: "Meta, Google, TikTok, and LinkedIn — strategy, creative, targeting, and reporting that ties back to revenue, not just clicks and impressions.",
          points: ["Campaign strategy & audience targeting", "Ad creative development & testing", "Budget allocation & bid management", "Weekly performance reporting"],
        },
        {
          title: "Email & Lifecycle Marketing",
          desc: "Most of a customer list goes cold unless something keeps it warm. We build the sequences that do that automatically — turning one-time buyers into repeat revenue.",
          points: ["Email strategy & segmentation", "Automation flows & drip sequences", "WhatsApp marketing integration", "Open rate & conversion optimisation"],
        },
        {
          title: "Conversion Tracking & Attribution",
          desc: "If you can't see which channel is driving revenue, you're flying blind. We set up tracking from day one so every decision is backed by data you can trust.",
          points: ["GA4 & Meta Pixel setup", "Full-funnel attribution modelling", "Live dashboard — no waiting for reports", "Monthly review & strategy sessions"],
        },
      ]}
      approachTitle="What working with us on digital marketing actually looks like."
      approach={[
        { title: "Audit — we look at what you have before touching anything", desc: "We review your existing channels, ad accounts, analytics, and content. We find what's leaking, what's working, and where the fastest wins are. You get a clear picture before we spend a penny of your budget." },
        { title: "Strategy — a plan built around your business, not a template", desc: "We come back with a focused plan — which channels, in which order, with what expected outcomes for your specific industry and market. You approve it before anything goes live." },
        { title: "Launch — tracking on from day one, not bolted on after", desc: "Campaigns go live with proper measurement in place. You'll have a live dashboard so you're never waiting for a monthly report to know what's happening with your budget." },
        { title: "Optimise — weekly updates, monthly reviews, no surprises", desc: "We tell you what's working and fix what isn't — fast. A real update every week, a proper review every month. If something isn't moving the needle, we say so and change it." },
      ]}
      faqIntro="Things people usually ask before getting started."
      faqs={[
        { q: "How long before we see results from SEO?", a: "Realistically 3 to 6 months for meaningful organic movement — we won't tell you otherwise. But we identify quick wins in the first 30 days while the longer-term work builds. Paid media shows results much faster, often within the first 2 to 4 weeks." },
        { q: "Do you manage ad spend as well as strategy?", a: "Yes — strategy, creative, targeting, bidding, and reporting, all of it. You set the budget and approve the plan. We handle everything day to day and flag anything that needs your input." },
        { q: "We already have a marketing team in-house. Can you work alongside them?", a: "Often yes. We work alongside in-house teams regularly — leading on specific channels or supporting where there are gaps. We're flexible about what that looks like depending on your setup." },
        { q: "Do you work with businesses outside the UAE?", a: "Yes — we work with businesses across the UAE, India, and the wider Middle East. If you're entering the UAE or Indian market from outside, we can help with that too. Market-specific research is part of how we build every strategy." },
        { q: "What's your minimum contract length?", a: "Month to month, no lock-ins. We'd rather earn the work every month than rely on a contract to keep you around." },
        { q: "What is GEO and why does it matter?", a: "GEO — Generative Engine Optimisation — is about getting your business recommended by AI tools like ChatGPT, Perplexity, and Gemini. As more people use AI to research before they buy, showing up in those answers is becoming as important as showing up on Google. We're one of the few agencies in the UAE offering this as a dedicated service." },
      ]}
      closing="More qualified traffic, lower cost per lead, and a clear line between your marketing spend and your revenue — across SEO, GEO, paid media, and email."
    />
  );
}
