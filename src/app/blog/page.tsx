import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import LeadForm from "@/components/ui/LeadForm";

export const metadata = {
  title: "Blog — Unexus AI",
  description: "Playbooks, field notes, and practical ideas on growth, AI, and marketing.",
};

type Post = { cat: string; title: string; excerpt: string; date: string; read: string; accent: string; seed: string };

const POSTS: Post[] = [];

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
            {featured && (
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
            )}

            {/* Coming soon */}
            {POSTS.length === 0 && (
              <div className="glow-card p-10 text-center mx-auto" style={{ border: "1px solid var(--color-border)", maxWidth: "40rem" }}>
                <h2 className="text-h3 mb-2" style={{ fontFamily: "var(--font-display)" }}>Articles coming soon</h2>
                <p className="text-sm" style={{ color: "var(--color-brand-300)" }}>We&apos;re putting together practical pieces on growth, AI, and GEO. Subscribe below to get them as they land.</p>
              </div>
            )}

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
