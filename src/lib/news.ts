/**
 * Industry news: headlines pulled from public RSS feeds, refreshed hourly.
 * We only show the headline, a short excerpt, the source and the date, and
 * every item links out to the original article.
 */

export type NewsTopic = "Search" | "Ads" | "AI" | "Social";

export type NewsItem = {
  title: string;
  link: string;
  excerpt: string;
  date: string; // ISO
  source: string;
  domain: string;
  topic: NewsTopic;
};

const FEEDS: { source: string; url: string; topic: NewsTopic }[] = [
  { source: "Google Search Central", url: "https://developers.google.com/search/blog/feed.xml", topic: "Search" },
  { source: "Search Engine Journal", url: "https://www.searchenginejournal.com/feed/", topic: "Search" },
  { source: "Google Ads & Commerce", url: "https://blog.google/products/ads-commerce/rss/", topic: "Ads" },
  { source: "PPC Land", url: "https://ppc.land/rss/", topic: "Ads" },
  { source: "OpenAI", url: "https://openai.com/news/rss.xml", topic: "AI" },
  { source: "Google AI", url: "https://blog.google/technology/ai/rss/", topic: "AI" },
  { source: "TechCrunch AI", url: "https://techcrunch.com/category/artificial-intelligence/feed/", topic: "AI" },
  { source: "Social Media Today", url: "https://www.socialmediatoday.com/feeds/news/", topic: "Social" },
];

const PER_FEED = 6;
const EXCERPT_CHARS = 170;

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", mdash: "—", ndash: "–", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“" };

function decode(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}

function clean(s: string): string {
  const noCdata = s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
  // Decode first so escaped markup (&lt;p&gt;) is stripped too.
  return decode(decode(noCdata).replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .replace(/\s*The post .* appeared first on .*$/i, "")
    .trim();
}

function tag(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return m ? m[1] : "";
}

function excerpt(s: string): string {
  if (s.length <= EXCERPT_CHARS) return s;
  const cut = s.slice(0, EXCERPT_CHARS);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "") + "…";
}

function parse(xml: string, feed: (typeof FEEDS)[number]): NewsItem[] {
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) ?? [];
  const items: NewsItem[] = [];
  for (const b of blocks.slice(0, PER_FEED * 2)) {
    const title = clean(tag(b, "title"));
    let link = clean(tag(b, "link"));
    if (!link) link = b.match(/<link[^>]*href="([^"]+)"/i)?.[1] ?? "";
    const when = clean(tag(b, "pubDate") || tag(b, "published") || tag(b, "updated") || tag(b, "dc:date"));
    const t = Date.parse(when);
    if (!title || !/^https?:\/\//.test(link) || Number.isNaN(t)) continue;
    const body = clean(tag(b, "description") || tag(b, "summary") || tag(b, "content"));
    let domain = "";
    try {
      domain = new URL(link).hostname.replace(/^www\./, "");
    } catch {
      continue;
    }
    items.push({ title, link, excerpt: excerpt(body), date: new Date(t).toISOString(), source: feed.source, domain, topic: feed.topic });
    if (items.length >= PER_FEED) break;
  }
  return items;
}

async function fetchFeed(feed: (typeof FEEDS)[number]): Promise<NewsItem[]> {
  try {
    const res = await fetch(feed.url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; UnexusAI-News/1.0; +https://www.unexusai.com/news)", Accept: "application/rss+xml, application/xml, text/xml" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    return parse(await res.text(), feed);
  } catch {
    return [];
  }
}

/** Latest items across all feeds, mixed by source. Failed feeds are skipped. */
export async function getIndustryNews(limit = 40): Promise<NewsItem[]> {
  // Interleave sources (each feed newest-first, feeds ordered by their latest
  // story) so one busy publisher can't fill the whole top of the page.
  const perFeed = (await Promise.all(FEEDS.map(fetchFeed)))
    .map((items) => items.sort((a, b) => b.date.localeCompare(a.date)))
    .filter((items) => items.length > 0)
    .sort((a, b) => b[0].date.localeCompare(a[0].date));
  const seen = new Set<string>();
  const out: NewsItem[] = [];
  for (let round = 0; out.length < limit && perFeed.some((f) => f.length > round); round++) {
    for (const feed of perFeed) {
      const item = feed[round];
      if (!item || seen.has(item.link)) continue;
      seen.add(item.link);
      out.push(item);
      if (out.length >= limit) break;
    }
  }
  return out;
}

export const NEWS_SOURCES = FEEDS.map((f) => f.source);
