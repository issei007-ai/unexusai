import LxShell from "@/components/lx/LxShell";
import LxPageHero from "@/components/lx/LxPageHero";
import LxNewsList from "@/components/lx/LxNewsList";
import LxContact from "@/components/lx/LxContact";
import { getIndustryNews, NEWS_SOURCES } from "@/lib/news";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

// Headlines come from external feeds; rebuild the page at most once an hour.
export const revalidate = 3600;

export function generateMetadata(): Promise<Metadata> {
  // Aggregated third-party headlines add no original content for search
  // engines, so the page is kept out of the index (links are still followed).
  return buildMetadata({
    title: "Industry News",
    description: "The latest in search, ads, AI and social media, gathered from the sources we read every day.",
    path: "/news",
    noindex: true,
  });
}

export default async function NewsPage() {
  const items = await getIndustryNews(40);
  return (
    <LxShell>
      <LxPageHero
        eyebrow="Industry news"
        title="What's changing in search, ads and AI"
        subtitle="The headlines we read every morning, in one place. Updated every hour from the sources below; each story opens on the original site."
        orbit={["Google", "ChatGPT", "Meta", "Gemini", "Search", "Ads", "AI"]}
      />

      <section className="lx-sec lx-sec--white">
        <div className="lx-wrap">
          <LxNewsList items={items} />
          <p className="lx-news__credit">
            Sources: {NEWS_SOURCES.join(", ")}. Headlines and excerpts belong to their publishers.
          </p>
        </div>
      </section>

      <LxContact
        heading="Want to know what this means for your business?"
        body="Most of these updates matter to someone. Tell us about your business and we'll tell you which ones matter to you, and what to do about them."
      />
    </LxShell>
  );
}
