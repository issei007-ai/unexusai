"use client";
import { useCallback, useEffect, useState } from "react";
import { useDeviceTier } from "./useDeviceTier";

const KEY = "richa-3d";

/**
 * Decides — and keeps deciding — whether the WebGL hero should run, based on
 * the ACTUAL frame rate of the user's machine, not just its specs.
 *
 *  1. Gate on device tier (pointer/size/cores/RAM/hardware-GPU).
 *  2. Probe baseline FPS (~700ms) before loading anything heavy.
 *  3. The scene itself runs a watchdog and calls reportBad() if it can't hold
 *     up — we then unmount it and remember "off" for the session.
 *
 * Net effect: strong machines get the 3D, weak ones silently get the smooth
 * aurora-only fallback. The decision is cached per session (sessionStorage).
 */
export function useAdaptive3D() {
  const { mounted, tier, reducedMotion } = useDeviceTier();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!mounted || tier !== "desktop" || reducedMotion) {
      setEnabled(false);
      return;
    }
    const prior = sessionStorage.getItem(KEY);
    if (prior === "on") {
      setEnabled(true);
      return;
    }
    if (prior === "off") {
      setEnabled(false);
      return;
    }

    // Baseline probe: count frames for ~700ms with the page already painting.
    let frames = 0;
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      frames++;
      const elapsed = performance.now() - start;
      if (elapsed >= 700) {
        const fps = (frames / elapsed) * 1000;
        if (fps >= 50) {
          setEnabled(true); // confirmed "on" only after the in-scene watchdog passes
        } else {
          sessionStorage.setItem(KEY, "off");
          setEnabled(false);
        }
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mounted, tier, reducedMotion]);

  const reportBad = useCallback(() => {
    sessionStorage.setItem(KEY, "off");
    setEnabled(false);
  }, []);

  const reportStable = useCallback(() => {
    sessionStorage.setItem(KEY, "on");
  }, []);

  return { enabled, reportBad, reportStable };
}
