import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ContactCTA from "@/components/sections/ContactCTA";
import WhyRicha from "@/components/sections/WhyRicha";
import IndustriesSection from "@/components/sections/IndustriesSection";
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
import { CLIENTS } from "@/lib/constants";
import ClientLogo from "@/components/ui/ClientLogo";
import { getSection } from "@/lib/cms";
import { HOME_HERO_DEFAULTS } from "@/lib/cms-schema";

export default async function HomePage() {
  const hero = await getSection("home.hero", HOME_HERO_DEFAULTS);
  return (
    <>
      <Preloader />
      <Nav />
      <main>

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section
          className="bg-gradient-animated relative overflow-hidden flex items-center"
          style={{
  minHeight: "80svh",
  paddingBlock: "4rem 4rem"
}}
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
                    {hero.badge}
                  </span>
                </div>
              </ScrollReveal>

              {/* Headline — 3D flip-in reveal */}
              <h1 className="text-hero text-center mb-6">
                <RevealText3D text={hero.headlineFixed} splitBy="char" stagger={0.02} delay={0.05} />
                <br />
                <TypingText words={hero.rotatingLines} />
              </h1>

              {/* Sub */}
              <ScrollReveal delay={0.2} direction="up">
                <p className="text-lead text-center max-w-2xl mx-auto mb-12">
                  {hero.sub}
                </p>
                  </ScrollReveal>

              {/* CTAs */}
              <ScrollReveal delay={0.3} direction="up">
                <div className="flex flex-wrap items-center justify-center gap-5 mb-20">
                  <MagneticButton href="#contact" className="btn btn-primary btn-lg" strength={0.3}>
                    {hero.ctaPrimary}
                  </MagneticButton>
                  <MagneticButton href="/book" className="btn btn-secondary btn-lg" strength={0.3}>
                    {hero.ctaSecondary}
                  </MagneticButton>
                </div>
              </ScrollReveal>

            </div>

            {/* Trust marquee */}
            <div className="mt-20 pt-10" style={{ borderTop:"1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-center text-xs uppercase tracking-widest mb-8" style={{ color:"var(--color-brand-600)" }}>
                {hero.trustLabel}
              </p>
              <Marquee speed={26} gap="2.75rem">
                {CLIENTS.filter((c) => c.logo).map((c, i) => (
                  <div key={c.name} className="flex flex-col items-center gap-2.5 flex-shrink-0" style={{ width: 92 }}>
                    <ClientLogo client={c} index={i} size={64} shape="circle" />
                    <span className="text-center leading-tight" style={{ fontSize: "0.7rem", color: "var(--color-brand-400)" }}>
                      {c.short ?? c.name}
                    </span>
                  </div>
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

        <IndustriesSection />
        <WhyRicha />
        <ServicesGrid />
        <ProcessSteps />
        <TestimonialsGrid />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
