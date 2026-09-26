"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Process steps as a sideways row the visitor moves themselves: trackpad or
 * touch swipe, mouse drag, or the arrow buttons. Vertical page scroll is
 * never captured. Every step is in the HTML as a normal ordered list.
 */
export default function LxRail({ steps }: { steps: { title: string; desc: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [p, setP] = useState(0);
  const [canScroll, setCanScroll] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanScroll(max > 4);
      setP(max > 0 ? el.scrollLeft / max : 0);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);

    // Mouse drag (touch and trackpads already scroll natively).
    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 4) {
        moved = true;
        el.classList.add("is-drag");
        el.setPointerCapture(e.pointerId);
      }
      if (moved) el.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      el.classList.remove("is-drag");
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="lx-railbox">
      <ol className="lx-rail" ref={ref} tabIndex={0} aria-label="Process steps, scroll sideways">
        {steps.map((s) => (
          <li key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </li>
        ))}
      </ol>
      {canScroll && (
        <div className="lx-railbar">
          <div className="lx-railbar__track" aria-hidden="true">
            <span style={{ transform: `scaleX(${Math.max(0.08, p)})` }} />
          </div>
          <button type="button" className="lx-railbar__btn" onClick={() => go(-1)} disabled={p <= 0.001} aria-label="Previous steps">←</button>
          <button type="button" className="lx-railbar__btn" onClick={() => go(1)} disabled={p >= 0.999} aria-label="Next steps">→</button>
        </div>
      )}
    </div>
  );
}
