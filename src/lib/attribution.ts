// Campaign attribution. Captures the Google Ads click id (gclid) and UTM
// params from the landing URL and persists them (first-touch) so they can be
// attached to a lead submitted later in the same browser — tying a specific
// ad click to a specific conversion in your leads DB / email / WhatsApp.
//
// This is first-party context for a form the visitor chooses to submit, not
// cross-site tracking, so it isn't gated behind the analytics cookie consent.

const KEYS = ["gclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const STORAGE_KEY = "lead-attribution";
const MAX = 200;

export type Attribution = Partial<Record<(typeof KEYS)[number] | "landing_page" | "referrer", string>>;

/** Capture attribution from the current URL — first-touch only, never overwrites. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(STORAGE_KEY)) return; // first touch wins

  const params = new URLSearchParams(window.location.search);
  const data: Attribution = {};
  for (const k of KEYS) {
    const v = params.get(k);
    if (v) data[k] = v.slice(0, MAX);
  }
  // Only persist when there's an actual campaign signal (a click id or any UTM).
  if (Object.keys(data).length === 0) return;

  data.landing_page = window.location.pathname.slice(0, MAX);
  const ref = document.referrer.slice(0, MAX);
  if (ref) data.referrer = ref;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** Read stored attribution to attach to a lead, or an empty object. */
export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
