import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsGrid() {
  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-14">
          <span className="badge badge-accent mb-4 inline-flex">What clients say</span>
          <h2 className="text-h2">Don&apos;t take our word for it</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card p-8">
              <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "var(--color-brand-700)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs" style={{ color: "var(--color-brand-500)" }}>
                  {t.role}, {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
