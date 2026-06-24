/**
 * Minimal in-memory fixed-window rate limiter. Per warm serverless instance,
 * so it's a stopgap (not a global limit) — enough to blunt spam and brute force
 * without an external store. Swap for Upstash/Redis if you need it cluster-wide.
 */
type Entry = { count: number; reset: number };
const buckets = new Map<string, Entry>();

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const e = buckets.get(key);

  if (!e || now > e.reset) {
    // Opportunistic cleanup so the map can't grow without bound.
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) if (now > v.reset) buckets.delete(k);
    }
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  e.count++;
  if (e.count > limit) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((e.reset - now) / 1000)) };
  }
  return { ok: true, retryAfter: 0 };
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
