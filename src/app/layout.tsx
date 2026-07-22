import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Analytics from "@/components/ui/Analytics";
import TagManager from "@/components/ui/TagManager";
import Attribution from "@/components/ui/Attribution";
import CookieConsent from "@/components/ui/CookieConsent";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FloatingWidgets from "@/components/ui/FloatingWidgets";

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
        <CookieConsent />
        <Attribution />
      </body>
      <Analytics />
      <TagManager />
    </html>
  );
}
