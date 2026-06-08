import { TESTIMONIALS } from "@/lib/constants";

const AVATAR_COLORS = ["#6366F1", "#7C3AED", "#0EA5E9"];

export default function TestimonialsGrid() {
  return (
    <section className="section relative overflow-hidden">
      {/* Subtle background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(99,102,241,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge badge-accent mb-5 inline-flex">What clients say</span>
          <h2 className="text-h2 mb-4">
            Don&apos;t take{" "}
            <span className="highlight-line">our word</span> for it
          </h2>
          <p className="text-lead max-w-md mx-auto">
            Real results from real businesses — no cherry-picked numbers.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="card p-8 flex flex-col gap-6 relative overflow-hidden"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Quote mark */}
              <div
                className="absolute top-4 right-6 text-6xl font-serif leading-none select-none"
                style={{ color: "rgba(99,102,241,0.08)" }}
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="var(--color-warning)">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-sm leading-relaxed flex-1 italic"
                style={{ color: "var(--color-brand-700)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs" style={{ color: "var(--color-brand-500)" }}>
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
