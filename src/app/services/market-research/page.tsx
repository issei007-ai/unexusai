import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export default function MarketResearchPage() {
  return (
    <>
      <Nav />
      <ServicePageTemplate
        badge="Service 05"
        headline="Know your market better than your competitors do"
        body="Gut feel gets you started. Research gets you to scale. We do the deep work — customer interviews, competitive analysis, positioning strategy — so your marketing has something real to say."
        specialisms={["GTM Strategy", "ICP Definition", "Positioning & Messaging"]}
        subServices={[
          { title: "Go-to-Market Strategy", desc: "Launch with confidence, not guesswork. We build GTM plans grounded in real market data, not assumptions.", href: "/services/market-research/gtm" },
          { title: "Ideal Customer Profile", desc: "Stop marketing to everyone. Start winning the right ones. We build ICPs from real customer interviews and behavioural data.", href: "/services/market-research/icp" },
          { title: "Positioning & Messaging", desc: "Say the thing that makes the right people stop scrolling. We develop positioning frameworks that differentiate and convert.", href: "/services/market-research/positioning" },
        ]}
        faqs={[
          { q: "Do you conduct customer interviews yourselves?", a: "Yes. We recruit and interview your target customers directly — not just analyse existing data. Real conversations produce insights that dashboards can't." },
          { q: "How is this different from a brand agency?", a: "We focus on commercial outcomes, not aesthetics. Our positioning work is designed to improve conversion and acquisition, not just to look good." },
          { q: "Do you work with early-stage companies that don't have customers yet?", a: "Yes. For pre-launch companies, we conduct market research with target buyers rather than existing customers to validate positioning before you go to market." },
          { q: "What do you deliver at the end of a research engagement?", a: "Typically: an ICP document, a competitive landscape, a positioning framework, and a messaging playbook — all in formats your team can actually use." },
          { q: "How long does a typical research engagement take?", a: "Most research engagements take 4–6 weeks from kick-off to delivery." },
        ]}
      />
      <Footer />
    </>
  );
}
