"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const TIME_SLOTS = ["9:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Next N weekdays starting tomorrow (skips Sat/Sun). */
function nextWeekdays(count: number): Date[] {
  const days: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) days.push(new Date(d));
  }
  return days;
}

export default function BookingScheduler({ source = "book" }: { source?: string }) {
  const router = useRouter();
  const days = useMemo(() => nextWeekdays(10), []);
  const [dayIdx, setDayIdx] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedDay = dayIdx !== null ? days[dayIdx] : null;
  const ready = selectedDay && slot && name.trim() && email.trim() && phone.trim();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ready || submitting) return;
    setSubmitting(true);
    setError(null);

    const date = `${DAY_NAMES[selectedDay!.getDay()]} ${selectedDay!.getDate()} ${MONTH_NAMES[selectedDay!.getMonth()]} ${selectedDay!.getFullYear()}`;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "booking", source, name, email, phone, date, time: slot }),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push("/thank-you");
    } catch {
      setError("Couldn't book that just now. Please try again, or email us directly.");
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Step 1 — pick a day */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="booking-step">1</span>
          <span className="text-sm font-semibold text-white">Pick a day</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin" }}>
          {days.map((d, i) => {
            const active = i === dayIdx;
            return (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => { setDayIdx(i); setSlot(null); }}
                className="booking-day"
                data-active={active}
              >
                <span className="text-[0.65rem] uppercase tracking-wider" style={{ color: active ? "#fff" : "var(--color-brand-400)" }}>
                  {DAY_NAMES[d.getDay()]}
                </span>
                <span className="text-lg font-bold" style={{ color: active ? "#fff" : "var(--color-brand-100)" }}>
                  {d.getDate()}
                </span>
                <span className="text-[0.6rem]" style={{ color: active ? "rgba(255,255,255,0.7)" : "var(--color-brand-500)" }}>
                  {MONTH_NAMES[d.getMonth()]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2 — pick a time */}
      <div style={{ opacity: selectedDay ? 1 : 0.4, pointerEvents: selectedDay ? "auto" : "none", transition: "opacity 0.25s" }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="booking-step">2</span>
          <span className="text-sm font-semibold text-white">Pick a time <span style={{ color: "var(--color-brand-500)", fontWeight: 400 }}>(your local time)</span></span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {TIME_SLOTS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSlot(t)}
              className="booking-slot"
              data-active={t === slot}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Step 3 — your details */}
      <div style={{ opacity: slot ? 1 : 0.4, pointerEvents: slot ? "auto" : "none", transition: "opacity 0.25s" }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="booking-step">3</span>
          <span className="text-sm font-semibold text-white">Your details</span>
        </div>
        <div className="space-y-3">
          <input
            className="form-input"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="form-input"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="form-input"
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
      </div>

      {/* Confirmation summary */}
      {ready && (
        <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid var(--color-accent-700)", color: "var(--color-brand-100)" }}>
          You&apos;re booking <span className="text-white font-semibold">{DAY_NAMES[selectedDay!.getDay()]} {selectedDay!.getDate()} {MONTH_NAMES[selectedDay!.getMonth()]}</span> at <span className="text-white font-semibold">{slot}</span> — 30 minutes with Richa.
        </div>
      )}

      <button type="submit" className="btn btn-primary btn-lg w-full" disabled={!ready || submitting} style={{ opacity: ready && !submitting ? 1 : 0.55, cursor: ready && !submitting ? "pointer" : "not-allowed" }}>
        {submitting ? "Booking…" : ready ? "Confirm booking" : "Pick a day and time"}
      </button>
      {error ? (
        <p className="text-xs text-center" style={{ color: "#f87171" }}>
          {error}
        </p>
      ) : (
        <p className="text-xs text-center" style={{ color: "var(--color-brand-500)" }}>
          You&apos;ll get a calendar invite by email. Need to reschedule? Just reply to it.
        </p>
      )}
    </form>
  );
}
