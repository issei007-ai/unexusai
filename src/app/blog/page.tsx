import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import LeadForm from "@/components/ui/LeadForm";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata = {
  title: "Blog — Unexus AI",
  description: "Practical, no-hype articles on growth, AI, GEO, and marketing — written because they're useful.",
};

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Blog"
          title="Ideas, playbooks & field notes"
          subtitle="Practical notes on growth, AI, GEO, and marketing — written because they're useful, not to chase keywords."
        />

        <section className="section section-alt">
          <div className="container">
            {/* Featured */}
            {featured && (
              <ScrollReveal>
                <a
                  href={`/blog/${featured.slug}`}
                  className="rounded-2xl overflow-hidden mb-6 grid md:grid-cols-2 group"
                  style={{ background: "var(--color-panel)", border: "1px solid var(--color-border)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
                >
                  <div className="relative flex items-end p-8" style={{ minHeight: 240, background: `linear-gradient(135deg, ${featured.accent}, var(--color-glow))` }}>
                    <span className="badge badge-dark">Featured</span>
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <span className="text-xs mb-3" style={{ color: "var(--color-brand-400)" }}>{featured.cat} · {featured.date} · {featured.read} read</span>
                    <h2 className="text-h3 mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem" }}>{featured.title}</h2>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-brand-300)" }}>{featured.excerpt}</p>
                    <span className="text-sm font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all" style={{ color: "var(--color-accent-300)" }}>Read article →</span>
                  </div>
                </a>
              </ScrollReveal>
            )}

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post, i) => (
                <ScrollReveal key={post.slug} delay={(i % 3) * 0.08}>
                  <a
                    href={`/blog/${post.slug}`}
                    className="rounded-2xl overflow-hidden h-full flex flex-col group"
                    style={{ background: "var(--color-panel)", border: "1px solid var(--color-border)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
                  >
                    <div className="relative flex items-end p-5" style={{ aspectRatio: "16 / 9", background: `linear-gradient(135deg, ${post.accent}, var(--color-glow))` }}>
                      <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: "rgba(3,7,18,0.4)", color: "#fff" }}>{post.cat}</span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="mb-3 text-white" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem" }}>{post.title}</h3>
                      <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-brand-300)" }}>{post.excerpt}</p>
                      <div className="mt-auto text-xs" style={{ color: "var(--color-brand-500)" }}>{post.date} · {post.read} read</div>
                    </div>
                  </a>
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
