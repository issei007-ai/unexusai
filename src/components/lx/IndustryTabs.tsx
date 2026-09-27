"use client";

import { useState } from "react";

export type LxIndustry = {
  name: string;
  segments: string;
  cta: string;
  points: { title: string; desc: string }[];
};

/** Industry switcher. Every panel is in the HTML; inactive ones are hidden. */
export default function IndustryTabs({ items }: { items: LxIndustry[] }) {
  const [on, setOn] = useState(0);
  return (
    <div className="lx-ind">
      <div className="lx-ind__tabs" role="tablist" aria-label="Industries">
        {items.map((ind, i) => (
          <button
            key={ind.name}
            type="button"
            role="tab"
            id={`lx-tab-${i}`}
            aria-selected={on === i}
            aria-controls={`lx-panel-${i}`}
            className="lx-ind__tab"
            onClick={() => setOn(i)}
          >
            <b>{ind.name}</b>
            <span>{ind.segments}</span>
          </button>
        ))}
      </div>
      {items.map((ind, i) => (
        <div
          key={ind.name}
          id={`lx-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`lx-tab-${i}`}
          className="lx-ind__panel"
          hidden={on !== i}
        >
          {ind.points.map((p) => (
            <div key={p.title} className="lx-pain">
              <b>{p.title}</b>
              <p>{p.desc}</p>
            </div>
          ))}
          <a href="/services" className="lx-ind__cta">
            {ind.cta} →
          </a>
        </div>
      ))}
    </div>
  );
}
