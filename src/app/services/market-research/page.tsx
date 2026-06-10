import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata = {
  title: "Market Research — DigiExperts",
  description: "Customer interviews, competitive analysis, and positioning that gives your marketing something real to say.",
};

export default function MarketResearchPage() {
  return (
    <ServicePageTemplate
      num="05"
      accent="#f59e0b"
      badge="Service 05 — Market Research"
      headline="Know your market better than your competitors do"
      body="Gut feel gets you started. Research gets you to scale. We do the deep work — customer interviews, competitive analysis, positioning strategy — so your marketing has something real to say."
      specialisms={["GTM Strategy", "ICP Definition", "Positioning & Messaging"]}
      outcomes={[
        { value: "120+", label: "Customer interviews run" },
        { value: "2x", label: "Conversion after repositioning" },
        { value: "9", label: "Markets analysed" },
      ]}
      subServices={[
        { title: "Go-to-Market Strategy", desc: "Launch with confidence, not guesswork. GTM plans grounded in real market data, not assumptions." },
        { title: "Ideal Customer Profile", desc: "Stop marketing to everyone; start winning the right ones. ICPs built from real customer interviews and behavioural data." },
        { title: "Positioning & Messaging", desc: "Say the thing that makes the right people stop scrolling. Positioning frameworks that differentiate and convert." },
      ]}
      faqs={[
        { q: "Do you conduct customer interviews yourselves?", a: "Yes. We recruit and interview your target customers directly — not just analyse existing data. Real conversations produce insights dashboards can't." },
        { q: "How is this different from a brand agency?", a: "We focus on commercial outcomes, not aesthetics. Our positioning work is designed to improve conversion and acquisition." },
        { q: "Do you work with early-stage companies that don't have customers yet?", a: "Yes. For pre-launch companies we research target buyers rather than existing customers to validate positioning before you go to market." },
        { q: "What do you deliver at the end of a research engagement?", a: "Typically: an ICP document, a competitive landscape, a positioning framework, and a messaging playbook — all in formats your team can use." },
        { q: "How long does a typical research engagement take?", a: "Most research engagements take 4–6 weeks from kick-off to delivery." },
      ]}
    />
  );
}
