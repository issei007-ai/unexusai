import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ContactCTA from "@/components/sections/ContactCTA";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import RevealText3D from "@/components/ui/RevealText3D";

export const metadata = {
  title: "About — Unexus AI",
  description: "A bit about who we are, why we started Unexus AI, and the people doing the work.",
};

const VALUES = [
  { title: "We'll tell you the truth, even when it's awkward", desc: "If something isn't working, you'll hear it from us before you have to ask. It's the only way any of this actually gets better." },
  { title: "Activity isn't the same as results", desc: "A report full of impressions doesn't pay anyone's bills. We care about pipeline, revenue, and whether people come back." },
  { title: "Every service has someone who actually owns it", desc: "You won't get passed to whoever's free that week. Each area has a lead who's been doing this for years, not someone learning on your budget." },
  { title: "Fast, but not rushed", desc: "We move quickly because markets don't sit still. But we'd rather push a deadline by a few days than ship something we're not happy with." },
];

const TEAM = [
  { name: "Alex Carter", role: "Founder & Strategy Director", bio: "Ran growth at a Series B SaaS company before this, and started (then sold) two of his own businesses along the way.", color: "#6366f1", img: 12 },
  { name: "Mia Patel", role: "Head of AI & Automation", bio: "Spent a few years building AI systems at a research lab, then decided to build them for companies that actually need them.", color: "#7c3aed", img: 5 },
  { name: "James Okafor", role: "Head of Digital Marketing", bio: "About a decade of running paid and organic campaigns for fast-growing companies, mostly in SaaS and e-commerce.", color: "#06b6d4", img: 13 },
  { name: "Lena Müller", role: "Lead Developer", bio: "Builds in Next.js and cares more than is probably healthy about page speed and accessibility.", color: "#10b981", img: 9 },
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
          eyebrow="About Unexus AI"
          title="We started this because most agencies frustrated us"
          subtitle="We kept seeing the same thing: good businesses stuck with agencies that were too narrow, too slow, or way too proud of metrics that didn't actually mean anything. So a few of us left and built the thing we wished we could hire."
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
              <RevealText3D text="From a spare room to here" splitBy="word" />
            </h2>
            <p className="text-lead">
              Five years ago this was three clients and a spare room, built on the idea that marketing, web,
              and (a bit later) AI shouldn&apos;t be three separate jobs handled by three people who never speak.
              Since then we&apos;ve worked with more than 80 businesses across SaaS, e-commerce, B2B, and
              professional services, and helped them generate upwards of £24M along the way. The room&apos;s
              bigger now. The idea hasn&apos;t really changed.
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

        <ContactCTA
          heading="Want to work with us?"
          body="No account manager standing between you and the people actually doing the work — just direct access to the team."
          imageSeed="unexus-workspace"
        />
      </main>
      <Footer />
    </>
  );
}
