import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ContactCTA from "@/components/sections/ContactCTA";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import RevealText3D from "@/components/ui/RevealText3D";
import FAQ from "@/components/ui/FAQ";
import { PROCESS_STEPS, WHY_US } from "@/lib/constants";

interface SubService {
  title: string;
  desc: string;
}
interface Outcome {
  value: string;
  label: string;
}
interface Step {
  title: string;
  desc: string;
}

interface Props {
  num: string;
  accent: string;
  badge: string;
  headline: string;
  body: string;
  specialisms: string[];
  outcomes?: Outcome[];
  subServices: SubService[];
  approach?: Step[];
  whyUs?: string[];
  faqs: { q: string; a: string }[];
}

export default function ServicePageTemplate({
  num,
  accent,
  badge,
  headline,
  body,
  specialisms,
  outcomes,
  subServices,
  approach = PROCESS_STEPS.map((s) => ({ title: s.title, desc: s.desc })),
  whyUs = WHY_US.map((w) => w.title),
  faqs,
}: Props) {
  return (
    <>
      <Nav />
      <main>
        <PageHero eyebrow={badge} title={headline} subtitle={body} pills={specialisms} accent={accent}>
          <a href="#contact" className="btn btn-primary btn-lg">Get a Custom Quote</a>
          <a href="#contact" className="btn btn-secondary btn-lg">Book a Call →</a>
        </PageHero>

        {/* Outcomes */}
        {outcomes && outcomes.length > 0 && (
          <section className="section-alt" style={{ paddingBlock: "3.5rem" }}>
            <div className="container">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {outcomes.map((o, i) => (
                  <ScrollReveal key={o.label} delay={i * 0.1}>
                    <div className="text-center sm:text-left px-2">
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 800,
                          fontSize: "clamp(2rem,4vw,2.8rem)",
                          letterSpacing: "-0.04em",
                          lineHeight: 1,
                          color: accent,
                          marginBottom: "0.5rem",
                        }}
                      >
                        {o.value}
                      </div>
                      <div className="text-sm" style={{ color: "var(--color-brand-300)" }}>{o.label}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* What's included */}
        <section className="section relative overflow-hidden">
          <div className="absolute inset-0 bg-grid" style={{ opacity: 0.18 }} />
          <div className="container relative z-10">
            <div className="mb-14 max-w-2xl">
              <span className="badge badge-accent mb-5 inline-flex">What&apos;s included</span>
              <h2 className="text-h2">
                <RevealText3D text="Everything you need, run by specialists" splitBy="word" />
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {subServices.map((sub, i) => (
                <ScrollReveal key={sub.title} delay={i * 0.07}>
                  <div className="glow-card h-full p-7" style={{ border: "1px solid var(--color-border)" }}>
                    <div className="flex items-start gap-4">
                      <span
                        className="flex-shrink-0 mt-1"
                        style={{ width: 10, height: 10, borderRadius: "50%", background: accent, boxShadow: `0 0 12px ${accent}` }}
                      />
                      <div>
                        <h3 className="text-h3 mb-2" style={{ fontFamily: "var(--font-display)" }}>{sub.title}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-300)" }}>{sub.desc}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="section section-alt">
          <div className="container">
            <div className="text-center mb-14">
              <span className="badge badge-dark mb-5 inline-flex">How we work</span>
              <h2 className="text-h2">
                <RevealText3D text="A clear path from brief to results" splitBy="word" />
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {approach.map((step, i) => (
                <ScrollReveal key={step.title} delay={i * 0.1}>
                  <div className="h-full p-6 rounded-2xl" style={{ background: "var(--color-panel)", border: "1px solid var(--color-border)" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.85rem",
                        color: accent,
                        marginBottom: "0.9rem",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-bold mb-2 text-white" style={{ fontFamily: "var(--font-display)" }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-400)" }}>{step.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="section">
          <div className="container max-w-4xl">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-5 items-start">
              <div>
                <span className="badge badge-accent mb-5 inline-flex">Why DigiExperts</span>
                <h2 className="text-h2 mb-4">
                  <RevealText3D text="Why teams pick us for this" splitBy="word" />
                </h2>
                <p className="text-lead">We plug in fast, work transparently, and care about the number that matters: your growth.</p>
              </div>
              <div className="space-y-4">
                {whyUs.map((point, i) => (
                  <ScrollReveal key={point} delay={i * 0.08} direction="left">
                    <div className="flex items-start gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-white" style={{ fontWeight: 500 }}>{point}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section section-alt">
          <div className="container max-w-3xl">
            <div className="text-center mb-12">
              <span className="badge badge-dark mb-5 inline-flex">FAQ</span>
              <h2 className="text-h2">
                <RevealText3D text="Common questions" splitBy="word" />
              </h2>
            </div>
            <FAQ items={faqs} />
          </div>
        </section>

        <ContactCTA
          heading="Ready to get started?"
          body="Tell us what you need and we'll put together a proposal within 48 hours."
          imageSeed="digiexperts-office"
        />
      </main>
      <Footer />
    </>
  );
}
