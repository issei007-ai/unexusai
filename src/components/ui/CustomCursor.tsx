"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Skip entirely on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Show the cursor elements (hidden via CSS until JS confirms pointer:fine)
    if (dotRef.current)  dotRef.current.style.display  = "block";
    if (ringRef.current) ringRef.current.style.display = "block";

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf: number;

    const animate = () => {
      // Ring lerps toward cursor — 0.25 is snappy but still smooth
      current.current.x += (target.current.x - current.current.x) * 0.25;
      current.current.y += (target.current.y - current.current.y) * 0.25;

      if (dotRef.current) {
        // Dot snaps immediately
        dotRef.current.style.transform =
          `translate3d(${target.current.x - 4}px, ${target.current.y - 4}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${current.current.x - 18}px, ${current.current.y - 18}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // Scale ring on interactive elements
    const grow   = () => ringRef.current?.classList.add("cursor-grow");
    const shrink = () => ringRef.current?.classList.remove("cursor-grow");
    document.querySelectorAll("a, button, [data-cursor-grow]").forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Hidden by default; shown only when JS confirms pointer:fine */}
      <div
        ref={dotRef}
        style={{
          display:       "none",
          position:      "fixed",
          top: 0, left:  0,
          width:         8,
          height:        8,
          borderRadius:  "50%",
          background:    "var(--color-accent-400)",
          pointerEvents: "none",
          zIndex:        9999,
          willChange:    "transform",
        }}
      />
      <div
        ref={ringRef}
        style={{
          display:       "none",
          position:      "fixed",
          top: 0, left:  0,
          width:         36,
          height:        36,
          borderRadius:  "50%",
          border:        "1.5px solid rgba(99,102,241,0.6)",
          pointerEvents: "none",
          zIndex:        9998,
          willChange:    "transform",
          transition:    "width 0.18s, height 0.18s, border-color 0.18s",
        }}
      />
      <style>{`
        @media (pointer: fine) { * { cursor: none !important; } }
        .cursor-grow {
          width:        52px !important;
          height:       52px !important;
          border-color: rgba(99,102,241,0.9) !important;
          margin-left:  -8px;
          margin-top:   -8px;
        }
      `}</style>
    </>
  );
}
