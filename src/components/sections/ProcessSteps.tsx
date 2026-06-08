import { PROCESS_STEPS } from "@/lib/constants";

export default function ProcessSteps() {
  return (
    <section className="section relative overflow-hidden" style={{ background: "var(--color-brand-950)" }}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div
        className="orb orb-primary absolute"
        style={{ width: 600, height: 600, top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.15 }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge badge-dark mb-5 inline-flex">Our process</span>
          <h2 className="text-h2 text-white mb-5">Strategy first. Always.</h2>
          <p className="text-lead max-w-xl mx-auto" style={{ color: "var(--color-brand-300)" }}>
            We don&apos;t start building until we understand your business properly.
            Every engagement begins with a deep discovery — then we move fast.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="hidden lg:block absolute top-8 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.4) 20%, rgba(99,102,241,0.4) 80%, transparent 100%)",
              top: "36px",
            }}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((item, i) => (
              <div key={item.step} className="text-center relative animate-fade-up" style={{ animationDelay: `${i * 0.12}s` }}>
                {/* Step circle */}
                <div
                  className="w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                  style={{
                    background: "linear-gradient(135deg, var(--color-accent-500), var(--color-accent-600))",
                    boxShadow: "0 0 24px rgba(99,102,241,0.4), 0 0 48px rgba(99,102,241,0.15)",
                  }}
                >
                  <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {item.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-bold text-lg mb-3 text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-400)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
