"use client";

import { useEffect, useState } from "react";

/**
 * SEO hero motion graphic: a stylised results page. A query types itself in,
 * then "your site" climbs from the bottom of the page to #1 while the others
 * shuffle down. Loops through the page's own specialisms as queries.
 * Decorative — the real content is in the headline and copy beside it.
 */
const ROWS = 6;
const H = 3.4; // rem, matches .lx-serp__item height
const WIDTHS = ["78%", "64%", "84%", "58%", "72%", "68%"];

export default function SerpDemo({ queries }: { queries: string[] }) {
  const [q, setQ] = useState(0);
  const [typed, setTyped] = useState("");
  const [youAt, setYouAt] = useState(ROWS - 1);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const text = (queries[q] || "seo").toLowerCase();
    if (reduce) {
      const t = setTimeout(() => {
        setTyped(text);
        setYouAt(0);
      }, 0);
      return () => clearTimeout(t);
    }
    let i = 0;
    let climb: ReturnType<typeof setInterval> | undefined;
    const type = setInterval(() => {
      i++;
      if (i === 1) setYouAt(ROWS - 1);
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(type);
        let pos = ROWS - 1;
        climb = setInterval(() => {
          pos--;
          setYouAt(pos);
          if (pos <= 0) clearInterval(climb);
        }, 520);
      }
    }, 70);
    const next = setTimeout(() => setQ((n) => (n + 1) % Math.max(1, queries.length)), text.length * 70 + ROWS * 520 + 2400);
    return () => {
      clearInterval(type);
      if (climb) clearInterval(climb);
      clearTimeout(next);
    };
  }, [q, queries]);

  // Order: everyone keeps relative order; "you" is inserted at youAt.
  const others = Array.from({ length: ROWS - 1 }, (_, k) => k);
  const order: (number | "you")[] = [...others];
  order.splice(youAt, 0, "you");

  return (
    <div className="lx-serp" aria-hidden="true" >
      <div className="lx-serp__bar">{typed}</div>
      <div className="lx-serp__meta">
        <span>Results</span>
        <span>Page 1</span>
      </div>
      <ul className="lx-serp__list" style={{ height: `${ROWS * H}rem` }}>
        {others.map((k) => (
          <li
            key={k}
            className="lx-serp__item"
            style={{ transform: `translateY(${order.indexOf(k) * H}rem)`, ["--w" as string]: WIDTHS[k] }}
          >
            <i>{String(order.indexOf(k) + 1).padStart(2, "0")}</i>
            <span />
            <em />
          </li>
        ))}
        <li className="lx-serp__item is-you" style={{ transform: `translateY(${youAt * H}rem)`, ["--w" as string]: "80%" }}>
          <i>{String(youAt + 1).padStart(2, "0")}</i>
          <span />
          <em>{youAt === 0 ? "▲ you" : "you"}</em>
        </li>
      </ul>
      <div className="lx-serp__stat">
        <span>Position</span>
        <b>#{youAt + 1}</b>
      </div>
    </div>
  );
}
