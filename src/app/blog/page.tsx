import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import LeadForm from "@/components/ui/LeadForm";

export const metadata = {
  title: "Blog — Richa",
  description: "Playbooks, field notes, and practical ideas on growth, AI, and marketing.",
};

const POSTS = [
  { cat: "AI", title: "GEO is the new SEO: how to get cited by AI answers", excerpt: "Search is splitting in two. Here's how to stay visible when the answer engine, not the search engine, decides what people see.", date: "May 2026", read: "6 min", accent: "#7c3aed" },
  { cat: "Paid Media", title: "Why your ROAS is lying to you (and what to track instead)", excerpt: "Return on ad spend is a seductive, incomplete metric. We break down the numbers that actually predict profitable growth.", date: "Apr 2026", read: "5 min", accent: "#6366f1" },
  { cat: "Web", title: "The 0.9-second website: a performance checklist", excerpt: "A practical, copy-pasteable checklist we use to ship Next.js sites that load in under a second on mobile.", date: "Apr 2026", read: "8 min", accent: "#06b6d4" },
  { cat: "Automation", title: "We replaced a 12-hour weekly task with one AI agent", excerpt: "A teardown of a real lead-qualification agent: the architecture, the guardrails, and what broke before it worked.", date: "Mar 2026", read: "7 min", accent: "#10b981" },
  { cat: "Research", title: "How to interview customers without leading them", excerpt: "The questions that surface real insight — and the well-meaning ones that quietly poison your research.", date: "Mar 2026", read: "6 min", accent: "#f59e0b" },
  { cat: "Strategy", title: "The compounding agency: why integrated beats best-in-class", excerpt: "Five specialist services working as one system outperform five disconnected vendors. Here's the math.", date: "Feb 2026", read: "5 min", accent: "#ec4899" },
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
          subtitle="What we're learning building growth systems for ambitious companies — written to be useful, not to game search engines."
        />

        <section className="section section-alt">
          <div className="container">
            {/* Featured */}
            <ScrollReveal>
              <article className="glow-card p-8 md:p-10 mb-6" style={{ border: "1px solid var(--color-border)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="badge badge-accent">Featured</span>
                  <span className="text-xs" style={{ color: "var(--color-brand-400)" }}>{featured.cat} · {featured.date} · {featured.read} read</span>
                </div>
                <h2 className="text-h2 mb-4" style={{ maxWidth: "40rem" }}>{featured.title}</h2>
                <p className="text-lead" style={{ maxWidth: "44rem" }}>{featured.excerpt}</p>
              </article>
            </ScrollReveal>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post, i) => (
                <ScrollReveal key={post.title} delay={(i % 3) * 0.08}>
                  <article className="glow-card h-full p-7 flex flex-col" style={{ border: "1px solid var(--color-border)" }}>
                    <span className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: post.accent }}>{post.cat}</span>
                    <h3 className="text-h3 mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>{post.title}</h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-brand-300)" }}>{post.excerpt}</p>
                    <div className="mt-auto text-xs" style={{ color: "var(--color-brand-500)" }}>{post.date} · {post.read} read</div>
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
              <p className="text-sm mb-6" style={{ color: "var(--color-brand-300)" }}>One practical idea a week on growth, AI, and marketing. No fluff.</p>
              <div className="mx-auto" style={{ maxWidth: "22rem" }}>
                <LeadForm submitLabel="Subscribe" note="No spam. Unsubscribe anytime.">
                  <div>
                    <input className="form-input" type="email" placeholder="you@company.com" required />
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
