import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FloatingWidgets from "@/components/ui/FloatingWidgets";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: "Unexus AI — Digital Marketing, Web & AI",
  description: "Digital marketing, AI automation, and fast websites — run by one team that actually talks to itself.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <ScrollProgress />
        {children}
        <FloatingWidgets />
      </body>
      {/* GA4. Next's wrapper loads gtag with the `afterInteractive` strategy so
          it never blocks paint, and auto-fires a pageview on App Router client
          navigations — a hand-placed <script> tag only counts the first load.
          Renders nothing when the env var is absent (e.g. local dev). */}
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
