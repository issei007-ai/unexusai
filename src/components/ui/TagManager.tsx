"use client";
import { usePathname } from "next/navigation";
import { GoogleTagManager } from "@next/third-parties/google";
import { useConsentAccepted } from "@/components/ui/CookieConsent";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Google Tag Manager container — same gating as GA4: off on /admin and until
 * the visitor accepts cookies. GTM is used only for the conversion/campaign
 * layer (Google Ads conversions, the generate_lead trigger). GA4 pageviews
 * stay on the direct tag in Analytics.tsx — do NOT also add a GA4 config tag
 * inside this container, or pageviews double-count.
 */
export default function TagManager() {
  const pathname = usePathname();
  const accepted = useConsentAccepted();

  if (!GTM_ID || !accepted || pathname?.startsWith("/admin")) return null;
  return <GoogleTagManager gtmId={GTM_ID} />;
}
