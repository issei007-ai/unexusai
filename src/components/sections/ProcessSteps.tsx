import { PROCESS_STEPS } from "@/lib/constants";

export default function ProcessSteps() {
  return (
    <section className="section" style={{ background: "var(--color-brand-50)" }}>
      <div className="container">
        <div className="text-center mb-14">
          <span className="badge badge-accent mb-4 inline-flex">Our process</span>
          <h2 className="text-h2 mb-4">Strategy first. Always.</h2>
          <p className="text-lead max-w-xl mx-auto">
            We don&apos;t start building until we understand your business properly.
            Every engagement begins with a deep discovery — then we move fast.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((item) => (
            <div key={item.step} className="text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold"
                style={{ background: "var(--color-accent-100)", color: "var(--color-accent-600)" }}
              >
                {item.step}
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-500)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
