import MagneticButton from "@/components/ui/MagneticButton";
import ScrollReveal from "@/components/ui/ScrollReveal";
import RevealText3D from "@/components/ui/RevealText3D";

interface Props {
  heading?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABanner({
  heading = "Ready to find out where you're leaving growth on the table?",
  body = "Book a free 30-minute strategy call. No pitch, no pressure — just an honest look at where you are and where you could be.",
  primaryLabel = "Get a Free Audit",
  primaryHref = "/audit",
  secondaryLabel = "Book a Call",
  secondaryHref = "/book",
}: Props) {
  return (
    <section className="section relative overflow-hidden" style={{ background: "var(--color-surface)" }}>
      {/* Orbs */}
      <div className="orb orb-primary absolute" style={{ width: 600, height: 600, bottom: "-200px", left: "-100px", opacity: 0.18 }} />
      <div className="orb orb-pink absolute" style={{ width: 400, height: 400, top: "-100px", right: "5%", opacity: 0.12 }} />
      <div className="absolute inset-0 bg-grid" style={{ opacity: 0.3 }} />

      {/* Glowing circle behind content — radial gradient (no blur filter) */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: 640, height: 300, background: "radial-gradient(ellipse, rgba(99,102,241,0.16) 0%, transparent 70%)" }}
      />

      <div className="container relative z-10 text-center">
        <ScrollReveal>
          <span className="badge badge-accent mb-7 inline-flex">Start today</span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-h2 mb-6 max-w-2xl mx-auto">
            <RevealText3D text={heading} splitBy="word" stagger={0.04} />
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lead mb-10 max-w-lg mx-auto">{body}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <MagneticButton href={primaryHref} className="btn btn-primary btn-lg">
              {primaryLabel}
            </MagneticButton>
            <MagneticButton href={secondaryHref} className="btn btn-secondary btn-lg">
              {secondaryLabel}
            </MagneticButton>
          </div>
        </ScrollReveal>

        {/* Trust strip */}
        <ScrollReveal delay={0.4}>
          <div className="divider mb-10" />
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: "✓", text: "No lock-in contracts" },
              { icon: "✓", text: "Senior-only delivery" },
              { icon: "✓", text: "Response within 24h" },
              { icon: "✓", text: "Free strategy session" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-xs" style={{ color: "var(--color-brand-400)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item.text}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
