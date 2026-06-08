import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export default function DigitalMarketingPage() {
  return (
    <>
      <Nav />
      <ServicePageTemplate
        badge="Service 01"
        headline="Digital marketing that drives revenue, not just traffic"
        body="Traffic is easy to buy. Customers are hard to earn. We build digital marketing strategies that reach the right people, convert them efficiently, and keep them coming back."
        specialisms={["SEO", "GEO", "Paid Media", "Lifecycle & Email"]}
        subServices={[
          { title: "Search Engine Optimisation", desc: "Rank for the searches that actually matter. We do technical SEO, content strategy, and link building — with a focus on commercial intent.", href: "/services/digital-marketing/seo" },
          { title: "Generative Engine Optimisation", desc: "Get found in AI-generated answers, not just search results. GEO is the next frontier of organic visibility.", href: "/services/digital-marketing/geo" },
          { title: "Paid Media (PPC & Social)", desc: "Ads that pay for themselves — and then some. We run Google, Meta, and LinkedIn campaigns with full attribution.", href: "/services/digital-marketing/paid" },
          { title: "Lifecycle & Email Marketing", desc: "Turn one-time buyers into lifetime customers. We build automated sequences that nurture, convert, and retain.", href: "/services/digital-marketing/lifecycle" },
        ]}
        faqs={[
          { q: "How long before we see results from SEO?", a: "Meaningful organic results typically appear within 3–6 months. We set realistic expectations upfront and focus on quick wins alongside longer-term strategy." },
          { q: "Do you manage ad spend as well as the strategy?", a: "Yes. We manage the full cycle: strategy, creative, targeting, bidding, and reporting. You approve the budget; we handle the rest." },
          { q: "Can you work alongside our in-house marketing team?", a: "Absolutely. Many of our clients have in-house teams we collaborate with closely. We're flexible about how we plug in." },
          { q: "What's your minimum contract length?", a: "We work on monthly rolling contracts. No lock-ins. We earn your business every month." },
          { q: "Do you specialise in any particular industries?", a: "We have deep experience in SaaS, e-commerce, B2B, and professional services. Our industry pages go into more detail." },
        ]}
      />
      <Footer />
    </>
  );
}
