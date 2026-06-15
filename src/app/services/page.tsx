import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ContactCTA from "@/components/sections/ContactCTA";
import PageHero from "@/components/sections/PageHero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { WHY_US } from "@/lib/constants";

export const metadata = {
  title: "Services — Unexus AI",
  description: "Digital marketing, website development, AI automation, AI training and market research, run by one team.",
};

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Services"
          title="Six services. Every growth lever your business needs."
          subtitle="Take one service or combine several — they're built to connect. The more they work together, the more your results compound. All delivered by one team in the UAE, serving businesses across the Middle East, India, and beyond."
        >
          <a href="/book" className="btn btn-primary btn-lg">Book a Strategy Call</a>
          <a href="#contact" className="btn btn-secondary btn-lg">Book a Free Consultation →</a>
        </PageHero>

        <ServicesGrid
          heading="Six services. Built to work together."
          intro="SEO without a website built for conversion is wasted. Paid ads without proper tracking is guesswork. AI tools without trained people are just subscriptions. We build all six services to connect — so your growth compounds instead of leaking through the gaps."
        />

        {/* Why Unexus AI */}
        <section className="section section-alt">
          <div className="container">
            <div className="text-center mb-14">
              <span className="badge badge-accent mb-5 inline-flex">Why Unexus AI</span>
              <h2 className="text-h2">What working with us is actually like</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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

        <ContactCTA
          heading="Not sure where to start?"
          body="Tell us a bit about your business and we'll help you work out where to start — it's often not the thing people expect."
          imageSeed="unexus-team"
        />
      </main>
      <Footer />
    </>
  );
}
