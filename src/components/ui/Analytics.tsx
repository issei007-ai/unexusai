"use client";
import { usePathname } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * GA4, skipped on /admin (that traffic is us, not visitors). Loads for every
 * visitor, but under Google Consent Mode v2 (defaults set in layout.tsx): until
 * the visitor accepts cookies it sends cookieless pings only, which Google uses
 * to model the users and conversions it can't observe directly.
 */
export default function Analytics() {
  const pathname = usePathname();

  if (!GA_ID || pathname?.startsWith("/admin")) return null;
  return <GoogleAnalytics gaId={GA_ID} />;
}
