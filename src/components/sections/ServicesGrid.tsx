import { SERVICES } from "@/lib/constants";

export default function ServicesGrid() {
  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-14">
          <span className="badge badge-accent mb-4 inline-flex">What we do</span>
          <h2 className="text-h2 mb-4">One agency. Every growth lever.</h2>
          <p className="text-lead max-w-2xl mx-auto">
            We built Richa because great businesses kept getting let down by specialists who
            couldn&apos;t see the bigger picture. Here&apos;s the full picture.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <a key={service.num} href={service.href} className="card p-8 group block">
              <div
                className="text-xs tracking-widest mb-4"
                style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent-400)" }}
              >
                {service.num}
              </div>
              <h3 className="text-h3 mb-3" style={{ fontFamily: "var(--font-display)" }}>
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-brand-500)" }}>
                {service.desc}
              </p>
              <span className="text-sm font-semibold" style={{ color: "var(--color-accent-500)" }}>
                Explore →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
