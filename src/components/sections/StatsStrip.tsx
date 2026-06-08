import { STATS } from "@/lib/constants";

export default function StatsStrip() {
  return (
    <section className="section" style={{ background: "var(--color-brand-50)" }}>
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div
                className="text-h2 font-bold mb-1"
                style={{ color: "var(--color-accent-500)", fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </div>
              <div className="text-sm leading-snug" style={{ color: "var(--color-brand-500)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
