import { TESTIMONIALS } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";
import RevealText3D from "@/components/ui/RevealText3D";

const ACCENT = ["#818cf8", "#a78bfa", "#67e8f9"];

export default function TestimonialsGrid() {
  return (
    <section className="section relative overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <div className="orb orb-secondary absolute" style={{ width: 600, height: 600, bottom: "-200px", left: "-100px", opacity: 0.1 }} />
      <div className="orb orb-teal absolute" style={{ width: 400, height: 400, top: "-100px", right: "-80px", opacity: 0.08 }} />
      <div className="absolute inset-0 bg-grid" style={{ opacity: 0.25 }} />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="badge badge-accent mb-5 inline-flex">Social proof</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-h2">
              <RevealText3D text="Don't take our word for it" splitBy="word" />
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lead mt-4 max-w-md mx-auto">
              Real results from real businesses — no cherry-picked numbers.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.12}>
              <TiltCard intensity={5} className="h-full">
                <div
                  className="glow-card h-full flex flex-col p-7 gap-5 relative overflow-hidden cursor-default"
                  style={{ border: "1px solid var(--color-border)" }}
                >
                  {/* Glow accent line at top */}
                  <div
                    className="absolute top-0 left-6 right-6 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${ACCENT[i]}, transparent)`, opacity: 0.4 }}
                  />

                  {/* Quote mark */}
                  <div
                    className="absolute -top-1 right-5 text-8xl font-serif leading-none select-none"
                    style={{ color: "rgba(99,102,241,0.06)" }}
                  >
                    &ldquo;
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <svg key={si} width="12" height="12" viewBox="0 0 24 24" fill={ACCENT[i]}>
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--color-brand-300)" }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${ACCENT[i]}, var(--color-glow))` }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-xs" style={{ color: "var(--color-brand-500)" }}>
                        {t.role} · {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
