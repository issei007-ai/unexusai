import Link from "next/link";
import LxShell from "@/components/lx/LxShell";
import LxCover from "@/components/lx/LxCover";
import LxPageHero from "@/components/lx/LxPageHero";
import LxContact from "@/components/lx/LxContact";
import type { NewsPost } from "@/lib/news";
import { getSection } from "@/lib/cms";
import { NEWS_PAGE_DEFAULTS, NEWS_POSTS_DEFAULTS } from "@/lib/cms-schema";
import type { Metadata } from "next";
import { sectionMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return sectionMetadata({
    key: "news.page",
    defaults: NEWS_PAGE_DEFAULTS,
    path: "/news",
    fallbackTitle: "News",
    fallbackDescription: "Announcements, launches, client wins and events from the Unexus AI team.",
  });
}

export default async function NewsPage() {
  const page = await getSection("news.page", NEWS_PAGE_DEFAULTS);
  const posts = ((await getSection("news.posts", NEWS_POSTS_DEFAULTS)).items as NewsPost[]).filter((p) => p.slug && p.title);
  const [featured, ...rest] = posts;
  const cats = Array.from(new Set(posts.map((p) => p.cat).filter(Boolean)));

  return (
    <LxShell>
      <LxPageHero
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        subtitle={page.heroSubtitle}
        orbit={cats.length >= 3 ? cats : ["Announcements", "Launches", "Client wins", "Events", "Awards"]}
      />

      <section className="lx-sec lx-sec--white">
        <div className="lx-wrap">
          {!featured ? (
            <div className="lx-mini" data-lx-card>
              <span className="lx-badge">Coming soon</span>
              <h2 className="lx-h2 lx-h2--sm">Our first update is on its way.</h2>
              <p>In the meantime, our blog has plenty of practical reading on search, ads and AI.</p>
              <Link href="/blog" className="lx-btn lx-btn--primary">Read the blog</Link>
            </div>
          ) : (
            <>
              <a href={`/news/${featured.slug}`} className="lx-feature lx-spot" data-lx-card>
                <div className="lx-feature__img" style={{ background: "var(--lx-ink)" }}>
                  {featured.image ? <LxCover src={featured.image} alt={featured.imageAlt || featured.title} sizes="(max-width: 860px) 100vw, 640px" priority /> : <span className="lx-post__ph" aria-hidden="true">{featured.cat || "News"}</span>}
                  <span className="lx-chip-tag">Latest</span>
                </div>
                <div className="lx-feature__body">
                  <small>{[featured.cat, featured.date].filter(Boolean).join(" · ")}</small>
                  <h2 className="lx-h2 lx-h2--sm">{featured.title}</h2>
                  <p>{featured.excerpt}</p>
                  <span className="lx-link">Read more →</span>
                </div>
              </a>

              {rest.length > 0 && (
                <div className="lx-grid lx-grid--3" style={{ marginTop: "1rem" }}>
                  {rest.map((post) => (
                    <a key={post.slug} href={`/news/${post.slug}`} className="lx-post lx-spot" data-lx-card>
                      <div className="lx-post__img" style={{ background: "var(--lx-ink)" }}>
                        {post.image ? <LxCover src={post.image} alt={post.imageAlt || post.title} sizes="(max-width: 640px) 100vw, 420px" /> : <span className="lx-post__ph" aria-hidden="true">{post.cat || "News"}</span>}
                        {post.cat && <span className="lx-chip-tag">{post.cat}</span>}
                      </div>
                      <div className="lx-post__body">
                        <h3 className="lx-h3">{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <small>{post.date}</small>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <LxContact />
    </LxShell>
  );
}
