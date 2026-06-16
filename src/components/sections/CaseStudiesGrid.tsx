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
  "Retail & e-commerce": "#6366f1",
  "Hospitality & F&B": "#f59e0b",
  "Real estate": "#f87171",
  "Healthcare & wellness": "#34d399",
  "Startups": "#22d3ee",
};

const FILTERS = ["All", "Retail & e-commerce", "Hospitality & F&B", "Real estate", "Healthcare & wellness", "Startups"];

const CASES: Case[] = [
  {
    category: "Retail & e-commerce",
    flag: "🇦🇪",
    headline: "Dubai retailer spending AED 30k/month on ads with no idea what was converting.",
    quote: "We had three campaigns running on Meta and Google. Nobody could tell us which one was actually driving sales — or if any of them were.",
    tags: ["Paid Media", "Conversion Tracking", "Website"],
    metrics: [{ value: "2.8x", label: "Return on ad spend" }, { value: "43%", label: "Drop in cost per purchase" }, { value: "90", label: "Days to results" }],
  },
  {
    category: "Hospitality & F&B",
    flag: "🇦🇪",
    headline: "Dubai restaurant group invisible in AI search — losing bookings to competitors.",
    quote: "Walk-ins were fine. But when we tested it ourselves, we weren't showing up anywhere in ChatGPT or Google when someone searched for restaurants in our area.",
    tags: ["GEO", "Local SEO", "Social Content"],
    metrics: [{ value: "5x", label: "GEO visibility score" }, { value: "38%", label: "More online reservations" }, { value: "4", label: "Months to results" }],
  },
  {
    category: "Real estate",
    flag: "🇦🇪",
    headline: "Abu Dhabi agency generating high lead volume — almost none of them serious buyers.",
    quote: "We were getting 200+ leads a month from our campaigns. Our sales team was spending all their time qualifying them out. Maybe 5% were worth talking to.",
    tags: ["Paid Media", "AI Automation", "Landing Pages"],
    metrics: [{ value: "61%", label: "Drop in unqualified leads" }, { value: "3x", label: "Sales team efficiency" }, { value: "60", label: "Days to results" }],
  },
  {
    category: "Healthcare & wellness",
    flag: "🇮🇳",
    headline: "Bangalore clinic with 200+ happy patients and almost no online presence.",
    quote: "Every patient came through word of mouth. We had great reviews from people who knew us — but nobody could find us online, and new patient bookings were flat.",
    tags: ["SEO", "Reputation Mgmt", "Content"],
    metrics: [{ value: "3.5x", label: "Organic search traffic" }, { value: "60%", label: "More online bookings" }, { value: "6", label: "Months to results" }],
  },
  {
    category: "Startups",
    flag: "🇦🇪",
    headline: "Dubai startup burning runway on marketing with no clear attribution.",
    quote: "We were spending on ads, content, and a freelance SEO — none of it connected. Three months in we had no idea what was working and we were running out of runway.",
    tags: ["Digital Marketing", "Market Research", "GEO"],
    metrics: [{ value: "4x", label: "Qualified leads" }, { value: "52%", label: "Lower cost per lead" }, { value: "90", label: "Days to results" }],
  },
  {
    category: "Retail & e-commerce",
    flag: "🇮🇳",
    headline: "Indian D2C brand with strong product — messaging that wasn't landing.",
    quote: "Our conversion rate was stuck at 1.1%. We kept changing the creative but nothing moved. We didn't realise the problem was the messaging, not the ads.",
    tags: ["Market Research", "Positioning", "Paid Media"],
    metrics: [{ value: "2.1x", label: "Conversion rate" }, { value: "3.9x", label: "Return on ad spend" }, { value: "120", label: "Days to results" }],
  },
  {
    category: "Hospitality & F&B",
    flag: "🇮🇳",
    headline: "Delhi F&B brand with zero digital presence trying to expand to a second location.",
    quote: "We were well known locally. But when we tried to open a second location, we had no digital foundation to build on — no SEO, no social, no reviews strategy.",
    tags: ["Digital Marketing", "Website", "Local SEO"],
    metrics: [{ value: "8x", label: "Online visibility" }, { value: "40%", label: "New location bookings" }, { value: "5", label: "Months to results" }],
  },
  {
    category: "Healthcare & wellness",
    flag: "🇦🇪",
    headline: "Dubai wellness brand with great retention but struggling to acquire new clients.",
    quote: "Existing clients loved us. But we couldn't crack new client acquisition. We were invisible to anyone who hadn't already been referred to us.",
    tags: ["GEO", "SEO", "Paid Media"],
    metrics: [{ value: "3x", label: "New client enquiries" }, { value: "55%", label: "Lower acquisition cost" }, { value: "90", label: "Days to results" }],
  },
];

export default function CaseStudiesGrid() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? CASES : CASES.filter((c) => c.category === filter);

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
