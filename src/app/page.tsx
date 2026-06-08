export default function HomePage() {
  return (
    <main>
      {/* NAV */}
      <nav
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        className="sticky top-0 z-50 bg-[var(--color-brand-950)] backdrop-blur-md"
      >
        <div className="container flex items-center justify-between h-16">
          <span className="font-display text-white font-bold text-xl tracking-tight">
            richa<span className="text-[var(--color-accent-400)]">.</span>
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-brand-300)]">
            <a href="/services" className="hover:text-white transition-colors">Services</a>
            <a href="/case-studies" className="hover:text-white transition-colors">Case Studies</a>
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
          </div>
          <a href="/book" className="btn btn-primary btn-sm">Book a Call</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="section-dark section" style={{ paddingBlock: "7rem 5rem" }}>
        <div className="container text-center max-w-4xl mx-auto">
          <span className="badge badge-dark mb-6 inline-flex">
            AI-Native Digital Agency
          </span>
          <h1 className="text-hero text-white mb-6">
            Grow faster with{" "}
            <span className="text-gradient">intelligent marketing</span>
          </h1>
          <p className="text-lead text-[var(--color-brand-300)] max-w-2xl mx-auto mb-10">
            We combine digital marketing, AI automation, and high-performance web development
            to turn ambitious businesses into category leaders.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/audit" className="btn btn-primary btn-lg">Get a Free Audit</a>
            <a href="/book" className="btn btn-ghost-white btn-lg">Book a Call</a>
          </div>

          {/* Trust bar */}
          <div className="mt-16 pt-10 border-t border-[rgba(255,255,255,0.08)]">
            <p className="text-xs text-[var(--color-brand-500)] uppercase tracking-widest mb-6">
              Trusted by ambitious brands
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
              {["Acme Corp", "Velocity", "Nexus AI", "Orbit", "Stratford"].map((name) => (
                <span key={name} className="text-white font-semibold text-sm tracking-wide">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section bg-[var(--color-brand-50)]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "312%", label: "Average lead increase" },
              { value: "£24M+", label: "Client revenue generated" },
              { value: "98%", label: "Client retention rate" },
              { value: "48h", label: "Average onboarding time" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-h2 text-[var(--color-accent-500)] font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--color-brand-500)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-14">
            <span className="badge badge-accent mb-4 inline-flex">What we do</span>
            <h2 className="text-h2 mb-4">One agency. Every growth lever.</h2>
            <p className="text-lead max-w-xl mx-auto">
              Five specialist services. One cohesive strategy. Measurable results.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Digital Marketing", desc: "SEO, GEO, Paid Media, Lifecycle — every channel, fully optimised.", href: "/services/digital-marketing" },
              { num: "02", title: "Website Development", desc: "Next.js, edge performance, and CRO-driven builds that convert.", href: "/services/website-development" },
              { num: "03", title: "AI Automation", desc: "Agents, RAG pipelines, and Voice AI that work while you sleep.", href: "/services/ai-automation" },
              { num: "04", title: "AI Training", desc: "Prompt engineering, adoption programmes, and workflow design.", href: "/services/ai-training" },
              { num: "05", title: "Market Research", desc: "GTM strategy, ICP definition, and positioning that sticks.", href: "/services/market-research" },
            ].map((service) => (
              <a key={service.num} href={service.href} className="card p-8 group block">
                <div className="text-xs font-mono text-[var(--color-accent-400)] mb-4 tracking-widest">
                  {service.num}
                </div>
                <h3 className="text-h3 mb-3 group-hover:text-[var(--color-accent-500)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--color-brand-500)] leading-relaxed mb-4">
                  {service.desc}
                </p>
                <span className="text-sm font-semibold text-[var(--color-accent-500)] flex items-center gap-1">
                  Explore →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section-dark section">
        <div className="container text-center">
          <h2 className="text-h2 text-white mb-4">Ready to grow?</h2>
          <p className="text-lead text-[var(--color-brand-300)] mb-8 max-w-lg mx-auto">
            Get a free audit and see exactly where your biggest opportunities are.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/audit" className="btn btn-primary btn-lg">Get a Free Audit</a>
            <a href="/book" className="btn btn-ghost-white btn-lg">Book a Call</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--color-brand-950)] border-t border-[rgba(255,255,255,0.06)]">
        <div className="container py-14">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <span className="font-display text-white font-bold text-xl tracking-tight block mb-3">
                richa<span className="text-[var(--color-accent-400)]">.</span>
              </span>
              <p className="text-sm text-[var(--color-brand-500)] leading-relaxed">
                AI-native digital agency helping ambitious businesses grow faster.
              </p>
            </div>
            {[
              { title: "Services", links: ["Digital Marketing", "Website Development", "AI Automation", "AI Training", "Market Research"] },
              { title: "Company", links: ["About", "Case Studies", "Blog", "Careers"] },
              { title: "Work with us", links: ["Get a Free Audit", "Book a Call", "Get a Quote", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-xs font-semibold text-[var(--color-brand-500)] uppercase tracking-widest mb-4">
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-[var(--color-brand-300)] hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-brand-500)]">
            <span>© 2025 Richa. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
