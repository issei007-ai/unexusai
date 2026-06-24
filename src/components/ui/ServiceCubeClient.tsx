"use client";
import { useEffect, useRef } from "react";

type Face = { label: string; sub: string; metric: string; accent: string };
const FACE_ORDER = ["front", "right", "back", "left", "top", "bottom"] as const;

/**
 * Drag-to-rotate 3D cube. Pointer Events unify mouse (desktop) and touch
 * (mobile). Idles with a slow auto-spin; the user can grab and rotate freely.
 */
export default function ServiceCubeClient({ faces, caption }: { faces: Face[]; caption?: string }) {
  const cubeRef = useRef<HTMLDivElement>(null);
  const rot = useRef({ x: -18, y: -24 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const tick = () => {
      if (!dragging.current && !reduce) rot.current.y += 0.22;
      if (rot.current.y > 360 || rot.current.y < -360) rot.current.y %= 360;
      const el = cubeRef.current;
      if (el) el.style.transform = `rotateX(${rot.current.x}deg) rotateY(${rot.current.y}deg)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    // Safety net: if a pointerup is ever missed, never stay stuck dragging.
    const stop = () => { dragging.current = false; };
    window.addEventListener("pointerup", stop);
    window.addEventListener("blur", stop);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("blur", stop);
    };
  }, []);

  const onDown = (e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* capture unsupported — drag still works via move/up */
    }
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    rot.current.y += dx * 0.5;
    rot.current.x = Math.max(-90, Math.min(90, rot.current.x - dy * 0.5));
  };
  const onUp = (e: React.PointerEvent) => {
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className="svc-cube-scene"
        style={{ touchAction: "none" }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        role="img"
        aria-label="Rotatable cube of our six services"
      >
        <div className="svc-cube" ref={cubeRef}>
          {faces.map((f, i) => {
            const accent = f.accent || "#6366f1";
            return (
              <div
                key={i}
                data-face={FACE_ORDER[i]}
                className="svc-cube-face"
                style={{ borderColor: `${accent}66`, boxShadow: `inset 0 0 40px ${accent}1f, inset 0 1px 0 rgba(255,255,255,0.06)` }}
              >
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color: accent, fontFamily: "var(--font-display)" }}>
                  {f.label}
                </span>
                <span className="text-[0.68rem] tracking-wide" style={{ color: "var(--color-brand-400)" }}>{f.sub}</span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.9rem", lineHeight: 1, color: accent, letterSpacing: "-0.03em" }}>
                  {f.metric}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {caption && <p className="text-xs text-center" style={{ color: "var(--color-brand-500)" }}>{caption}</p>}
    </div>
  );
}
