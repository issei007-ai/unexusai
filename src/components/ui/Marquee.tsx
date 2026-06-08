"use client";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  speed?: number; // seconds for one full cycle
  gap?: string;
  reverse?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  speed = 28,
  gap = "3.5rem",
  reverse = false,
  className = "",
}: Props) {
  return (
    <div
      className={`overflow-hidden flex ${className}`}
      style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)" }}
    >
      <div
        style={{
          display: "flex",
          gap,
          animation: `marquee-scroll ${speed}s linear infinite${reverse ? " reverse" : ""}`,
          willChange: "transform",
        }}
      >
        {/* Duplicate children so the loop is seamless */}
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: "flex", gap, flexShrink: 0 }}>
            {children}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
