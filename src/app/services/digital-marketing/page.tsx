import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata = {
  title: "Digital Marketing — Unexus AI",
  description: "SEO, GEO, paid media, and email — run as one plan instead of four separate ones.",
};

export default function DigitalMarketingPage() {
  return (
    <ServicePageTemplate
      num="01"
      accent="#6366f1"
      badge="Service 01 — Digital Marketing"
      headline="Marketing that gets judged on revenue, not traffic"
      body="Getting traffic is the easy part — you can just buy it. Getting the right people to become customers, and then stick around, is the part that actually takes work. That's where we spend our time."
      specialisms={["SEO", "GEO", "Paid Media", "Lifecycle & Email"]}
      outcomes={[
        { value: "312%", label: "Average lift in qualified leads" },
        { value: "4.2x", label: "Return on ad spend" },
        { value: "−38%", label: "Cost per acquisition" },
      ]}
      subServices={[
        { title: "Search Engine Optimisation", desc: "We focus on the searches that lead to actual revenue, not just traffic for its own sake — technical fixes, content, and link building, prioritised by how likely someone is to buy." },
        { title: "Generative Engine Optimisation", desc: "AI tools are starting to answer questions before anyone clicks a link. GEO is about making sure your business is part of that answer, not invisible to it." },
        { title: "Paid Media (PPC & Social)", desc: "Google, Meta, and LinkedIn campaigns, run end to end — strategy, creative, targeting, and reporting that ties back to revenue, not just clicks." },
        { title: "Lifecycle & Email Marketing", desc: "Most of an email list never buys again unless something nudges it to. We build the sequences that do that nudging on their own." },
      ]}
      faqs={[
        { q: "How long before we see results from SEO?", a: "Realistically, 3 to 6 months before you see meaningful movement. We won't pretend it's faster than that — but we'll find some quicker wins to work on while the bigger stuff builds." },
        { q: "Do you manage ad spend as well as the strategy?", a: "Yes — strategy, creative, targeting, bidding, and reporting, all of it. You set the budget and approve the plan; we handle the day-to-day." },
        { q: "Can you work alongside our in-house marketing team?", a: "Often, yes. Plenty of our clients have their own marketing people and we just slot in alongside them, leading or supporting depending on what's useful." },
        { q: "What's your minimum contract length?", a: "Month to month, no lock-ins. We'd rather earn the work every month than rely on a contract to keep you around." },
        { q: "Do you specialise in any particular industries?", a: "Mostly SaaS, e-commerce, B2B, and professional services — that's where most of our experience sits, though we've worked outside those too." },
      ]}
    />
  );
}
