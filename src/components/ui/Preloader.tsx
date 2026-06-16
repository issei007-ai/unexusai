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
        gap: "2rem",
        transition: "opacity 0.5s ease",
        opacity: progress === 100 ? 0 : 1,
        pointerEvents: progress === 100 ? "none" : "all",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "linear-gradient(135deg,var(--color-accent-500),var(--color-glow))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            fontWeight: 800,
            color: "#fff",
            fontFamily: "var(--font-display)",
          }}
        >
          D
        </div>
        <span
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#fff",
            fontFamily: "var(--font-display)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Unexus&nbsp;<span className="logo-ai">AI</span>
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: 220,
          height: 2,
          background: "rgba(255,255,255,0.08)",
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
            transition: "width 0.3s cubic-bezier(0.22,1,0.36,1)",
            boxShadow: "0 0 12px rgba(99,102,241,0.6)",
          }}
        />
      </div>

      {/* Number */}
      <span
        style={{
          fontSize: "0.75rem",
          fontFamily: "var(--font-mono)",
          color: "var(--color-brand-500)",
          letterSpacing: "0.1em",
        }}
      >
        {progress}%
      </span>
    </div>
  );
}
