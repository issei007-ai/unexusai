import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ContactCTA from "@/components/sections/ContactCTA";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import RevealText3D from "@/components/ui/RevealText3D";

export const metadata = {
  title: "About — Unexus AI",
  description: "Ten years of digital marketing, relaunched for the AI era. The story of Unexus AI, an SE Digicon company, founded by Richa Gupta.",
};

const STATS = [
  { value: "10+", label: "Years of digital marketing experience" },
  { value: "80+", label: "Businesses grown across India, UAE & beyond" },
  { value: "5", label: "Countries actively serving clients" },
  { value: "6", label: "Services under one roof" },
];

const TIMELINE = [
  { year: "2015", title: "SE Digicon founded in India", desc: "Started with a handful of clients and a clear focus on digital marketing that could be measured in revenue, not impressions. Based in India, serving clients across sectors." },
  { year: "2015–2024", title: "80+ businesses. Four countries. Six services.", desc: "Grew SE Digicon across retail, hospitality, healthcare, real estate, and enterprise — working with clients in India, UAE, UK, and US. Added website development, AI automation, and market research alongside core digital marketing." },
  { year: "2024", title: "GEO changes everything", desc: "As AI search engines started answering questions that used to belong to Google, a new discipline emerged — Generative Engine Optimisation. We started building GEO capability before most agencies had heard of it." },
  { year: "2025", title: "Unexus AI launched in the UAE", desc: "Registered in the UAE and relaunched with a sharper focus — AI training, GEO, and integrated digital marketing for businesses across the Middle East, India, and beyond. SE Digicon continues to operate alongside it." },
];

const VALUES = [
  { title: "Revenue over reports", desc: "Impressions and clicks don't pay anyone's bills. Every service we run is measured on what it produces — leads, bookings, revenue. If it's not moving the needle, we say so." },
  { title: "Honest before comfortable", desc: "If something isn't working, you'll hear it from us before you have to ask. We'd rather have an awkward conversation early than a bigger one later." },
  { title: "Systems, not silos", desc: "Your SEO, website, and AI tools should feed each other — not operate in isolation. We build everything to connect, because that's where results compound." },
  { title: "See what's coming", desc: "GEO didn't exist as a discipline two years ago. We built for it early. We're always watching what's changing in search, AI, and digital — so our clients aren't caught off guard." },
];

