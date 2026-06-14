import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import LeadForm from "@/components/ui/LeadForm";

export const metadata = {
  title: "Blog — DigiExperts",
  description: "Playbooks, field notes, and practical ideas on growth, AI, and marketing.",
};

const POSTS = [
  { cat: "AI", title: "GEO, explained without the hype", excerpt: "Search is slowly splitting into two: the engine that shows links, and the one that just answers the question for you. Here's what we're doing differently because of it.", date: "May 2026", read: "6 min", accent: "#7c3aed", seed: "richa-geo" },
  { cat: "Paid Media", title: "Why your ROAS is lying to you (and what to track instead)", excerpt: "ROAS looks great on a slide and tells you almost nothing on its own. Here's what we actually look at with clients, and why.", date: "Apr 2026", read: "5 min", accent: "#6366f1", seed: "richa-roas" },
  { cat: "Web", title: "The 0.9-second website: a performance checklist", excerpt: "The checklist we run through before launching any Next.js site. Copy it, steal it, ignore the bits that don't apply to you.", date: "Apr 2026", read: "8 min", accent: "#06b6d4", seed: "richa-web" },
  { cat: "Automation", title: "We replaced a 12-hour weekly task with one AI agent", excerpt: "A teardown of a real lead-qualification agent: the architecture, the guardrails, and everything that broke before it actually worked.", date: "Mar 2026", read: "7 min", accent: "#10b981", seed: "richa-agent" },
  { cat: "Research", title: "How to interview customers without leading them", excerpt: "The questions that surface something real, and the well-meaning ones that quietly poison the whole interview.", date: "Mar 2026", read: "6 min", accent: "#f59e0b", seed: "richa-research" },
  { cat: "Strategy", title: "Why we stopped recommending 'best in class' for everything", excerpt: "Five specialists working as one team tends to beat five separate vendors who've never spoken. Here's the reasoning, with some actual numbers.", date: "Feb 2026", read: "5 min", accent: "#ec4899", seed: "richa-strategy" },
];

export default function BlogPage() {
  const featured = POSTS[0];
  const rest = POSTS.slice(1);

  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Blog"
          title="Ideas, playbooks & field notes"
          subtitle="Notes on what's working, and what isn't, while we build this stuff for clients. Written because it's useful, not to rank for keywords."
        />

        <section className="section section-alt">
          <div className="container">
            {/* Featured */}
            <ScrollReveal>
              <article
                className="rounded-2xl overflow-hidden mb-6 grid md:grid-cols-2"
                style={{ background: "var(--color-panel)", border: "1px solid var(--color-border)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
              >
                <div className="media-frame" style={{ borderRadius: 0, border: "none", minHeight: 260 }}>
                  <img src={`https://picsum.photos/seed/${featured.seed}/900/600`} alt={featured.title} loading="lazy" />
                  <span className="cover-chip badge badge-accent">Featured</span>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <span className="text-xs mb-3" style={{ color: "var(--color-brand-400)" }}>{featured.cat} · {featured.date} · {featured.read} read</span>
                  <h2 className="text-h3 mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem" }}>{featured.title}</h2>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-brand-300)" }}>{featured.excerpt}</p>
                  <span className="text-sm font-semibold inline-flex items-center gap-2" style={{ color: "var(--color-accent-300)" }}>Read article →</span>
                </div>
              </article>
            </ScrollReveal>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post, i) => (
                <ScrollReveal key={post.title} delay={(i % 3) * 0.08}>
                  <article
                    className="rounded-2xl overflow-hidden h-full flex flex-col group"
                    style={{ background: "var(--color-panel)", border: "1px solid var(--color-border)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
                  >
                    <div className="media-frame" style={{ aspectRatio: "16 / 10", borderRadius: 0, border: "none" }}>
                      <img src={`https://picsum.photos/seed/${post.seed}/800/500`} alt={post.title} loading="lazy" />
                      <span className="cover-chip text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: "rgba(3,7,18,0.6)", color: post.accent, border: `1px solid ${post.accent}55` }}>{post.cat}</span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="mb-3 text-white" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem" }}>{post.title}</h3>
                      <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-brand-300)" }}>{post.excerpt}</p>
                      <div className="mt-auto text-xs" style={{ color: "var(--color-brand-500)" }}>{post.date} · {post.read} read</div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="section">
          <div className="container">
            <div className="glow-card p-8 md:p-10 text-center mx-auto" style={{ border: "1px solid var(--color-border)", maxWidth: "40rem" }}>
              <h3 className="text-h3 mb-2" style={{ fontFamily: "var(--font-display)" }}>Get the weekly playbook</h3>
              <p className="text-sm mb-6" style={{ color: "var(--color-brand-300)" }}>One useful thing a week on growth, AI, and marketing. We try to keep it short.</p>
              <div className="mx-auto" style={{ maxWidth: "22rem" }}>
                <LeadForm source="blog" type="newsletter" submitLabel="Subscribe" note="No spam. Unsubscribe anytime.">
                  <div>
                    <input className="form-input" name="email" type="email" placeholder="you@company.com" required />
                  </div>
                </LeadForm>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
