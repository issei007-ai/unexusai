import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/layout/CTABanner";
import { SERVICES, WHY_US } from "@/lib/constants";

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="section-dark" style={{ paddingBlock: "6rem 4rem" }}>
          <div className="container max-w-3xl">
            <span className="badge badge-dark mb-6 inline-flex">Services</span>
            <h1 className="text-h1 text-white mb-6">Everything you need to grow online</h1>
            <p className="text-lead mb-8" style={{ color: "var(--color-brand-300)" }}>
              Five services. One team. One strategy. Whether you need all of them or just one,
              everything connects.
            </p>
            <a href="/book" className="btn btn-primary btn-lg">Book a Free Strategy Call</a>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service) => (
                <a key={service.num} href={service.href} className="card p-8 group block">
                  <div className="text-xs tracking-widest mb-4" style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent-400)" }}>
                    {service.num}
                  </div>
                  <h3 className="text-h3 mb-3" style={{ fontFamily: "var(--font-display)" }}>{service.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-brand-500)" }}>{service.desc}</p>
                  <span className="text-sm font-semibold" style={{ color: "var(--color-accent-500)" }}>Explore →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="section" style={{ background: "var(--color-brand-50)" }}>
          <div className="container">
            <div className="text-center mb-14">
              <span className="badge badge-accent mb-4 inline-flex">Why Richa</span>
              <h2 className="text-h2">Different by design</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_US.map((item) => (
                <div key={item.title} className="card p-6">
                  <h3 className="font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-500)" }}>{item.desc}</p>
                </div>
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
