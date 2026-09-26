"use client";

import { useState } from "react";

type Metric = { value: string; label: string };
type Case = { category: string; flag: string; headline: string; quote: string; tags: string[]; metrics: Metric[] };

const FILTERS = ["All", "E-commerce", "Fashion & Retail", "B2B & Industrial", "Fintech", "Local Services", "Content & SEO"];

/** Case study cards with an industry filter. Same copy as CaseStudiesGrid. */
export default function LxCaseGrid({ cases }: { cases: Case[] }) {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? cases : cases.filter((c) => c.category === filter);

  return (
    <section className="lx-sec lx-sec--white">
      <div className="lx-wrap">
        <div className="lx-filter" role="group" aria-label="Filter by industry">
          <span>Filter by industry</span>
          {FILTERS.map((f) => (
            <button key={f} type="button" aria-pressed={f === filter} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        <div className="lx-grid lx-grid--3" key={filter}>
          {shown.map((c, i) => (
            <article key={c.headline} className="lx-case lx-spot" style={{ ["--i" as string]: i }}>
              <div className="lx-case__top">
                <span>{c.category}</span>
                <span aria-hidden="true">{c.flag}</span>
              </div>
              <h3 className="lx-h3">{c.headline}</h3>
              <blockquote>&ldquo;{c.quote}&rdquo;</blockquote>
              <ul className="lx-case__tags">
                {c.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <div className="lx-case__metrics">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <b>{m.value}</b>
                    <small>{m.label}</small>
                  </div>
                ))}
              </div>
              <a href="#contact" className="lx-case__more">Read more →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
