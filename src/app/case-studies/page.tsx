import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ContactCTA from "@/components/sections/ContactCTA";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Case Studies — Unexus AI",
  description: "What actually happened on a handful of projects — including the numbers. Client names withheld for confidentiality.",
};

const CASES = [
  { tag: "SaaS", metric: "+280%", label: "inbound leads in 4 months", company: "B2B SaaS company", blurb: "Their SEO and paid media were run by two agencies that had never spoken. We brought both under one plan, and the pipeline followed fairly quickly.", accent: "#6366f1", seed: "case-velocity" },
  { tag: "AI", metric: "1,400h", label: "saved per year", company: "AI services firm", blurb: "Built an AI agent that screens inbound leads before they ever reach the sales team's CRM.", accent: "#7c3aed", seed: "case-nexus" },
  { tag: "E-commerce", metric: "4.6x", label: "return on ad spend", company: "D2C e-commerce brand", blurb: "A round of customer interviews changed how they talked about the product entirely. Conversion rate had roughly doubled by the next quarter.", accent: "#f59e0b", seed: "case-orbit" },
  { tag: "B2B", metric: "−41%", label: "cost per acquisition", company: "B2B services company", blurb: "We rebuilt the funnel and the website together. Leads got cheaper, and noticeably better quality too.", accent: "#06b6d4", seed: "case-stratford" },
  { tag: "Fintech", metric: "0.8s", label: "page load, down from 4.1s", company: "Fintech startup", blurb: "Their old site took over four seconds to load. A Next.js rebuild fixed that, and rankings and bounce rate both improved alongside it.", accent: "#10b981", seed: "case-ledger" },
  { tag: "Healthtech", metric: "3.2x", label: "qualified demos", company: "Healthtech company", blurb: "Organic traffic was decent but going nowhere. GEO work plus an email sequence turned a good chunk of it into booked demos.", accent: "#ec4899", seed: "case-caretrace" },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Case Studies"
          title="Results we're genuinely proud of"
          subtitle="No vanity metrics — just what actually happened on a handful of projects, including the numbers that took longer than we'd hoped. Client names withheld for confidentiality."
        >
          <a href="#contact" className="btn btn-primary btn-lg">Start your story</a>
        </PageHero>

        <section className="section section-alt">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CASES.map((c, i) => (
                <ScrollReveal key={c.seed} delay={(i % 3) * 0.08}>
                  <article
                    className="rounded-2xl overflow-hidden h-full flex flex-col group"
                    style={{ background: "var(--color-panel)", border: "1px solid var(--color-border)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
                  >
                    <div className="media-frame" style={{ aspectRatio: "16 / 10", borderRadius: 0, border: "none" }}>
                      <img src={`https://picsum.photos/seed/${c.seed}/800/500`} alt={`${c.company} case study`} loading="lazy" />
                      <span className="cover-chip text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: "rgba(3,7,18,0.6)", color: c.accent, border: `1px solid ${c.accent}55` }}>{c.tag}</span>
                    </div>
                    <div className="p-7 flex flex-col flex-1">
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.4rem", letterSpacing: "-0.04em", lineHeight: 1, color: c.accent }}>
                        {c.metric}
                      </div>
                      <div className="text-sm mb-5 mt-1" style={{ color: "var(--color-brand-400)" }}>{c.label}</div>
                      <div className="mt-auto">
                        <div className="font-semibold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>{c.company}</div>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-300)" }}>{c.blurb}</p>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA
          heading="Want to be the next case study?"
          body="Tell us where things feel stuck right now, and we'll talk through specifically what we'd do about it."
          imageSeed="unexus-results"
        />
      </main>
      <Footer />
    </>
  );
}
