import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import LxShell from "@/components/lx/LxShell";
import LxCover from "@/components/lx/LxCover";
import LxPageHero from "@/components/lx/LxPageHero";
import LxContact from "@/components/lx/LxContact";
import type { BlogPost } from "@/lib/blog";
import { getSection } from "@/lib/cms";
import { BLOG_POSTS_DEFAULTS } from "@/lib/cms-schema";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";

export const dynamicParams = true;

async function getPosts(): Promise<BlogPost[]> {
  const data = await getSection("blog.posts", BLOG_POSTS_DEFAULTS);
  return data.items as BlogPost[];
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPosts()).find((p) => p.slug === slug);
  if (!post) return { title: "Article — Unexus AI" };
  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${slug}`,
    image: post.image,
    imageAlt: post.imageAlt || post.title,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getPosts()).find((p) => p.slug === slug);
  if (!post) notFound();

  const author = post.author?.trim() || "Richa Gupta";
  const url = `${SITE_URL}/blog/${slug}`;
  const articleLd = articleJsonLd({
    title: post.title,
    description: post.metaDescription || post.excerpt,
    url,
    image: post.image,
    authorName: author,
  });
  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
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
      <LxPageHero eyebrow={post.cat} title={post.title} subtitle={`By ${author} · ${post.date} · ${post.read} read`} orbit={false} narrow />

      {post.image && (
        <div className="lx-wrap lx-article__hero">
          <figure className="lx-fig">
            <LxCover src={post.image} alt={post.imageAlt || post.title} sizes="(max-width: 1100px) 100vw, 1100px" priority />
          </figure>
        </div>
      )}

      <section className="lx-sec" style={{ paddingTop: "1rem" }}>
        <div className="lx-wrap lx-article">
          <Link href="/blog" className="lx-link lx-link--back">← All articles</Link>
          <article className="lx-prose" dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
      </section>

      <LxContact
        heading="Want this kind of thinking applied to your business?"
        body="Tell us where things feel stuck and we'll talk through what we'd do about it — no pitch, no pressure."
      />
    </LxShell>
  );
}
