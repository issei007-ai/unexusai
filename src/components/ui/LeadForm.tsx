"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { readAttribution } from "@/lib/attribution";

interface Props {
  children: ReactNode;
  submitLabel?: string;
  note?: string;
  /** Which form this is, e.g. "audit", "contact", "quote" — sent with the lead. */
  source?: string;
  /** Submission kind. Defaults to "lead". */
  type?: "lead" | "booking" | "newsletter";
}

/**
 * Client form wrapper. Serialises its fields (by `name`) and POSTs them to
 * /api/lead, which fans the submission out to every configured channel
 * (email / WhatsApp / database). On success it routes to /thank-you.
 */
export default function LeadForm({ children, submitLabel = "Submit", note, source = "site", type = "lead" }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // Attach any captured campaign attribution (gclid/UTM). The /api/lead route
    // stores unknown fields as-is, so these ride along to the DB/email/WhatsApp.
    const attribution = readAttribution();

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...attribution, source, type }),
      });
      if (!res.ok) throw new Error("Request failed");
      // Conversion signal for GTM — configure a trigger on "generate_lead" to
      // fire your Google Ads / GA4 conversion tags. No-ops if GTM isn't loaded
      // (visitor declined cookies), so no tracking happens without consent.
      const w = window as Window & { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: "generate_lead", lead_type: type, lead_source: source, ...attribution });
      router.push("/thank-you");
    } catch {
      setError("Something went wrong sending that. Please try again, or email us directly.");
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {children}
      {/* Honeypot — hidden from humans, catches bots. */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      <button type="submit" className="btn btn-primary btn-lg w-full" disabled={submitting} style={{ opacity: submitting ? 0.7 : 1 }}>
        {submitting ? "Sending…" : submitLabel}
      </button>
      {error && (
        <p className="text-xs text-center" style={{ color: "#f87171" }}>
          {error}
        </p>
      )}
      {note && !error && (
        <p className="text-xs text-center" style={{ color: "var(--color-brand-500)" }}>
          {note}
        </p>
      )}
    </form>
  );
}
