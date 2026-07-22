"use client";
import { usePathname } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsentAccepted } from "@/components/ui/CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** GA4, skipped on /admin (that traffic is us, not visitors) and until the visitor accepts cookies. */
export default function Analytics() {
  const pathname = usePathname();
  const accepted = useConsentAccepted();

  if (!GA_ID || !accepted || pathname?.startsWith("/admin")) return null;
  return <GoogleAnalytics gaId={GA_ID} />;
}
