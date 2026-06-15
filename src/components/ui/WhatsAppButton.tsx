"use client";
import { useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/constants";

/**
 * Floating WhatsApp button with a pre-chat capture step. On click it opens a
 * small form (name + phone + topic); on submit it logs the lead to /api/lead
 * (database + email) and THEN opens WhatsApp with a prefilled message. The chat
 * itself happens in WhatsApp — we capture who started it and why, not the
 * private message contents.
 */
export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");

  async function startChat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    // Capture the lead first (best-effort — never block the chat on it).
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "whatsapp",
          source: "whatsapp-button",
          name: name.trim(),
          phone: phone.trim(),
          message: topic.trim(),
        }),
      });
    } catch {
      /* ignore — still open WhatsApp */
    }

    const text = `Hi Unexus AI, I'm ${name.trim() || "there"}.${topic.trim() ? ` ${topic.trim()}` : ""}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");

    setSubmitting(false);
    setOpen(false);
    setName(""); setPhone(""); setTopic("");
  }

  return (
    <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 50 }}>
      {open && (
        <div
          className="glow-card"
          style={{
            position: "absolute",
            bottom: 72,
            right: 0,
            width: 300,
            padding: "1.25rem",
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            borderRadius: 16,
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Chat with us</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" style={{ color: "var(--color-brand-400)", fontSize: "1.1rem", lineHeight: 1 }}>×</button>
          </div>
          <p className="text-xs mb-4" style={{ color: "var(--color-brand-400)" }}>
            Quick intro and we&apos;ll pick it up on WhatsApp.
          </p>
          <form className="space-y-2.5" onSubmit={startChat}>
            <input className="form-input" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required style={{ fontSize: "0.85rem", padding: "0.55rem 0.75rem" }} />
            <input className="form-input" type="tel" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ fontSize: "0.85rem", padding: "0.55rem 0.75rem" }} />
            <input className="form-input" type="text" placeholder="What's it about? (optional)" value={topic} onChange={(e) => setTopic(e.target.value)} style={{ fontSize: "0.85rem", padding: "0.55rem 0.75rem" }} />
            <button type="submit" disabled={submitting} className="w-full" style={{
              background: "#25D366", color: "#fff", fontWeight: 600, fontSize: "0.85rem",
              borderRadius: 10, padding: "0.6rem", opacity: submitting ? 0.7 : 1,
            }}>
              {submitting ? "Opening…" : "Start WhatsApp chat"}
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat with us on WhatsApp"
        style={{
          width: 56, height: 56, borderRadius: "50%", background: "#25D366",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 24px rgba(37,211,102,0.4)", cursor: "pointer",
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </button>
    </div>
  );
}
