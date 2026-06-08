"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; alpha: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Skip on touch/mobile — no mouse interaction, saves battery + CPU
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // 30 particles — enough visual density without O(n²) cost
    const NUM = 30;
    const particles: Particle[] = Array.from({ length: NUM }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.6 + 0.5,
      alpha: Math.random() * 0.45 + 0.1,
    }));

    let mouse = { x: -999, y: -999 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let raf: number;
    let lastTime = 0;
    const TARGET_FPS = 30;
    const INTERVAL = 1000 / TARGET_FPS;
    const MOUSE_DIST = 120;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      const delta = now - lastTime;
      if (delta < INTERVAL) return; // cap at 30fps
      lastTime = now - (delta % INTERVAL);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist2 = mdx * mdx + mdy * mdy;
        if (mDist2 < MOUSE_DIST * MOUSE_DIST) {
          const mDist = Math.sqrt(mDist2);
          const force = (MOUSE_DIST - mDist) / MOUSE_DIST;
          p.vx += (mdx / mDist) * force * 0.25;
          p.vy += (mdy / mDist) * force * 0.25;
        }

        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165,180,252,${p.alpha})`;
        ctx.fill();
      }
      // No connection lines — removed O(n²) inner loop
    };
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
