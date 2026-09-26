"use client";

import { useState } from "react";
import type { NewsItem, NewsTopic } from "@/lib/news";

const TOPICS: ("All" | NewsTopic)[] = ["All", "Search", "Ads", "AI", "Social"];

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

/** Filterable list of industry headlines. Every card links out to the source. */
export default function LxNewsList({ items }: { items: NewsItem[] }) {
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>("All");
  const shown = topic === "All" ? items : items.filter((i) => i.topic === topic);
  const [lead, ...rest] = shown;

  return (
    <>
      <div className="lx-filter" role="group" aria-label="Filter by topic">
        <span>Topic</span>
        {TOPICS.map((t) => (
          <button key={t} type="button" aria-pressed={t === topic} onClick={() => setTopic(t)}>
            {t}
          </button>
        ))}
      </div>

      {!lead ? (
        <p className="lx-lede">Nothing new in this topic right now. Check back in an hour.</p>
      ) : (
        <div key={topic} className="lx-news">
          <a href={lead.link} target="_blank" rel="noopener noreferrer nofollow" className="lx-news__lead lx-spot" style={{ ["--i" as string]: 0 }}>
            <span className="lx-news__mark" aria-hidden="true">{lead.topic}</span>
            <div className="lx-news__meta">
              <Source item={lead} />
              <span>{lead.topic}</span>
              <time dateTime={lead.date}>{fmt(lead.date)}</time>
            </div>
            <h2 className="lx-h2 lx-h2--sm">{lead.title}</h2>
            {lead.excerpt && <p>{lead.excerpt}</p>}
            <span className="lx-link">Read on {lead.source} ↗</span>
          </a>
          {rest.map((n, i) => (
            <a key={n.link} href={n.link} target="_blank" rel="noopener noreferrer nofollow" className="lx-news__item lx-spot" style={{ ["--i" as string]: Math.min(i + 1, 12) }}>
              <div className="lx-news__meta">
                <Source item={n} />
                <time dateTime={n.date}>{fmt(n.date)}</time>
              </div>
              <h3 className="lx-h3">{n.title}</h3>
              {n.excerpt && <p>{n.excerpt}</p>}
              <span className="lx-news__topic">{n.topic}</span>
            </a>
          ))}
        </div>
      )}
    </>
  );
}

function Source({ item }: { item: NewsItem }) {
  return (
    <b className="lx-news__src">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=64`} alt="" width={18} height={18} loading="lazy" />
      {item.source}
    </b>
  );
}
