"use client";
import { usePathname } from "next/navigation";
import { GoogleTagManager } from "@next/third-parties/google";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Google Tag Manager container — off on /admin, otherwise always loaded under
 * Google Consent Mode v2 (defaults set in layout.tsx), so Google Ads tags run
 * cookieless until the visitor accepts. GTM is used only for the
 * conversion/campaign layer (Google Ads conversions, the generate_lead
 * trigger). GA4 pageviews stay on the direct tag in Analytics.tsx — do NOT
 * also add a GA4 config tag inside this container, or pageviews double-count.
 */
export default function TagManager() {
  const pathname = usePathname();

  if (!GTM_ID || pathname?.startsWith("/admin")) return null;
  return <GoogleTagManager gtmId={GTM_ID} />;
}
