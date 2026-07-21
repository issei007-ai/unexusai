"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getConsent } from "@/components/ui/CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** GA4, skipped on /admin (that traffic is us, not visitors) and until the visitor accepts cookies. */
export default function Analytics() {
  const pathname = usePathname();
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const check = () => setAccepted(getConsent() === "accepted");
    check();
    window.addEventListener("cookie-consent-change", check);
    return () => window.removeEventListener("cookie-consent-change", check);
  }, []);

  if (!GA_ID || !accepted || pathname?.startsWith("/admin")) return null;
  return <GoogleAnalytics gaId={GA_ID} />;
}
