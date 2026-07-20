"use client";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

// Lazy-load the chat bot into its own JS chunk instead of bundling it into
// every page's initial load — its code (flow script + widget + mascot SVG,
// ~650 lines) was parsing/executing during hydration on every visit, even
// for people who never open the chat, competing with the boot screen for
// main-thread time.
const ChatWidget = dynamic(() => import("@/components/ui/ChatWidget"), { ssr: false });

/**
 * The floating WhatsApp button + Unixi chat. Hidden on the admin area (and any
 * other back-office routes) — those aren't public-facing.
 */
export default function FloatingWidgets() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <>
      <WhatsAppButton />
      <ChatWidget />
    </>
  );
}
