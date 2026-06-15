import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata = {
  title: "GEO — Generative Engine Optimisation — Unexus AI",
  description: "Get your business recommended by ChatGPT, Perplexity, Gemini, and Claude — not just found on Google. GEO for businesses across the UAE and beyond.",
};

export default function GEOPage() {
  return (
    <ServicePageTemplate
      num="06"
      accent="#6366f1"
      badge="Service 06 — Generative Engine Optimisation"
      headline="Google isn't the only search engine anymore. Is your business showing up in the new ones?"
      body="ChatGPT, Perplexity, Gemini, and Claude are now answering millions of search queries every day — recommending restaurants, agencies, clinics, and products directly in the conversation. Most businesses in the UAE have no visibility there at all. GEO is how you change that — before your competitors do."
      specialisms={["AI Search Visibility", "ChatGPT Optimisation", "Perplexity Visibility", "Entity Building", "Structured Data", "Citation Building"]}
      primaryCta={{ label: "Check your GEO visibility", href: "/audit" }}
      secondaryCta={{ label: "Book a 30-min call →", href: "/book" }}
      heroNote="Unexus AI is one of the first agencies in the UAE offering GEO as a dedicated service. Most of your competitors have never heard of it."
      comparison={{
        heading: "The way people search is changing. Most businesses aren't ready for it.",
        intro: "Here's the difference between a business with GEO and one without it — using a real scenario.",
        query: "What's the best digital marketing agency in Dubai?",
        without: "ChatGPT recommends three agencies by name. Your business isn't mentioned. The customer clicks one of those three. You never knew the conversation happened.",
        with: "ChatGPT recommends Unexus AI — describing your services, your specialisms, and why you're the right fit. The customer clicks through to your website already warm.",
        footnote: "GEO — Generative Engine Optimisation — is the practice of making your business visible and recommendable inside AI search tools. It's where SEO was in 2010. The businesses that move now will own the space. The ones that wait will spend years catching up.",
      }}
      audienceTitle="For any business whose customers use AI to research before they buy."
      audienceIntro="Which in the UAE in 2025 is most of them — especially in these industries."
      audience={[
        { title: "Hospitality & F&B", desc: "Tourists and residents asking ChatGPT “best restaurants in Dubai” — and your venue not being mentioned." },
        { title: "Healthcare & wellness", desc: "Patients asking AI tools to recommend clinics, specialists, or wellness centres in the UAE." },
        { title: "Real estate", desc: "Buyers and investors asking AI which agencies or areas to consider — before they ever open Google." },
        { title: "Retail & e-commerce", desc: "Shoppers using Perplexity or ChatGPT to research products and brands before purchasing." },
        { title: "Startups & scale-ups", desc: "B2B buyers using AI to find and vet service providers — a channel most startups have completely ignored." },
      ]}
      includedTitle="Everything needed to make your business visible and recommendable in AI search."
      includedIntro="GEO is not one thing — it's a combination of content, structure, authority, and consistency across the web."
      subServices={[
        {
          title: "GEO Visibility Audit",
          desc: "We start by finding out exactly where you stand today — how you show up across ChatGPT, Perplexity, Gemini, and Claude when someone searches for your category in the UAE or your target market.",
          points: ["AI search visibility score across platforms", "Competitor GEO benchmarking", "Gap analysis — what's missing and why", "Priority action plan from audit findings"],
        },
        {
          title: "Entity & Brand Signal Building",
          desc: "AI models build their understanding of a business from signals across the web — mentions, citations, structured data, and consistent information. We build and strengthen those signals so AI tools understand who you are and what you do.",
          points: ["Brand entity optimisation", "Consistent NAP & business info across platforms", "Wikipedia, Wikidata & knowledge graph signals", "Cross-platform brand mention building"],
        },
        {
          title: "AI-Citation-Ready Content",
          desc: "AI tools cite sources they trust — clear, factual, well-structured content that directly answers questions. We create and optimise content specifically designed to be quoted and recommended by AI engines.",
          points: ["FAQ and Q&A content optimised for AI", "Authoritative long-form service content", "Thought leadership articles & guides", "Content structured for direct AI citation"],
        },
        {
          title: "Structured Data & Schema",
          desc: "Structured data tells AI tools exactly what your business is, what it offers, where it operates, and who it serves. Without it, AI has to guess — and often gets it wrong or ignores you entirely.",
          points: ["LocalBusiness & Service schema implementation", "FAQ, HowTo & Article schema", "Product & Review schema where applicable", "Schema audit & validation"],
        },
        {
          title: "Citation & Mention Building",
          desc: "AI models learn about businesses from what others say about them across the web — directories, media, reviews, and third-party mentions. We build the citation profile that makes AI trust and recommend your business.",
          points: ["UAE & India directory submission & management", "PR & media mention strategy", "Review platform optimisation", "Third-party citation building & monitoring"],
        },
        {
          title: "GEO Performance Tracking",
          desc: "GEO visibility is measurable — we track how and where your business appears in AI search responses over time, what's improving, and what to work on next.",
          points: ["Monthly AI visibility tracking report", "Competitor GEO monitoring", "Citation & mention tracking", "Monthly strategy review & next steps"],
        },
      ]}
      approachTitle="From invisible to recommended — here's the process."
      approach={[
        { title: "Audit — find out exactly where you stand in AI search today", desc: "We test how your business appears across ChatGPT, Perplexity, Gemini, and Claude for the queries your customers are most likely to ask. Most businesses are shocked by what they find — or don't find." },
        { title: "Strategy — a GEO plan built around your market and category", desc: "We build a strategy around your specific industry, location, and target queries — prioritising the actions that will move your visibility fastest. You approve it before anything starts." },
        { title: "Foundation — entity signals, structured data, and content", desc: "We build the technical and content foundations — schema implementation, entity optimisation, brand signal consistency, and AI-citation-ready content across your site and the wider web." },
        { title: "Authority — citations, mentions, and third-party trust signals", desc: "We build your citation profile across UAE and India directories, review platforms, and media — the external signals that tell AI tools your business is credible and worth recommending." },
        { title: "Track & improve — monthly reporting on AI visibility", desc: "We track your GEO visibility monthly — how often you're being recommended, for which queries, and against which competitors. GEO compounds over time — the earlier you start, the bigger the lead you build." },
      ]}
      whyTitle="Why we're the right team to do this in the UAE."
      whyCards={[
        { title: "First movers in the UAE", desc: "We've been building GEO capability since the beginning — when most agencies in the Middle East still haven't heard of it. That head start means we know what works and what doesn't, already." },
        { title: "GEO and SEO together", desc: "GEO doesn't replace SEO — it extends it. Because we run both, your search strategy covers traditional and AI search simultaneously. Nothing is duplicated. Everything compounds." },
        { title: "Content built for AI citation", desc: "We write content specifically structured to be quoted by AI engines — not just optimised for human readers. This is a fundamentally different skill from traditional content marketing, and one we've built deliberately." },
        { title: "The window is open right now", desc: "GEO is still early. The businesses that build authority in AI search now will be very hard to displace in 12 months. We help you move while the opportunity is still there." },
      ]}
      faqIntro="Things people usually ask about GEO before getting started."
      faqs={[
        { q: "Is GEO the same as SEO?", a: "No — but they're related. SEO optimises your visibility on traditional search engines like Google. GEO optimises your visibility inside AI tools like ChatGPT, Perplexity, and Gemini. They share some foundations — good content, structured data, authority signals — but GEO has its own specific techniques that SEO alone won't cover. We recommend running both together." },
        { q: "How do you measure GEO results?", a: "We track how often your business appears in AI search responses for your target queries, how prominently it's mentioned, and how that changes over time. We also track citation growth, brand mention volume, and competitor visibility — all reported monthly." },
        { q: "How long before we see GEO results?", a: "GEO builds over time — similar to SEO. The foundational work typically takes 4 to 8 weeks to implement. Meaningful visibility improvements usually appear within 3 to 6 months, depending on your starting point and how competitive your category is. Starting earlier gives you a compounding advantage." },
        { q: "Does GEO work for local businesses in Dubai and the UAE?", a: "Yes — and local GEO is one of the highest-opportunity areas right now. When someone asks ChatGPT “best physiotherapist in Dubai” or “top real estate agency in Abu Dhabi”, those are exactly the queries we optimise for. Local intent queries in AI search are growing fast and most local UAE businesses have zero GEO presence." },
        { q: "Do I need GEO if I already have good SEO?", a: "Yes — your Google rankings don't automatically translate into AI search visibility. AI tools pull from a different set of signals — citations, entity data, structured content, and cross-platform authority. A business with excellent SEO can still be completely invisible in AI search. We often audit clients who rank well on Google but don't appear in ChatGPT at all." },
        { q: "Can you run GEO alongside our existing SEO agency?", a: "Yes — GEO and SEO can run in parallel. We'd need to coordinate on content and structured data to avoid conflicts, but working alongside an existing SEO agency is something we do regularly. If you'd prefer to consolidate, we can run both — which is where the real compounding happens." },
      ]}
      closing="Your business shows up when AI answers your customers' questions — recommended by name, before they ever visit a website. In a market where most competitors haven't started, that's a significant and compounding advantage."
    />
  );
}
