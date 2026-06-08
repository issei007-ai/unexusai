export default function HomePage() {
  return (
    <main>
      {/* NAV */}
      <nav
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        className="sticky top-0 z-50 bg-[var(--color-brand-950)] backdrop-blur-md"
      >
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="font-display text-white font-bold text-xl tracking-tight">
            richa<span className="text-[var(--color-accent-400)]">.</span>
          </a>
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
      <section className="section-dark" style={{ paddingBlock: "7rem 5rem" }}>
        <div className="container text-center max-w-4xl mx-auto">
          <span className="badge badge-dark mb-6 inline-flex">AI-Native Digital Agency</span>
          <h1 className="text-hero text-white mb-6">
            Grow faster with{" "}
            <span className="text-gradient">intelligent marketing</span>
          </h1>
          <p className="text-lead max-w-2xl mx-auto mb-10" style={{ color: "var(--color-brand-300)" }}>
            Most agencies pick a lane — SEO or ads or AI or web. We do all of it, and we make them
            work together. The result? Growth that compounds.
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
              {["Acme Corp", "Velocity", "Nexus AI", "Orbit", "Stratford"].map((name) => (
                <span key={name} className="text-white font-semibold text-sm tracking-wide">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section" style={{ background: "var(--color-brand-50)" }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "312%", label: "Average increase in qualified leads" },
              { value: "£24M+", label: "Client revenue attributed to our work" },
              { value: "98%", label: "Client retention rate year-on-year" },
              { value: "48h", label: "Average time from brief to strategy" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-h2 font-bold mb-1" style={{ color: "var(--color-accent-500)", fontFamily: "var(--font-display)" }}>
                  {stat.value}
                </div>
                <div className="text-sm leading-snug" style={{ color: "var(--color-brand-500)" }}>{stat.label}</div>
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
            <p className="text-lead max-w-2xl mx-auto">
              We built Richa because great businesses kept getting let down by specialists who
              couldn&apos;t see the bigger picture. Here&apos;s the full picture.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Digital Marketing",
                desc: "From ranking on Google to converting your email list, we run every channel with one goal: more of the right customers, at a lower cost.",
                href: "/services/digital-marketing",
              },
              {
                num: "02",
                title: "Website Development",
                desc: "Your website is your best salesperson. We build fast, conversion-optimised sites in Next.js that actually close.",
                href: "/services/website-development",
              },
              {
                num: "03",
                title: "AI Automation",
                desc: "We build AI agents, RAG pipelines, and voice systems that take repetitive work off your team's plate — permanently.",
                href: "/services/ai-automation",
              },
              {
                num: "04",
                title: "AI Training",
                desc: "Your team has AI tools they're not using properly. We fix that with practical training, prompt engineering, and workflow design.",
                href: "/services/ai-training",
              },
              {
                num: "05",
                title: "Market Research",
                desc: "Before you spend a pound on marketing, you need to know exactly who you're talking to. We find them and figure out what to say.",
                href: "/services/market-research",
              },
            ].map((service) => (
              <a key={service.num} href={service.href} className="card p-8 group block">
                <div className="text-xs tracking-widest mb-4" style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent-400)" }}>
                  {service.num}
                </div>
                <h3 className="text-h3 mb-3 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
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

      {/* HOW WE WORK */}
      <section className="section" style={{ background: "var(--color-brand-50)" }}>
        <div className="container">
          <div className="text-center mb-14">
            <span className="badge badge-accent mb-4 inline-flex">Our process</span>
            <h2 className="text-h2 mb-4">Strategy first. Always.</h2>
            <p className="text-lead max-w-xl mx-auto">
              We don&apos;t start building until we understand your business properly.
              Every engagement begins with a deep discovery — then we move fast.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discover", desc: "We audit your current position: traffic, conversion, tech stack, competitors, customer data." },
              { step: "02", title: "Strategise", desc: "We build a growth plan specific to your business, not a template." },
              { step: "03", title: "Build & Launch", desc: "Campaigns, automations, and builds go live with full tracking in place." },
              { step: "04", title: "Optimise & Grow", desc: "We report weekly, iterate monthly, and compound results over time." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold"
                  style={{ background: "var(--color-accent-100)", color: "var(--color-accent-600)" }}>
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "var(--font-display)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-500)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-14">
            <span className="badge badge-accent mb-4 inline-flex">What clients say</span>
            <h2 className="text-h2">Don&apos;t take our word for it</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Richa increased our inbound leads by 280% in four months. The SEO and paid media teams worked together like one unit — we'd never seen that before.",
                name: "Sarah M.",
                role: "Marketing Director",
                company: "Velocity SaaS",
              },
              {
                quote: "They built our new site and set up an AI agent that qualifies leads before they hit our CRM. I genuinely don't know how we managed without it.",
                name: "Tom R.",
                role: "CEO",
                company: "Nexus AI",
              },
              {
                quote: "The market research they did changed how we talk about our product entirely. Three months later, our conversion rate doubled.",
                name: "Priya K.",
                role: "Founder",
                company: "Orbit",
              },
            ].map((t) => (
              <div key={t.name} className="card p-8">
                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "var(--color-brand-700)" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs" style={{ color: "var(--color-brand-500)" }}>{t.role}, {t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2 className="text-h2 text-white mb-4">
            Ready to find out where you&apos;re leaving growth on the table?
          </h2>
          <p className="text-lead mb-8 max-w-xl mx-auto" style={{ color: "var(--color-brand-300)" }}>
            Book a free 30-minute strategy call. No pitch, no pressure — just an honest look at
            where you are and where you could be.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/audit" className="btn btn-primary btn-lg">Get a Free Audit</a>
            <a href="/book" className="btn btn-ghost-white btn-lg">Book a Call</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--color-brand-950)]" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container py-14">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <a href="/" className="font-display text-white font-bold text-xl tracking-tight block mb-3">
                richa<span style={{ color: "var(--color-accent-400)" }}>.</span>
              </a>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-500)" }}>
                AI-native digital agency helping ambitious businesses grow faster.
              </p>
            </div>
            {[
              {
                title: "Services",
                links: [
                  { label: "Digital Marketing", href: "/services/digital-marketing" },
                  { label: "Website Development", href: "/services/website-development" },
                  { label: "AI Automation", href: "/services/ai-automation" },
                  { label: "AI Training", href: "/services/ai-training" },
                  { label: "Market Research", href: "/services/market-research" },
                ],
              },
              {
                title: "Company",
                links: [
                  { label: "About", href: "/about" },
                  { label: "Case Studies", href: "/case-studies" },
                  { label: "Blog", href: "/blog" },
                  { label: "Contact", href: "/contact" },
                ],
              },
              {
                title: "Work with us",
                links: [
                  { label: "Get a Free Audit", href: "/audit" },
                  { label: "Book a Call", href: "/book" },
                  { label: "Get a Quote", href: "/quote" },
                  { label: "Resources", href: "/resources" },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-brand-500)" }}>
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm transition-colors hover:text-white" style={{ color: "var(--color-brand-300)" }}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "var(--color-brand-500)" }}>
            <span>© 2025 Richa. All rights reserved.</span>
            <div className="flex gap-6">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "Cookie Policy", href: "/cookie-policy" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="hover:text-white transition-colors">{link.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
