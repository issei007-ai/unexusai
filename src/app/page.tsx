import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/layout/CTABanner";
import WhyRicha from "@/components/sections/WhyRicha";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProcessSteps from "@/components/sections/ProcessSteps";
import TestimonialsGrid from "@/components/sections/TestimonialsGrid";
import HeroVisual from "@/components/three/HeroVisual";
import RevealText3D from "@/components/ui/RevealText3D";
import TypingText from "@/components/ui/TypingText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Marquee from "@/components/ui/Marquee";
import MagneticButton from "@/components/ui/MagneticButton";
import Preloader from "@/components/ui/Preloader";
import { TRUST_LOGOS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Nav />
      <main>

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section
          className="bg-gradient-animated relative overflow-hidden flex items-center"
          style={{ minHeight: "100svh", paddingBlock: "9rem 5rem" }}
        >
          {/* Hero visual: WebGL 3D blob on desktop, CSS aurora on mobile */}
          <HeroVisual />

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid" style={{ opacity:0.35, zIndex:2 }} />

          {/* Bottom fade — above the 3D blob so it melts into the next section */}
          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            style={{ background:"linear-gradient(to bottom, transparent, var(--color-bg))", zIndex:3 }} />

          <div className="container relative z-10 w-full">
            <div className="max-w-5xl mx-auto">

              {/* Badge */}
              <ScrollReveal delay={0} direction="none">
                <div className="flex justify-center mb-8">
                  <span className="feature-pill">
                    <span className="dot" />
                    AI-Native Digital Agency — Now accepting new clients
                  </span>
                </div>
              </ScrollReveal>

              {/* Headline — 3D flip-in reveal */}
              <h1 className="text-hero text-center mb-6">
                <RevealText3D text="Grow faster with" splitBy="char" stagger={0.03} delay={0.05} />
                <br />
                <TypingText />
              </h1>

              {/* Sub */}
              <ScrollReveal delay={0.2} direction="up">
                <p className="text-lead text-center max-w-2xl mx-auto mb-12">
                  Most agencies pick a lane — SEO or ads or AI or web. We do all of it,
                  and we make them work together. The result? Growth that compounds.
                </p>
              </ScrollReveal>

              {/* CTAs */}
              <ScrollReveal delay={0.3} direction="up">
                <div className="flex flex-wrap items-center justify-center gap-5 mb-20">
                  <MagneticButton href="/audit" className="btn btn-primary btn-lg" strength={0.3}>
                    Get a Free Audit
                  </MagneticButton>
                  <MagneticButton href="/book" className="btn btn-secondary btn-lg" strength={0.3}>
                    Book a Call →
                  </MagneticButton>
                </div>
              </ScrollReveal>

            </div>

            {/* Trust marquee */}
            <div className="mt-20 pt-10" style={{ borderTop:"1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-center text-xs uppercase tracking-widest mb-8" style={{ color:"var(--color-brand-600)" }}>
                Trusted by ambitious brands
              </p>
              <Marquee speed={24}>
                {TRUST_LOGOS.map((name) => (
                  <span key={name} className="text-sm font-semibold tracking-wide flex-shrink-0"
                    style={{ color:"rgba(255,255,255,0.2)" }}>
                    {name}
                  </span>
                ))}
              </Marquee>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="scroll-cue">
            <span className="scroll-cue__mouse" />
            Scroll
          </div>
        </section>

        <WhyRicha />
        <ServicesGrid />
        <ProcessSteps />
        <TestimonialsGrid />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
