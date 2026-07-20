"use client";
import { usePathname } from "next/navigation";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatWidget from "@/components/ui/ChatWidget";

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
