import LxShell from "@/components/lx/LxShell";
import LxPageHero from "@/components/lx/LxPageHero";
import LeadForm from "@/components/ui/LeadForm";
import type { BlogPost } from "@/lib/blog";
import { getSection } from "@/lib/cms";
import { BLOG_PAGE_DEFAULTS, BLOG_POSTS_DEFAULTS } from "@/lib/cms-schema";
import type { Metadata } from "next";
import { sectionMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return sectionMetadata({
    key: "blog.page",
    defaults: BLOG_PAGE_DEFAULTS,
    path: "/blog",
    fallbackTitle: "Blog",
    fallbackDescription: "Practical, no-hype articles on growth, AI, GEO, and marketing — written because they're useful.",
  });
}

export default async function BlogPage() {
  const page = await getSection("blog.page", BLOG_PAGE_DEFAULTS);
  const posts = (await getSection("blog.posts", BLOG_POSTS_DEFAULTS)).items as BlogPost[];
  const featured = posts[0];
  const rest = posts.slice(1);
  const cats = Array.from(new Set(posts.map((p) => p.cat))).filter(Boolean);

  return (
    <LxShell>
      <LxPageHero eyebrow={page.heroEyebrow} title={page.heroTitle} subtitle={page.heroSubtitle} orbit={cats} />

      <section className="lx-sec lx-sec--white">
        <div className="lx-wrap">
          {featured && (
            <a href={`/blog/${featured.slug}`} className="lx-feature lx-spot" data-lx-card>
              <div className="lx-feature__img" style={{ background: featured.accent }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {featured.image && <img src={featured.image} alt={featured.imageAlt || featured.title} />}
                <span className="lx-chip-tag">Featured</span>
              </div>
              <div className="lx-feature__body">
                <small>{featured.cat} · {featured.date} · {featured.read} read</small>
                <h2 className="lx-h2 lx-h2--sm">{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <span className="lx-link">Read article →</span>
              </div>
            </a>
          )}

          <div className="lx-grid lx-grid--auto" style={{ marginTop: "1rem" }}>
            {rest.map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="lx-post lx-spot" data-lx-card>
                <div className="lx-post__img" style={{ background: post.accent }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {post.image && <img src={post.image} alt={post.imageAlt || post.title} loading="lazy" />}
                  <span className="lx-chip-tag">{post.cat}</span>
                </div>
                <div className="lx-post__body">
                  <h3 className="lx-h3">{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <small>{post.date} · {post.read} read</small>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="lx-sec">
        <div className="lx-wrap">
          <div className="lx-mini lx-form" data-lx-card>
            <h3 className="lx-h2 lx-h2--sm">{page.newsletterTitle}</h3>
            <p>{page.newsletterSub}</p>
            <div className="lx-mini__f">
              <LeadForm source="blog" type="newsletter" submitLabel="Subscribe" note="No spam. Unsubscribe anytime.">
                <div>
                  <input className="form-input" name="email" type="email" aria-label="Email address" placeholder="you@company.com" required />
                </div>
              </LeadForm>
            </div>
          </div>
        </div>
      </section>
    </LxShell>
  );
}
