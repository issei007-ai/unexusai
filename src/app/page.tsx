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
        {/* HERO */}
        <section className="section-dark" style={{ paddingBlock: "7rem 5rem" }}>
          <div className="container text-center max-w-4xl mx-auto">
            <span className="badge badge-dark mb-6 inline-flex">AI-Native Digital Agency</span>
            <h1 className="text-hero text-white mb-6">
              Grow faster with{" "}
              <span className="text-gradient">intelligent marketing</span>
            </h1>
            <p className="text-lead max-w-2xl mx-auto mb-10" style={{ color: "var(--color-brand-300)" }}>
              Most agencies pick a lane — SEO or ads or AI or web. We do all of it,
              and we make them work together. The result? Growth that compounds.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="/audit" className="btn btn-primary btn-lg">Get a Free Audit</a>
              <a href="/book" className="btn btn-ghost-white btn-lg">Book a Call</a>
            </div>
            <div className="mt-16 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "var(--color-brand-500)" }}>
                Trusted by ambitious brands
              </p>
              <div className="flex flex-wrap items-center justify-center gap-10 opacity-40">
                {TRUST_LOGOS.map((name) => (
                  <span key={name} className="text-white font-semibold text-sm tracking-wide">{name}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <StatsStrip />
        <ServicesGrid />
        <ProcessSteps />
        <TestimonialsGrid />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
