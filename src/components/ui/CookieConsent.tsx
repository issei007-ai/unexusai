"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export type ConsentChoice = "accepted" | "declined";
const STORAGE_KEY = "cookie-consent";

/** Reads the stored choice, or null if the visitor hasn't decided yet. */
export function getConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "declined" ? v : null;
}

/**
 * Bottom banner gating analytics cookies behind an explicit choice. Essential
 * site function (the site itself, lead forms) never depends on this — only
 * Analytics.tsx checks getConsent() before loading GA4.
 */
export default function CookieConsent() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<ConsentChoice | null>("accepted"); // assume decided until checked, avoids a flash

  useEffect(() => {
    setChoice(getConsent());
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const decide = (value: ConsentChoice) => {
    localStorage.setItem(STORAGE_KEY, value);
    setChoice(value);
    // Let Analytics.tsx (already mounted) react to an in-tab choice immediately.
    window.dispatchEvent(new Event("cookie-consent-change"));
  };

  if (choice !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
      style={{
        maxWidth: "40rem",
        background: "var(--color-panel)",
        border: "1px solid var(--color-border)",
        boxShadow: "0 10px 40px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-300)" }}>
        We use cookies to understand how visitors use this site. Essential cookies always run; analytics only run if
        you accept. See our{" "}
        <a href="/cookie-policy" className="underline" style={{ color: "var(--color-accent-300)" }}>
          Cookie Policy
        </a>
        .
      </p>
      <div className="flex shrink-0 gap-2">
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => decide("declined")}>
          Decline
        </button>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => decide("accepted")}>
          Accept
        </button>
      </div>
    </div>
  );
}
