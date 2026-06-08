import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/layout/CTABanner";
import StatsStrip from "@/components/sections/StatsStrip";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProcessSteps from "@/components/sections/ProcessSteps";
import TestimonialsGrid from "@/components/sections/TestimonialsGrid";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import TypingText from "@/components/ui/TypingText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Marquee from "@/components/ui/Marquee";
import CustomCursor from "@/components/ui/CustomCursor";
import { TRUST_LOGOS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <main>

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden bg-gradient-animated"
          style={{ paddingBlock: "9rem 6rem", minHeight: "100vh", display: "flex", alignItems: "center" }}
        >
          {/* Particle network */}
          <ParticleCanvas />

          {/* Orbs */}
          <div className="orb orb-primary" style={{ width: 750, height: 750, top: "-200px", left: "-200px", opacity: 0.55, animation: "hero-glow 9s ease-in-out infinite" }} />
          <div className="orb orb-secondary" style={{ width: 550, height: 550, top: "60px", right: "-120px", opacity: 0.4, animation: "hero-glow 11s ease-in-out infinite reverse" }} />
          <div className="orb orb-tertiary" style={{ width: 350, height: 350, bottom: "0px", left: "38%", opacity: 0.3, animation: "hero-glow 13s ease-in-out infinite" }} />

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid" style={{ opacity: 0.35 }} />

          <div className="container relative z-10 w-full">
            <div className="max-w-4xl mx-auto text-center">

              {/* Badge */}
              <ScrollReveal delay={0}>
                <div className="flex items-center justify-center mb-8">
                  <span className="feature-pill">
                    <span className="dot" />
                    AI-Native Digital Agency — Now accepting new clients
                  </span>
                </div>
              </ScrollReveal>

              {/* Headline */}
              <ScrollReveal delay={0.1}>
                <h1 className="text-hero text-white mb-6">
                  Grow faster with
                  <br />
                  <TypingText />
                </h1>
              </ScrollReveal>

              {/* Sub */}
              <ScrollReveal delay={0.2}>
                <p className="text-lead max-w-2xl mx-auto mb-10" style={{ color: "var(--color-brand-300)" }}>
                  Most agencies pick a lane — SEO or ads or AI or web. We do all of it,
                  and we make them work together. The result? Growth that compounds.
                </p>
              </ScrollReveal>

              {/* CTAs */}
              <ScrollReveal delay={0.3}>
                <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
                  <a href="/audit" className="btn btn-primary btn-lg">
                    Get a Free Audit
                  </a>
                  <a href="/book" className="btn btn-ghost-white btn-lg">
                    Book a Call →
                  </a>
                </div>
              </ScrollReveal>

              {/* Floating stat cards */}
              <ScrollReveal delay={0.4}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { value: "312%", label: "Lead increase", delay: "0s" },
                    { value: "£24M+", label: "Revenue driven", delay: "1.2s" },
                    { value: "98%", label: "Retention rate", delay: "2.4s" },
                    { value: "80+", label: "Clients served", delay: "3.6s" },
                  ].map((s) => (
                    <div key={s.label} className="stat-card text-center" style={{ animationDelay: s.delay }}>
                      <div
                        className="text-2xl font-bold mb-1"
                        style={{
                          fontFamily: "var(--font-display)",
                          letterSpacing: "-0.03em",
                          background: "linear-gradient(135deg,#fff 0%,var(--color-accent-300) 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {s.value}
                      </div>
                      <div className="text-xs" style={{ color: "var(--color-brand-400)" }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Trust marquee */}
            <div className="mt-20 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-center text-xs uppercase tracking-widest mb-8" style={{ color: "var(--color-brand-600)" }}>
                Trusted by ambitious brands
              </p>
              <Marquee speed={22}>
                {TRUST_LOGOS.map((name) => (
                  <span
                    key={name}
                    className="text-sm font-semibold tracking-wide flex-shrink-0"
                    style={{ color: "rgba(255,255,255,0.22)" }}
                  >
                    {name}
                  </span>
                ))}
              </Marquee>
            </div>
          </div>
        </section>

        {/* ── STATS ──────────────────────────────────────────────────────── */}
        <StatsStrip />

        {/* ── SERVICES ───────────────────────────────────────────────────── */}
        <ServicesGrid />

        {/* ── PROCESS ────────────────────────────────────────────────────── */}
        <ProcessSteps />

        {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
        <TestimonialsGrid />

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <CTABanner />

      </main>
      <Footer />
    </>
  );
}
