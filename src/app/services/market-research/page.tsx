import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata = {
  title: "Market Research — DigiExperts",
  description: "Customer interviews, competitive analysis, and positioning — so your marketing has something real to say.",
};

export default function MarketResearchPage() {
  return (
    <ServicePageTemplate
      num="05"
      accent="#f59e0b"
      badge="Service 05 — Market Research"
      headline="Find out who you're talking to before you spend on marketing"
      body="Gut feel is fine for getting started, but it runs out fast. We do the slower work — talking to real customers, looking properly at competitors, working out positioning — so your marketing is built on something more solid than a hunch."
      specialisms={["GTM Strategy", "ICP Definition", "Positioning & Messaging"]}
      outcomes={[
        { value: "120+", label: "Customer interviews run" },
        { value: "2x", label: "Conversion after repositioning" },
        { value: "9", label: "Markets analysed" },
      ]}
      subServices={[
        { title: "Go-to-Market Strategy", desc: "A launch plan built on what we actually find out about your market, not assumptions carried over from someone else's playbook." },
        { title: "Ideal Customer Profile", desc: "Marketing to everyone usually means winning no one. We build customer profiles from real interviews and behaviour, not a guess at who 'might' buy." },
        { title: "Positioning & Messaging", desc: "The right message is the one that makes the right person stop scrolling. We work out what that is for your business, and how to actually say it." },
      ]}
      faqs={[
        { q: "Do you conduct customer interviews yourselves?", a: "Yes — we recruit and speak to your actual target customers ourselves, not just pull numbers from a dashboard. Real conversations tend to surface things data alone doesn't." },
        { q: "How is this different from a brand agency?", a: "We're not really focused on how things look. Our end of this is whether people convert and where they come from — the commercial side, not the aesthetic one." },
        { q: "Do you work with early-stage companies that don't have customers yet?", a: "Yes. If you don't have customers yet, we talk to the people you're hoping will become customers, so positioning gets tested before launch rather than after." },
        { q: "What do you deliver at the end of a research engagement?", a: "Usually an ICP document, a look at the competitive landscape, a positioning framework, and a messaging playbook — written so your team can actually use them, not just file them away." },
        { q: "How long does a typical research engagement take?", a: "Most engagements take 4 to 6 weeks from start to finish." },
      ]}
    />
  );
}
