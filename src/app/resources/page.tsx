import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import LeadForm from "@/components/ui/LeadForm";

export const metadata = {
  title: "Resources — DigiExperts",
  description: "Free tools, templates, and guides to help you grow — no email wall on most of them.",
};

const RESOURCES = [
  { type: "Guide", title: "The 2026 AI Marketing Playbook", desc: "A 40-page field guide to using AI across your whole marketing stack — with prompts and workflows.", accent: "#7c3aed" },
  { type: "Template", title: "Conversion audit checklist", desc: "The exact 60-point checklist we run on every site before recommending changes.", accent: "#6366f1" },
  { type: "Template", title: "90-day SEO roadmap", desc: "A quarter-by-quarter plan to go from invisible to ranking — copy it into your own tools.", accent: "#10b981" },
  { type: "Calculator", title: "ROAS & CAC calculator", desc: "Plug in your numbers and see what profitable growth actually looks like for your business.", accent: "#06b6d4" },
  { type: "Guide", title: "Prompt library for marketers", desc: "100+ battle-tested prompts for copy, research, analysis, and ideation.", accent: "#f59e0b" },
  { type: "Checklist", title: "Next.js launch checklist", desc: "Everything we verify before shipping a site: performance, SEO, accessibility, analytics.", accent: "#ec4899" },
];

export default function ResourcesPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Resources"
          title="Free tools, templates & guides"
          subtitle="The same resources we use internally. Take them, use them, and grow — no strings attached."
        />

        <section className="section section-alt">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {RESOURCES.map((r, i) => (
                <ScrollReveal key={r.title} delay={(i % 3) * 0.08}>
                  <div className="glow-card h-full p-7 flex flex-col" style={{ border: "1px solid var(--color-border)" }}>
                    <span className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: r.accent }}>{r.type}</span>
                    <h3 className="text-h3 mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>{r.title}</h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-brand-300)" }}>{r.desc}</p>
                    <span className="mt-auto text-sm font-semibold inline-flex items-center gap-2" style={{ color: "var(--color-accent-300)" }}>
                      Get it free →
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Gate */}
        <section className="section">
          <div className="container">
            <div className="glow-card p-8 md:p-10 text-center mx-auto" style={{ border: "1px solid var(--color-border)", maxWidth: "40rem" }}>
              <span className="badge badge-accent mb-5 inline-flex">The full pack</span>
              <h3 className="text-h3 mb-2" style={{ fontFamily: "var(--font-display)" }}>Get everything in one download</h3>
              <p className="text-sm mb-6" style={{ color: "var(--color-brand-300)" }}>Drop your email and we&apos;ll send the entire resource pack, plus new ones as we publish them.</p>
              <div className="mx-auto" style={{ maxWidth: "22rem" }}>
                <LeadForm submitLabel="Send me the pack" note="No spam. Unsubscribe anytime.">
                  <div>
                    <input className="form-input" type="email" placeholder="you@company.com" required />
                  </div>
                </LeadForm>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
