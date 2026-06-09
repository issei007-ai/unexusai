import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Book a Call — Richa",
  description: "Book a free 30-minute strategy call. No pitch, no pressure.",
};

const EXPECT = [
  "An honest read on where you are today",
  "The 2–3 highest-leverage opportunities we see",
  "A rough sense of timeline and investment",
  "Zero pressure — leave with value either way",
];

export default function BookPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          align="center"
          eyebrow="Book a Call"
          title="Book a free 30-minute strategy call"
          subtitle="No pitch, no pressure — just an honest look at where you are and where you could be."
        />

        <section className="section" style={{ paddingTop: "1rem" }}>
          <div className="container grid md:grid-cols-2 gap-6 items-start" style={{ maxWidth: "62rem" }}>
            {/* What to expect */}
            <ScrollReveal direction="right">
              <div className="p-2">
                <h2 className="text-h3 mb-6" style={{ fontFamily: "var(--font-display)" }}>What to expect</h2>
                <ul className="space-y-4">
                  {EXPECT.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-white" style={{ fontWeight: 500 }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="divider my-8" />
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--color-accent-500), var(--color-glow))" }}>A</div>
                  <div>
                    <div className="text-sm font-semibold text-white">Alex Carter</div>
                    <div className="text-xs" style={{ color: "var(--color-brand-400)" }}>Founder & Strategy Director</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Calendly placeholder */}
            <ScrollReveal>
              <div className="glow-card p-3" style={{ border: "1px solid var(--color-border)" }}>
                <div
                  className="rounded-xl flex flex-col items-center justify-center text-center gap-2"
                  style={{ background: "var(--color-bg)", border: "1px dashed var(--color-border-bright)", height: 440, color: "var(--color-brand-500)" }}
                >
                  <span className="text-sm font-semibold" style={{ color: "var(--color-brand-300)" }}>Calendly embed</span>
                  <span className="text-xs">Live scheduling goes here</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
