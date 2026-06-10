import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata = {
  title: "Digital Marketing — DigiExperts",
  description: "SEO, GEO, paid media and lifecycle marketing that drives revenue, not just traffic.",
};

export default function DigitalMarketingPage() {
  return (
    <ServicePageTemplate
      num="01"
      accent="#6366f1"
      badge="Service 01 — Digital Marketing"
      headline="Digital marketing that drives revenue, not just traffic"
      body="Traffic is easy to buy. Customers are hard to earn. We build digital marketing strategies that reach the right people, convert them efficiently, and keep them coming back."
      specialisms={["SEO", "GEO", "Paid Media", "Lifecycle & Email"]}
      outcomes={[
        { value: "312%", label: "Average lift in qualified leads" },
        { value: "4.2x", label: "Return on ad spend" },
        { value: "−38%", label: "Cost per acquisition" },
      ]}
      subServices={[
        { title: "Search Engine Optimisation", desc: "Rank for the searches that actually matter. Technical SEO, content strategy, and link building — with a focus on commercial intent." },
        { title: "Generative Engine Optimisation", desc: "Get found in AI-generated answers, not just search results. GEO is the next frontier of organic visibility." },
        { title: "Paid Media (PPC & Social)", desc: "Ads that pay for themselves — and then some. Google, Meta, and LinkedIn campaigns with full attribution." },
        { title: "Lifecycle & Email Marketing", desc: "Turn one-time buyers into lifetime customers with automated sequences that nurture, convert, and retain." },
      ]}
      faqs={[
        { q: "How long before we see results from SEO?", a: "Meaningful organic results typically appear within 3–6 months. We set realistic expectations upfront and focus on quick wins alongside longer-term strategy." },
        { q: "Do you manage ad spend as well as the strategy?", a: "Yes. We manage the full cycle: strategy, creative, targeting, bidding, and reporting. You approve the budget; we handle the rest." },
        { q: "Can you work alongside our in-house marketing team?", a: "Absolutely. Many of our clients have in-house teams we collaborate with closely. We're flexible about how we plug in." },
        { q: "What's your minimum contract length?", a: "We work on monthly rolling contracts. No lock-ins. We earn your business every month." },
        { q: "Do you specialise in any particular industries?", a: "We have deep experience in SaaS, e-commerce, B2B, and professional services." },
      ]}
    />
  );
}
