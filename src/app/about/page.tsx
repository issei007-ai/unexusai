import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/layout/CTABanner";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import RevealText3D from "@/components/ui/RevealText3D";

export const metadata = {
  title: "About — Richa",
  description: "Built by marketers who got tired of bad agencies. Meet the team behind Richa.",
};

const VALUES = [
  { title: "Honesty before comfort", desc: "We tell you what's actually happening, not what you want to hear. That's the only way to make real progress." },
  { title: "Results over activity", desc: "Reports full of impressions and reach don't pay salaries. We care about pipeline, revenue, and retention." },
  { title: "Specialists, not generalists", desc: "Every service has a dedicated lead. You'll never get a junior who Googled it this morning." },
  { title: "Speed without sloppiness", desc: "We move quickly because markets don't wait. But we never ship something we're not proud of." },
];

const TEAM = [
  { name: "Alex Carter", role: "Founder & Strategy Director", bio: "Former head of growth at a Series B SaaS. Built and exited two startups.", color: "#6366f1", img: 12 },
  { name: "Mia Patel", role: "Head of AI & Automation", bio: "Previously at a leading AI lab. Builds production AI systems for ambitious companies.", color: "#7c3aed", img: 5 },
  { name: "James Okafor", role: "Head of Digital Marketing", bio: "10 years running paid and organic for scale-ups across SaaS and e-commerce.", color: "#06b6d4", img: 13 },
  { name: "Lena Müller", role: "Lead Developer", bio: "Next.js specialist obsessed with performance, accessibility, and CRO.", color: "#10b981", img: 9 },
];

const STATS = [
  { value: "80+", label: "Businesses served" },
  { value: "£24M+", label: "Client revenue driven" },
  { value: "5", label: "Years in business" },
  { value: "98%", label: "Client retention" },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="About Richa"
          title="Built by marketers who got tired of bad agencies"
          subtitle="Richa exists because we kept seeing the same problem: brilliant businesses working with agencies that were too narrow, too slow, or too in love with vanity metrics. We started Richa to do it differently."
        />

        {/* Stats */}
        <section className="section-alt" style={{ paddingBlock: "3rem" }}>
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map((s, i) => (
                <ScrollReveal key={s.label} delay={i * 0.08}>
                  <div className="text-center">
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem,4vw,2.8rem)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1, marginBottom: "0.4rem" }}>
                      {s.value}
                    </div>
                    <div className="text-sm" style={{ color: "var(--color-brand-400)" }}>{s.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="section">
          <div className="container max-w-3xl">
            <span className="badge badge-accent mb-5 inline-flex">Our story</span>
            <h2 className="text-h2 mb-6">
              <RevealText3D text="From a spare room to £24M in client revenue" splitBy="word" />
            </h2>
            <p className="text-lead">
              We started in a spare room with three clients and a shared belief that marketing, technology,
              and AI belong under one roof. Five years later, we&apos;ve worked with over 80 businesses across
              SaaS, e-commerce, B2B, and professional services — generating more than £24M in attributed
              revenue. We&apos;re still in the business of doing good work for people who take their growth seriously.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="section section-alt">
          <div className="container">
            <div className="text-center mb-14">
              <span className="badge badge-accent mb-5 inline-flex">How we work</span>
              <h2 className="text-h2"><RevealText3D text="What we actually believe" splitBy="word" /></h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {VALUES.map((v, i) => (
                <ScrollReveal key={v.title} delay={i * 0.08}>
                  <div className="glow-card h-full p-7" style={{ border: "1px solid var(--color-border)" }}>
                    <h3 className="text-h3 mb-3" style={{ fontFamily: "var(--font-display)" }}>{v.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-300)" }}>{v.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-14">
              <span className="badge badge-accent mb-5 inline-flex">The team</span>
              <h2 className="text-h2"><RevealText3D text="The people doing the work" splitBy="word" /></h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TEAM.map((member, i) => (
                <ScrollReveal key={member.name} delay={i * 0.08}>
                  <div className="glow-card h-full p-6 text-center" style={{ border: "1px solid var(--color-border)" }}>
                    <div
                      className="team-photo-wrap mx-auto mb-4"
                      style={{ width: 84, height: 84, borderRadius: "50%", overflow: "hidden", border: `2px solid ${member.color}` }}
                    >
                      <img className="team-photo" src={`https://i.pravatar.cc/200?img=${member.img}`} alt={member.name} loading="lazy" />
                    </div>
                    <div className="font-semibold mb-1 text-white">{member.name}</div>
                    <div className="text-xs mb-3" style={{ color: member.color }}>{member.role}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-400)" }}>{member.bio}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="section section-alt">
          <div className="container text-center">
            <span className="badge badge-accent mb-7 inline-flex">Credentials</span>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {["Google Partner", "Meta Business Partner", "HubSpot Certified", "Vercel Partner"].map((b) => (
                <div key={b} className="px-6 py-3 rounded-xl" style={{ background: "var(--color-panel)", border: "1px solid var(--color-border)" }}>
                  <span className="text-sm font-semibold text-white">{b}</span>
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
