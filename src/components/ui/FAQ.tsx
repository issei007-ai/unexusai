"use client";
import { useState } from "react";

interface QA {
  q: string;
  a: string;
}

/** Accessible dark accordion. Height animates via the grid-rows 0fr→1fr trick. */
export default function FAQ({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="card"
            style={{ borderRadius: "var(--radius-lg)", overflow: "hidden" }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left"
              style={{ padding: "1.15rem 1.25rem", background: "transparent", border: "none", cursor: "pointer" }}
            >
              <span style={{ color: "#fff", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem" }}>
                {item.q}
              </span>
              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  width: 24,
                  height: 24,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-accent-300)",
                  fontSize: "1.5rem",
                  lineHeight: 1,
                  transition: "transform 0.3s var(--ease-spring)",
                  transform: isOpen ? "rotate(45deg)" : "none",
                }}
              >
                +
              </span>
            </button>
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.35s var(--ease-smooth)",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-brand-300)", padding: "0 1.25rem 1.25rem" }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
