"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Skip on touch devices — no cursor needed there
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.14);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.14);

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const grow   = () => ringRef.current?.classList.add("cursor-hover");
    const shrink = () => ringRef.current?.classList.remove("cursor-hover");
    document.querySelectorAll("a,button").forEach((el) => {
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
      {/* Dot — solid, no blend mode (blend mode forces full-page recomposite every frame) */}
      <div
        ref={dotRef}
        style={{
          position:    "fixed",
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: "50%",
          background:  "var(--color-accent-400)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange:  "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(99,102,241,0.55)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
        }}
      />
      <style>{`
        @media (pointer: fine) { * { cursor: none !important; } }
        .cursor-hover {
          width: 52px !important;
          height: 52px !important;
          border-color: rgba(99,102,241,0.85) !important;
          margin-left: -8px;
          margin-top: -8px;
        }
      `}</style>
    </>
  );
}
