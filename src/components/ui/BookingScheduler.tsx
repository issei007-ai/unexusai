"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const TIME_SLOTS = ["9:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Fallback list for browsers without Intl.supportedValuesOf.
const FALLBACK_TIMEZONES = [
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Riyadh",
  "Asia/Karachi",
  "Asia/Singapore",
  "Europe/London",
  "Europe/Berlin",
  "America/New_York",
  "America/Los_Angeles",
  "Australia/Sydney",
];

// Legacy/alias zone names some browsers still report → canonical IANA name.
const TZ_ALIASES: Record<string, string> = {
  "Asia/Calcutta": "Asia/Kolkata",
  "Asia/Saigon": "Asia/Ho_Chi_Minh",
  "Asia/Rangoon": "Asia/Yangon",
  "Asia/Katmandu": "Asia/Kathmandu",
  "Asia/Dacca": "Asia/Dhaka",
  "America/Buenos_Aires": "America/Argentina/Buenos_Aires",
  "Europe/Kiev": "Europe/Kyiv",
  "Pacific/Ponape": "Pacific/Pohnpei",
};

function canonicalTz(tz: string): string {
  return TZ_ALIASES[tz] ?? tz;
}

/** Full IANA zone list where supported, else a curated fallback. */
function allTimezones(): string[] {
  try {
    const sv = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf;
    if (typeof sv === "function") {
      const list = sv("timeZone");
      if (Array.isArray(list) && list.length) return list;
    }
  } catch {
    /* ignore */
  }
  return FALLBACK_TIMEZONES;
}

/** Next N days starting tomorrow (includes weekends). */
function nextWeekdays(count: number): Date[] {
  const days: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    days.push(new Date(d));
  }
  return days;
}

