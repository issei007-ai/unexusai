import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/layout/CTABanner";
import PageHero from "@/components/sections/PageHero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { WHY_US } from "@/lib/constants";

export const metadata = {
  title: "Services — Richa",
  description: "Digital marketing, website development, AI automation, AI training and market research — one integrated team.",
};

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Services"
          title="Everything you need to grow online"
          subtitle="Five services. One team. One strategy. Whether you need all of them or just one, everything connects."
        >
          <a href="/book" className="btn btn-primary btn-lg">Book a Strategy Call</a>
          <a href="/audit" className="btn btn-secondary btn-lg">Get a Free Audit →</a>
        </PageHero>

        <ServicesGrid />

        {/* Why Richa */}
        <section className="section section-alt">
          <div className="container">
            <div className="text-center mb-14">
              <span className="badge badge-accent mb-5 inline-flex">Why Richa</span>
              <h2 className="text-h2">Different by design</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {WHY_US.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.08}>
                  <div className="glow-card h-full p-6" style={{ border: "1px solid var(--color-border)" }}>
                    <h3 className="font-bold mb-2 text-white" style={{ fontFamily: "var(--font-display)" }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-400)" }}>{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          heading="Not sure where to start?"
          body="Book a free strategy call and we'll help you figure out which services will move the needle fastest for your business."
          primaryLabel="Book a Strategy Call"
          primaryHref="/book"
          secondaryLabel="Get a Free Audit"
          secondaryHref="/audit"
        />
      </main>
      <Footer />
    </>
  );
}
