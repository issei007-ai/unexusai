import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import LxShell from "@/components/lx/LxShell";
import LxPageHero from "@/components/lx/LxPageHero";
import LxContact from "@/components/lx/LxContact";
import type { NewsPost } from "@/lib/news";
import { getSection } from "@/lib/cms";
import { NEWS_POSTS_DEFAULTS } from "@/lib/cms-schema";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";

export const dynamicParams = true;

async function getPosts(): Promise<NewsPost[]> {
  const data = await getSection("news.posts", NEWS_POSTS_DEFAULTS);
  return (data.items as NewsPost[]).filter((p) => p.slug && p.title);
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPosts()).find((p) => p.slug === slug);
  if (!post) return { title: "News — Unexus AI" };
  return buildMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    path: `/news/${slug}`,
    image: post.image,
    imageAlt: post.imageAlt || post.title,
  });
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getPosts()).find((p) => p.slug === slug);
  if (!post) notFound();

  const author = post.author?.trim() || "Unexus AI";
  const url = `${SITE_URL}/news/${slug}`;
  const articleLd = articleJsonLd({
    type: "NewsArticle",
    title: post.title,
    description: post.metaDescription || post.excerpt,
    url,
    image: post.image,
    authorName: author,
  });
  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "News", url: `${SITE_URL}/news` },
    { name: post.title, url },
  ]);

  return (
    <LxShell
      before={
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }} />
        </>
      }
    >
      <LxPageHero
        eyebrow={post.cat || "News"}
        title={post.title}
        subtitle={[`By ${author}`, post.date].filter(Boolean).join(" · ")}
        orbit={false}
        narrow
      />

      {post.image && (
        <div className="lx-wrap lx-article__hero">
          <figure className="lx-fig">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.imageAlt || post.title} />
          </figure>
        </div>
      )}

      <section className="lx-sec" style={{ paddingTop: "1rem" }}>
        <div className="lx-wrap lx-article">
          <Link href="/news" className="lx-link lx-link--back">← All news</Link>
          <article className="lx-prose" dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
      </section>

      <LxContact />
    </LxShell>
  );
}
