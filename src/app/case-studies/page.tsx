import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ContactCTA from "@/components/sections/ContactCTA";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Case Studies — DigiExperts",
  description: "Real results from real businesses — no cherry-picked numbers.",
};

const CASES = [
  { tag: "SaaS", metric: "+280%", label: "inbound leads in 4 months", company: "Velocity SaaS", blurb: "We unified their SEO and paid media into one compounding growth engine — and the pipeline followed.", accent: "#6366f1", seed: "case-velocity" },
  { tag: "AI", metric: "1,400h", label: "saved per year", company: "Nexus AI", blurb: "Built an AI agent that qualifies inbound leads before they ever reach the sales team's CRM.", accent: "#7c3aed", seed: "case-nexus" },
  { tag: "E-commerce", metric: "4.6x", label: "return on ad spend", company: "Orbit", blurb: "Deep customer research repositioned the brand. Conversion rate doubled within a quarter.", accent: "#f59e0b", seed: "case-orbit" },
  { tag: "B2B", metric: "−41%", label: "cost per acquisition", company: "Stratford", blurb: "We rebuilt the funnel and the website. Leads got cheaper, and noticeably better quality.", accent: "#06b6d4", seed: "case-stratford" },
  { tag: "Fintech", metric: "0.8s", label: "page load, down from 4.1s", company: "Ledgerline", blurb: "A Next.js rebuild fixed Core Web Vitals, lifted rankings, and cut bounce dramatically.", accent: "#10b981", seed: "case-ledger" },
  { tag: "Healthtech", metric: "3.2x", label: "qualified demos", company: "Caretrace", blurb: "GEO plus a lifecycle email engine turned passive organic traffic into booked demos.", accent: "#ec4899", seed: "case-caretrace" },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Case Studies"
          title="Results we're genuinely proud of"
          subtitle="No vanity metrics, no cherry-picking. Here's what happened when ambitious businesses gave us the keys."
        >
          <a href="#contact" className="btn btn-primary btn-lg">Start your story</a>
        </PageHero>

        <section className="section section-alt">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CASES.map((c, i) => (
                <ScrollReveal key={c.company} delay={(i % 3) * 0.08}>
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
          body="Tell us where you're stuck. We'll show you, specifically, how we'd fix it."
          imageSeed="digiexperts-results"
        />
      </main>
      <Footer />
    </>
  );
}
