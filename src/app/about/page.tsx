import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/layout/CTABanner";

const VALUES = [
  { title: "Honesty before comfort", desc: "We tell you what's actually happening, not what you want to hear. That's the only way to make real progress." },
  { title: "Results over activity", desc: "Reports full of impressions and reach don't pay salaries. We care about pipeline, revenue, and retention." },
  { title: "Specialists, not generalists", desc: "Every service has a dedicated lead. You'll never get a junior who Googled it this morning." },
  { title: "Speed without sloppiness", desc: "We move quickly because markets don't wait. But we never ship something we're not proud of." },
];

const TEAM = [
  { name: "Alex Carter", role: "Founder & Strategy Director", bio: "Former head of growth at a Series B SaaS. Built and exited two startups." },
  { name: "Mia Patel", role: "Head of AI & Automation", bio: "Previously at a leading AI lab. Builds production AI systems for ambitious companies." },
  { name: "James Okafor", role: "Head of Digital Marketing", bio: "10 years running paid and organic for scale-ups across SaaS and e-commerce." },
  { name: "Lena Müller", role: "Lead Developer", bio: "Next.js specialist obsessed with performance, accessibility, and CRO." },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="section-dark" style={{ paddingBlock: "6rem 4rem" }}>
          <div className="container max-w-3xl">
            <h1 className="text-h1 text-white mb-6">Built by marketers who got tired of bad agencies</h1>
            <p className="text-lead" style={{ color: "var(--color-brand-300)" }}>
              Richa exists because we kept seeing the same problem: brilliant businesses working with
              agencies that were either too narrow, too slow, or too in love with vanity metrics.
              We started Richa to do it differently.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="section">
          <div className="container max-w-3xl">
            <span className="badge badge-accent mb-4 inline-flex">Our story</span>
            <h2 className="text-h2 mb-6">From a spare room to £24M in client revenue</h2>
            <p className="text-body-lg leading-relaxed" style={{ color: "var(--color-brand-700)" }}>
              We started in a spare room with three clients and a shared belief that marketing, technology,
              and AI belong under one roof. Five years later, we&apos;ve worked with over 80 businesses
              across SaaS, e-commerce, B2B, and professional services — generating more than £24M in
              attributed revenue. We&apos;re still in the business of doing good work for people who
              take their growth seriously.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="section" style={{ background: "var(--color-brand-50)" }}>
          <div className="container">
            <div className="text-center mb-14">
              <span className="badge badge-accent mb-4 inline-flex">How we work</span>
              <h2 className="text-h2">What we actually believe</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {VALUES.map((v) => (
                <div key={v.title} className="card p-8">
                  <h3 className="text-h3 mb-3" style={{ fontFamily: "var(--font-display)" }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-500)" }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-14">
              <span className="badge badge-accent mb-4 inline-flex">The team</span>
              <h2 className="text-h2">The people doing the work</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map((member) => (
                <div key={member.name} className="card p-6 text-center">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-white"
                    style={{ background: "var(--color-accent-500)" }}
                  >
                    {member.name.charAt(0)}
                  </div>
                  <div className="font-semibold mb-1">{member.name}</div>
                  <div className="text-xs mb-3" style={{ color: "var(--color-accent-500)" }}>{member.role}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-500)" }}>{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="section" style={{ background: "var(--color-brand-50)" }}>
          <div className="container text-center">
            <span className="badge badge-accent mb-6 inline-flex">Credentials</span>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {["Google Partner", "Meta Business Partner", "HubSpot Certified", "Vercel Partner"].map((badge) => (
                <div key={badge} className="card px-6 py-3">
                  <span className="text-sm font-semibold">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          heading="Let's talk about your growth"
          body="No templates. No account managers who've never run a campaign. Just direct access to specialists who care about your results."
          primaryLabel="Book a Call"
          primaryHref="/book"
          secondaryLabel="View Case Studies"
          secondaryHref="/case-studies"
        />
      </main>
      <Footer />
    </>
  );
}