function startOfTomorrow(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  return d;
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/** Searchable, dark-themed time-zone picker (replaces the native select). */
function TimezonePicker({ zones, value, onChange }: { zones: string[]; value: string; onChange: (z: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/_/g, " ");
    const list = q ? zones.filter((z) => z.toLowerCase().replace(/_/g, " ").includes(q)) : zones;
    return list.slice(0, 80);
  }, [zones, query]);

  return (
    <div style={{ position: "relative" }}>
      <input
        className="form-input"
        value={open ? query : value.replace(/_/g, " ")}
        placeholder="Search time zone…"
        onFocus={() => { setOpen(true); setQuery(""); }}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        aria-label="Time zone"
        autoComplete="off"
      />
      {open && (
        <div className="booking-tz-list">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm" style={{ color: "var(--color-brand-500)" }}>No matches</div>
          ) : (
            filtered.map((z) => (
              <button
                key={z}
                type="button"
                onMouseDown={(e) => { e.preventDefault(); onChange(z); setOpen(false); setQuery(""); }}
                className="booking-tz-opt"
                data-active={z === value}
              >
                {z.replace(/_/g, " ")}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function BookingScheduler({ source = "book" }: { source?: string }) {
  const router = useRouter();
  const days = useMemo(() => nextWeekdays(10), []);
  const tomorrow = useMemo(() => startOfTomorrow(), []);
  const detectedTz = useMemo(() => {
    try {
      return canonicalTz(Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Dubai");
    } catch {
      return "Asia/Dubai";
    }
  }, []);
  const zones = useMemo(() => {
    const list = allTimezones();
    return list.includes(detectedTz) ? list : [detectedTz, ...list];
  }, [detectedTz]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [tz, setTz] = useState(detectedTz);
  const [showCal, setShowCal] = useState(false);
  const [calView, setCalView] = useState(() => {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cc, setCc] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ready = selectedDate && slot && tz && name.trim() && email.trim() && phone.trim();

  function pickDate(d: Date) {
    setSelectedDate(d);
    setSlot(null);
  }

  // Calendar grid for the current view month.
  const calCells = useMemo(() => {
    const first = new Date(calView.y, calView.m, 1);
    const offset = first.getDay();
    const daysInMonth = new Date(calView.y, calView.m + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < offset; i++) cells.push(null);
    for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(calView.y, calView.m, day));
    return cells;
  }, [calView]);

  const canGoPrev = calView.y > tomorrow.getFullYear() || (calView.y === tomorrow.getFullYear() && calView.m > new Date().getMonth());

  function shiftMonth(delta: number) {
    setCalView((v) => {
      const m = v.m + delta;
      return { y: v.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 };
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ready || submitting) return;
    setSubmitting(true);
    setError(null);

    const sd = selectedDate!;
    const date = `${DAY_NAMES[sd.getDay()]} ${sd.getDate()} ${MONTH_NAMES[sd.getMonth()]} ${sd.getFullYear()}`;
    const time = `${slot} (${tz})`;
    const fullPhone = `${cc.trim()} ${phone.trim()}`.trim();

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "booking", source, name, email, phone: fullPhone, date, time, timezone: tz }),
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
          {days.map((d) => {
            const active = selectedDate ? sameDay(selectedDate, d) : false;
            return (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => pickDate(d)}
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
          <button
            type="button"
            onClick={() => setShowCal((s) => !s)}
            className="booking-day"
            data-active={showCal}
            style={{ minWidth: 64 }}
            aria-expanded={showCal}
          >
            <span className="text-[0.6rem] uppercase tracking-wider" style={{ color: "var(--color-brand-400)" }}>More</span>
            <span className="text-lg font-bold" style={{ color: "var(--color-brand-100)" }}>📅</span>
            <span className="text-[0.6rem]" style={{ color: "var(--color-brand-500)" }}>dates</span>
          </button>
        </div>

        {/* Full month calendar */}
        {showCal && (
          <div className="mt-3 rounded-xl p-3" style={{ background: "var(--color-panel)", border: "1px solid var(--color-border)" }}>
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => canGoPrev && shiftMonth(-1)}
                disabled={!canGoPrev}
                className="booking-cal-nav"
                style={{ opacity: canGoPrev ? 1 : 0.35, cursor: canGoPrev ? "pointer" : "not-allowed" }}
                aria-label="Previous month"
              >
                ‹
              </button>
              <span className="text-sm font-semibold text-white">{MONTH_NAMES[calView.m]} {calView.y}</span>
              <button type="button" onClick={() => shiftMonth(1)} className="booking-cal-nav" aria-label="Next month">›</button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-1">
              {DAY_NAMES.map((n) => (
                <span key={n} className="text-center text-[0.6rem] uppercase tracking-wider" style={{ color: "var(--color-brand-500)" }}>{n}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calCells.map((d, i) => {
                if (!d) return <span key={`b${i}`} />;
                const disabled = d < tomorrow;
                const active = selectedDate ? sameDay(selectedDate, d) : false;
                return (
                  <button
                    key={d.toISOString()}
                    type="button"
                    disabled={disabled}
                    onClick={() => { pickDate(d); setShowCal(false); }}
                    className="booking-cal-day"
                    data-active={active}
                    style={{ opacity: disabled ? 0.25 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Step 2 — pick a time */}
      <div style={{ opacity: selectedDate ? 1 : 0.4, pointerEvents: selectedDate ? "auto" : "none", transition: "opacity 0.25s" }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="booking-step">2</span>
          <span className="text-sm font-semibold text-white">Pick a time</span>
        </div>
        <div className="mb-3">
          <label className="text-[0.7rem] uppercase tracking-wider block mb-1.5" style={{ color: "var(--color-brand-500)" }}>Time zone</label>
          <TimezonePicker zones={zones} value={tz} onChange={setTz} />
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
          <div className="flex gap-2">
            <input
              className="form-input"
              type="tel"
              inputMode="tel"
              placeholder="+xx"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              autoComplete="off"
              aria-label="Country code"
              pattern="\+?[0-9]{1,4}"
              style={{ width: 84, flexShrink: 0, textAlign: "center" }}
            />
            <input
              className="form-input"
              type="tel"
              inputMode="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="off"
              aria-label="Phone number"
              required
              style={{ flex: 1 }}
            />
          </div>
        </div>
      </div>

      {/* Confirmation summary */}
      {ready && (
        <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid var(--color-accent-700)", color: "var(--color-brand-100)" }}>
          You&apos;re booking <span className="text-white font-semibold">{DAY_NAMES[selectedDate!.getDay()]} {selectedDate!.getDate()} {MONTH_NAMES[selectedDate!.getMonth()]}</span> at <span className="text-white font-semibold">{slot}</span> <span style={{ color: "var(--color-brand-400)" }}>({tz.replace(/_/g, " ")})</span> — 30 minutes with Richa.
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
