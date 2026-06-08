import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/layout/CTABanner";
import StatsStrip from "@/components/sections/StatsStrip";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProcessSteps from "@/components/sections/ProcessSteps";
import TestimonialsGrid from "@/components/sections/TestimonialsGrid";
import { TRUST_LOGOS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section
          className="section-dark relative overflow-hidden"
          style={{ paddingBlock: "8rem 6rem" }}
        >
          {/* Orb glows */}
          <div className="orb orb-primary" style={{ width: 700, height: 700, top: "-200px", left: "-150px", opacity: 0.6 }} />
          <div className="orb orb-secondary" style={{ width: 500, height: 500, top: "100px", right: "-100px", opacity: 0.5 }} />
          <div className="orb orb-tertiary" style={{ width: 300, height: 300, bottom: "-50px", left: "40%", opacity: 0.4 }} />

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid opacity-40" />

          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">

              {/* Animated badge */}
              <div className="flex items-center justify-center mb-8 animate-fade-up">
                <span className="feature-pill">
                  <span className="dot" />
                  AI-Native Digital Agency — Now accepting new clients
                </span>
              </div>

              <h1 className="text-hero text-white mb-6 animate-fade-up animate-fade-up-1">
                Grow faster with{" "}
                <span className="text-gradient text-glow">intelligent marketing</span>
              </h1>

              <p
                className="text-lead max-w-2xl mx-auto mb-10 animate-fade-up animate-fade-up-2"
                style={{ color: "var(--color-brand-300)" }}
              >
                Most agencies pick a lane — SEO or ads or AI or web. We do all of it,
                and we make them work together. The result? Growth that compounds.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fade-up animate-fade-up-3">
                <a href="/audit" className="btn btn-primary btn-lg">
                  Get a Free Audit
                </a>
                <a href="/book" className="btn btn-ghost-white btn-lg">
                  Book a Call →
                </a>
              </div>

              {/* Floating stat cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up animate-fade-up-4">
                {[
                  { value: "312%", label: "Lead increase", delay: "0s" },
                  { value: "£24M+", label: "Revenue driven", delay: "1.5s" },
                  { value: "98%", label: "Retention rate", delay: "3s" },
                  { value: "80+", label: "Clients served", delay: "4.5s" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="stat-card text-center"
                    style={{ animationDelay: s.delay }}
                  >
                    <div
                      className="text-2xl font-bold mb-0.5"
                      style={{
                        fontFamily: "var(--font-display)",
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
            </div>

            {/* Trust bar */}
            <div
              className="mt-16 pt-10"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p
                className="text-xs uppercase tracking-widest text-center mb-7"
                style={{ color: "var(--color-brand-600)" }}
              >
                Trusted by ambitious brands
              </p>
              <div className="flex flex-wrap items-center justify-center gap-10">
                {TRUST_LOGOS.map((name) => (
                  <span
                    key={name}
                    className="text-sm font-semibold tracking-wide"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────────── */}
        <StatsStrip />

        {/* ── SERVICES ─────────────────────────────────────────────────── */}
        <ServicesGrid />

        {/* ── PROCESS ──────────────────────────────────────────────────── */}
        <ProcessSteps />

        {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
        <TestimonialsGrid />

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <CTABanner />

      </main>
      <Footer />
    </>
  );
}
