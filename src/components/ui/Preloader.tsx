"use client";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const steps = [20, 45, 70, 90, 100];
    let i = 0;
    const tick = () => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
        setTimeout(tick, 180 + Math.random() * 120);
      } else {
        setTimeout(() => setVisible(false), 500);
      }
    };
    tick();
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--color-bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2.25rem",
        transition: "opacity 0.5s ease",
        opacity: progress === 100 ? 0 : 1,
        pointerEvents: progress === 100 ? "none" : "all",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="preloader-aura"
        style={{
          position: "absolute",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.20), rgba(124,58,237,0.10) 45%, transparent 68%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      <div className="preloader-rise" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2.25rem", position: "relative" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg,var(--color-accent-500),var(--color-glow))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "#fff",
              fontFamily: "var(--font-display)",
              boxShadow: "0 0 28px rgba(124,58,237,0.6), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
          >
            U
          </div>
          <span
            style={{
              fontSize: "1.6rem",
              fontWeight: 600,
              color: "#fff",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              textShadow: "0 0 28px rgba(99,102,241,0.35)",
            }}
          >
            Unexus&nbsp;<span className="logo-ai">AI</span>
          </span>
        </div>

        {/* Progress bar */}
        <div
          style={{
            position: "relative",
            width: 260,
            height: 3,
            background: "rgba(255,255,255,0.07)",
            borderRadius: 99,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg,var(--color-accent-500),var(--color-glow))",
              borderRadius: 99,
              transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
              boxShadow: "0 0 14px rgba(124,58,237,0.7)",
            }}
          />
          {/* Sweeping shine */}
          <span
            aria-hidden="true"
            className="preloader-shine"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "35%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
            }}
          />
        </div>

        {/* Number */}
        <span
          style={{
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
            color: "var(--color-brand-400)",
            letterSpacing: "0.2em",
          }}
        >
          {progress}%
        </span>
      </div>
    </div>
  );
}
