"use client";
import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

type Metric = { value: string; label: string };
type Case = {
  category: string;
  flag: string;
  headline: string;
  quote: string;
  tags: string[];
  metrics: Metric[];
};

const ACCENTS: Record<string, string> = {
  "E-commerce": "#6366f1",
  "Fashion & Retail": "#ec4899",
  "B2B & Industrial": "#06b6d4",
  "Fintech": "#34d399",
  "Local Services": "#f59e0b",
  "Content & SEO": "#a78bfa",
};

const FILTERS = ["All", "E-commerce", "Fashion & Retail", "B2B & Industrial", "Fintech", "Local Services", "Content & SEO"];

export default function CaseStudiesGrid({ cases }: { cases: Case[] }) {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? cases : cases.filter((c) => c.category === filter);

  return (
    <section className="section section-alt">
      <div className="container">
        {/* Filter */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest self-center mr-2" style={{ color: "var(--color-brand-500)" }}>
            Filter by industry
          </span>
          {FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className="text-sm rounded-full px-4 py-1.5 transition-colors"
                style={{
                  background: active ? "linear-gradient(135deg, var(--color-accent-500), var(--color-glow))" : "rgba(255,255,255,0.04)",
                  border: active ? "1px solid transparent" : "1px solid var(--color-border-bright)",
                  color: active ? "#fff" : "var(--color-brand-300)",
                  fontWeight: active ? 600 : 500,
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((c, i) => {
            const accent = ACCENTS[c.category] ?? "#6366f1";
            return (
              <ScrollReveal key={c.headline} delay={(i % 3) * 0.06}>
                <div className="glow-card h-full p-7 flex flex-col" style={{ border: "1px solid var(--color-border)" }}>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>{c.category}</span>
                    <span style={{ fontSize: "1.1rem" }}>{c.flag}</span>
                  </div>

                  <h3 className="mb-4 text-white" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.12rem", lineHeight: 1.3 }}>
                    {c.headline}
                  </h3>

                  <p className="text-sm leading-relaxed mb-5 pl-3" style={{ color: "var(--color-brand-300)", borderLeft: `2px solid ${accent}55`, fontStyle: "italic" }}>
                    &ldquo;{c.quote}&rdquo;
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {c.tags.map((t) => (
                      <span key={t} className="text-xs rounded-full px-2.5 py-1" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border)", color: "var(--color-brand-300)" }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4 mt-auto">
                    {c.metrics.map((m) => (
                      <div key={m.label}>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1, color: accent, letterSpacing: "-0.03em" }}>
                          {m.value}
                        </div>
                        <div className="text-xs mt-1.5" style={{ color: "var(--color-brand-400)", lineHeight: 1.25 }}>{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3" style={{ borderTop: "1px solid var(--color-border)" }}>
                    <a href="#contact" className="text-sm font-medium inline-flex items-center gap-1.5 hover:text-white transition-colors" style={{ color: accent }}>
                      Read more →
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
