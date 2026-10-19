import type { Metadata } from "next";
import "@/components/lx/lx-svc.css";
import LxShell from "@/components/lx/LxShell";
import LxPageHero from "@/components/lx/LxPageHero";
import LxSplit from "@/components/lx/LxSplit";
import LxContact from "@/components/lx/LxContact";
import LxCover from "@/components/lx/LxCover";
import type { BlogPost } from "@/lib/blog";
import { getSection } from "@/lib/cms";
import { AUTHOR_RICHA_DEFAULTS, BLOG_POSTS_DEFAULTS } from "@/lib/cms-schema";
import { buildMetadata, breadcrumbJsonLd, SITE_URL, ORG_ID } from "@/lib/seo";

const PATH = "/about/richa-gupta";
const PAGE_URL = `${SITE_URL}${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  const a = await getSection("author.richa", AUTHOR_RICHA_DEFAULTS);
  return buildMetadata({
    title: `${a.name}, Founder`,
    description: `${a.name} founded SE Digicon in 2015 and Unexus AI in Dubai. Articles and expertise in GEO, SEO, and performance marketing.`,
    path: PATH,
  });
}

/**
 * Author profile. Every article by Richa links here, and her Person schema
 * (@id .../about/richa-gupta#person) is what the articles' author points to,
 * so Google and AI tools can tie the articles to one real, credible person.
 */
export default async function RichaGuptaPage() {
  const [a, blog] = await Promise.all([
    getSection("author.richa", AUTHOR_RICHA_DEFAULTS),
    getSection("blog.posts", BLOG_POSTS_DEFAULTS),
  ]);
  const posts = (blog.items as BlogPost[]).filter((p) => (p.author?.trim() || "Richa Gupta") === a.name);
  const profiles = (a.profiles as string[]).filter(Boolean);
  const expertise = (a.expertise as string[]).filter(Boolean);
  const photo = (a as { photo?: string }).photo;

  const personLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${PAGE_URL}#person`,
    name: a.name,
    url: PAGE_URL,
    jobTitle: "Founder",
    worksFor: { "@id": ORG_ID },
    description: a.story,
    knowsAbout: expertise,
    workLocation: { "@type": "Place", name: "Dubai, United Arab Emirates" },
  };
  if (photo) personLd.image = photo;
  if (profiles.length) personLd.sameAs = profiles;
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: PAGE_URL,
    mainEntity: { "@id": `${PAGE_URL}#person` },
  };
  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "About", url: `${SITE_URL}/about` },
    { name: a.name, url: PAGE_URL },
  ]);

  return (
    <LxShell
      before={
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }} />
        </>
      }
    >
      <LxPageHero eyebrow="Author" title={a.name} subtitle={a.role} orbit={false} narrow />

      <section className="lx-sec">
        <div className="lx-wrap lx-split2">
          <div data-lx-reveal style={{ display: "grid", gap: "1.2rem", alignContent: "start" }}>
            {photo && (
              <div style={{ position: "relative", aspectRatio: "1", maxWidth: "18rem", borderRadius: "20px", overflow: "hidden" }}>
                <LxCover src={photo} alt={`${a.name}, founder of Unexus AI`} sizes="288px" />
              </div>
            )}
            <h2 className="lx-h2" data-lx-fill><LxSplit text="About Richa" /></h2>
            <ul className="lx-checks" aria-label="Areas of expertise">
              {expertise.map((e) => <li key={e}>{e}</li>)}
            </ul>
            {profiles.length > 0 && (
              <p>
                {profiles.map((u, i) => (
                  <span key={u}>{i > 0 && " · "}<a href={u} rel="me noopener" target="_blank">{new URL(u).hostname.replace(/^www\./, "")}</a></span>
                ))}
              </p>
            )}
          </div>
          <div className="lx-prose" data-lx-reveal>
            <p>{a.bio}</p>
            <p>{a.story}</p>
            <p>Read more about the company on the <a href="/about">About page</a>.</p>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="lx-sec lx-sec--white">
          <div className="lx-wrap">
            <h2 className="lx-h2" data-lx-reveal data-lx-fill><LxSplit text={`Articles by ${a.name}`} /></h2>
            <div className="lx-four" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))" }}>
              {posts.map((p) => (
                <div key={p.slug}>
                  <span>{p.cat}</span>
                  <h3 className="lx-h3"><a href={`/blog/${p.slug}`} style={{ color: "inherit" }}>{p.title}</a></h3>
                  <p>{p.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <LxContact heading={`Talk to ${a.name.split(" ")[0]} directly`} body="Book a free 30-minute call. You'll speak with Richa, not a sales rep." />
    </LxShell>
  );
}
