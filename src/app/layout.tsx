import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { buildMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import Analytics from "@/components/ui/Analytics";
import TagManager from "@/components/ui/TagManager";
import Attribution from "@/components/ui/Attribution";
import CookieConsent from "@/components/ui/CookieConsent";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FloatingWidgets from "@/components/ui/FloatingWidgets";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata();
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [orgLd, siteLd] = await Promise.all([organizationJsonLd(), websiteJsonLd()]);
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Google Consent Mode v2 — must run before GA4/GTM load. Everything
            defaults to denied (cookieless pings only); a returning visitor who
            already accepted is upgraded to granted immediately. The banner in
            CookieConsent.tsx updates this live on Accept/Decline. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);
try{if(localStorage.getItem('cookie-consent')==='accepted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}`,
          }}
        />
      </head>
      <body>
        {/* Organization + WebSite structured data for rich results and AI
            engines — driven by the SEO section in /admin/content. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />
        <ScrollProgress />
        {children}
        <FloatingWidgets />
        <CookieConsent />
        <Attribution />
      </body>
      <Analytics />
      <TagManager />
    </html>
  );
}
