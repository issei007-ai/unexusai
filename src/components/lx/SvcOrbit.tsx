"use client";

import { useEffect, useRef } from "react";

/**
 * Service hero motion graphic: the service's own icon floats at the centre
 * while the page's specialisms orbit it on a tilted ring, passing in front of
 * and behind it. The icon leans toward the cursor. Decorative only; the
 * specialisms are also listed as real text beside it.
 */
export default function SvcOrbit({ icon, items }: { icon: string; items: string[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const chips = useRef<(HTMLSpanElement | null)[]>([]);
  const iconRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = items.length;
    let angle = 0;
    let last = performance.now();
    let raf = 0;
    let visible = true;
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const place = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      for (let i = 0; i < n; i++) {
        const c = chips.current[i];
        if (!c) continue;
        const a = angle + (i / n) * Math.PI * 2;
        const depth = (Math.sin(a) + 1) / 2;
        const x = w / 2 + Math.cos(a) * w * 0.44;
        const y = h * 0.52 + Math.sin(a) * h * 0.2 - Math.cos(a * 2) * 6;
        c.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${0.74 + depth * 0.34})`;
        c.style.opacity = String(0.35 + depth * 0.65);
        c.style.zIndex = depth > 0.5 ? "4" : "1";
        c.style.filter = depth < 0.35 ? `blur(${(0.35 - depth) * 5}px)` : "none";
      }
      if (iconRef.current) {
        iconRef.current.style.transform = `perspective(700px) rotateY(${tilt.x * 16}deg) rotateX(${-tilt.y * 12}deg)`;
      }
    };
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) {
        last = now;
        return;
      }
      angle += Math.min(now - last, 60) * 0.00028;
      last = now;
      tilt.x += (tilt.tx - tilt.x) * 0.07;
      tilt.y += (tilt.ty - tilt.y) * 0.07;
      place();
    };
    const onMove = (e: PointerEvent) => {
      tilt.tx = (e.clientX / window.innerWidth) * 2 - 1;
      tilt.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (reduce) place();
    else {
      raf = requestAnimationFrame(tick);
      window.addEventListener("pointermove", onMove, { passive: true });
    }
    window.addEventListener("resize", place);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", place);
    };
  }, [items.length]);

  return (
    <div className="lx-orbit" ref={stage} aria-hidden="true">
      <div className="lx-orbit__floor" />
      <svg className="lx-orbit__ring" viewBox="0 0 100 40" preserveAspectRatio="none">
        <ellipse cx="50" cy="20" rx="49.5" ry="19.5" />
      </svg>
      <div className="lx-orbit__pulse" />
      <div className="lx-orbit__pulse" style={{ animationDelay: "1.4s" }} />
      <div className="lx-orbit__core">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={iconRef} src={icon} alt="" />
      </div>
      {items.map((t, i) => (
        <span key={t} ref={(c) => { chips.current[i] = c; }} className="lx-token">
          {t}
        </span>
      ))}
    </div>
  );
}