const PARTNERS = ["Zoho Partner", "WebEngage Partner", "MoEngage Partner", "Vercel Partner"];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="About Unexus AI"
          title="Ten years of digital marketing. Relaunched for the AI era."
          subtitle="Unexus AI didn't start from scratch. It was built on a decade of running real campaigns for real businesses — and relaunched when it became clear that AI and GEO were changing the rules fast enough that a new kind of agency was needed."
        />

        {/* SE Digicon note */}
        <section style={{ paddingTop: "0.5rem" }}>
          <div className="container text-center">
            <span className="badge badge-dark inline-flex">Unexus AI is an SE Digicon company</span>
          </div>
        </section>

        {/* Stats */}
        <section className="section-alt" style={{ paddingBlock: "3rem", marginTop: "2.5rem" }}>
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map((s, i) => (
                <ScrollReveal key={s.label} delay={i * 0.08}>
                  <div className="text-center">
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem,4vw,2.8rem)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1, marginBottom: "0.5rem" }}>
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
              <RevealText3D text="From SE Digicon to Unexus AI — here's what changed and why." splitBy="word" />
            </h2>
            <div className="space-y-5 text-lead" style={{ color: "var(--color-brand-300)" }}>
              <p>In 2015, Richa Gupta founded SE Digicon in India — a digital marketing agency built around one belief: that businesses deserve marketing that produces real results, not vanity metrics. Over the next decade, SE Digicon worked with 80+ businesses across retail, hospitality, education, and enterprise — in India, the UAE, the UK, and the US.</p>
              <p>Then two things happened at once. AI started changing how people search — and how businesses operate. And GEO emerged as an entirely new discipline that almost no agency had figured out yet. Running the same playbook with a different name felt like the wrong answer. So Unexus AI was born — registered in the UAE, built to serve businesses globally, and focused specifically on the intersection of digital marketing, AI, and GEO that SE Digicon had spent years moving toward.</p>
              <p className="text-white" style={{ fontWeight: 500 }}>The clients are real. The experience is real. The difference is the focus.</p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section section-alt">
          <div className="container max-w-3xl">
            <div className="mb-12">
              <span className="badge badge-dark mb-5 inline-flex">How we got here</span>
              <h2 className="text-h2"><RevealText3D text="A decade in, one clear direction." splitBy="word" /></h2>
            </div>
            <div>
              {TIMELINE.map((t, i) => (
                <ScrollReveal key={t.year} delay={i * 0.08} direction="left">
                  <div className="flex gap-5 sm:gap-6" style={{ paddingBottom: i === TIMELINE.length - 1 ? 0 : "2.25rem" }}>
                    <div className="flex flex-col items-center flex-shrink-0">
                      <span style={{ width: 14, height: 14, borderRadius: "50%", background: "linear-gradient(135deg,var(--color-accent-500),var(--color-glow))", marginTop: 5 }} />
                      {i < TIMELINE.length - 1 && <span style={{ width: 2, flex: 1, background: "var(--color-border-bright)", marginTop: 6 }} />}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-accent-300)", marginBottom: "0.35rem" }}>{t.year}</div>
                      <h3 className="font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem" }}>{t.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-300)" }}>{t.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-14">
              <span className="badge badge-accent mb-5 inline-flex">What we believe</span>
              <h2 className="text-h2"><RevealText3D text="The principles that haven't changed in ten years." splitBy="word" /></h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {VALUES.map((v, i) => (
                <ScrollReveal key={v.title} delay={i * 0.08}>
                  <div className="glow-card h-full p-7" style={{ border: "1px solid var(--color-border)" }}>
                    <h3 className="text-h3 mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>{v.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-300)" }}>{v.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="section section-alt">
          <div className="container max-w-3xl">
            <div className="text-center mb-10">
              <span className="badge badge-accent mb-5 inline-flex">The founder</span>
              <h2 className="text-h2"><RevealText3D text="The person behind it." splitBy="word" /></h2>
            </div>
            <ScrollReveal>
              <div className="glow-card p-8 flex flex-col sm:flex-row gap-6 items-start" style={{ border: "1px solid var(--color-border)" }}>
                <div
                  className="flex-shrink-0 flex items-center justify-center mx-auto sm:mx-0"
                  style={{ width: 84, height: 84, borderRadius: "50%", background: "linear-gradient(135deg,var(--color-accent-500),var(--color-glow))", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.6rem" }}
                >
                  RG
                </div>
                <div>
                  <div className="font-semibold text-white" style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>Richa Gupta</div>
                  <div className="text-sm mb-4" style={{ color: "var(--color-accent-300)" }}>Founder — Unexus AI &amp; SE Digicon · Based in Dubai, UAE 🇦🇪</div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-300)" }}>
                    Richa founded SE Digicon in India in 2015 and spent a decade building it into a full-service digital marketing agency serving clients across India, the UAE, the UK, and the US. When AI started reshaping search and GEO emerged as the discipline nobody had figured out yet, she launched Unexus AI in the UAE — to bring together everything SE Digicon had learned, focused specifically on what businesses need to grow in the AI era.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Team */}
        <section className="section">
          <div className="container max-w-3xl">
            <div className="text-center mb-8">
              <span className="badge badge-accent mb-5 inline-flex">The team</span>
              <h2 className="text-h2"><RevealText3D text="The people doing the work." splitBy="word" /></h2>
            </div>
            <div className="glow-card p-7 text-center" style={{ border: "1px dashed var(--color-border-bright)" }}>
              <p className="text-sm" style={{ color: "var(--color-brand-400)" }}>
                Team section — names, roles, and a line about each will go here once details are shared.
              </p>
            </div>
          </div>
        </section>

        {/* Credentials & partners */}
        <section className="section section-alt">
          <div className="container text-center">
            <span className="badge badge-accent mb-3 inline-flex">Credentials &amp; partners</span>
            <h2 className="text-h2 mb-8"><RevealText3D text="Who we work with and what we're certified in." splitBy="word" /></h2>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              {PARTNERS.map((b) => (
                <div key={b} className="px-6 py-3 rounded-xl" style={{ background: "var(--color-panel)", border: "1px solid var(--color-border)" }}>
                  <span className="text-sm font-semibold text-white">{b}</span>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--color-brand-400)" }}>
              Operating globally from Dubai. Unexus AI is registered in the UAE and serves clients across the Middle East, India, the UK, and the US. SE Digicon, our parent company, has been operating in India since 2015.
            </p>
          </div>
        </section>

        <ContactCTA
          heading="No account manager between you and the people doing the work."
          body="Direct access to the team. A real reply within 24 hours. No lock-in contracts — ever."
          imageSeed="unexus-workspace"
        />
      </main>
      <Footer />
    </>
  );
}
