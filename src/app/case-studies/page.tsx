import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/layout/CTABanner";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Case Studies — Richa",
  description: "Real results from real businesses — no cherry-picked numbers.",
};

const CASES = [
  { tag: "SaaS", metric: "+280%", label: "inbound leads in 4 months", company: "Velocity SaaS", blurb: "We unified their SEO and paid media into one compounding growth engine — and the pipeline followed.", accent: "#6366f1" },
  { tag: "AI", metric: "1,400h", label: "saved per year", company: "Nexus AI", blurb: "Built an AI agent that qualifies inbound leads before they ever reach the sales team's CRM.", accent: "#7c3aed" },
  { tag: "E-commerce", metric: "4.6x", label: "return on ad spend", company: "Orbit", blurb: "Deep customer research repositioned the brand. Conversion rate doubled within a quarter.", accent: "#f59e0b" },
  { tag: "B2B", metric: "−41%", label: "cost per acquisition", company: "Stratford", blurb: "We rebuilt the funnel and the website. Leads got cheaper, and noticeably better quality.", accent: "#06b6d4" },
  { tag: "Fintech", metric: "0.8s", label: "page load, down from 4.1s", company: "Ledgerline", blurb: "A Next.js rebuild fixed Core Web Vitals, lifted rankings, and cut bounce dramatically.", accent: "#10b981" },
  { tag: "Healthtech", metric: "3.2x", label: "qualified demos", company: "Caretrace", blurb: "GEO plus a lifecycle email engine turned passive organic traffic into booked demos.", accent: "#ec4899" },
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
          <a href="/book" className="btn btn-primary btn-lg">Start your story</a>
        </PageHero>

        <section className="section section-alt">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CASES.map((c, i) => (
                <ScrollReveal key={c.company} delay={(i % 3) * 0.08}>
                  <div className="glow-card h-full p-7 flex flex-col" style={{ border: "1px solid var(--color-border)" }}>
                    <div className="flex items-center justify-between mb-6">
                      <span className="badge badge-dark">{c.tag}</span>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.accent, boxShadow: `0 0 12px ${c.accent}` }} />
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.6rem", letterSpacing: "-0.04em", lineHeight: 1, color: c.accent }}>
                      {c.metric}
                    </div>
                    <div className="text-sm mb-5 mt-1" style={{ color: "var(--color-brand-400)" }}>{c.label}</div>
                    <div className="mt-auto">
                      <div className="font-semibold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>{c.company}</div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-300)" }}>{c.blurb}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          heading="Want to be the next case study?"
          body="Tell us where you're stuck. We'll show you, specifically, how we'd fix it."
          primaryLabel="Book a Call"
          primaryHref="/book"
          secondaryLabel="Get a Free Audit"
          secondaryHref="/audit"
        />
      </main>
      <Footer />
    </>
  );
}
