"use client";
import { useState, useEffect } from "react";

export type Tier = "mobile" | "desktop";

export interface DeviceInfo {
  mounted: boolean;
  tier: Tier;
  reducedMotion: boolean;
  canWebGL: boolean;
}

let cachedWebGL: boolean | null = null;
function detectWebGL(): boolean {
  if (cachedWebGL !== null) return cachedWebGL;
  try {
    const c = document.createElement("canvas");
    cachedWebGL = !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    cachedWebGL = false;
  }
  return cachedWebGL;
}

/**
 * Decides whether the device can afford the rich WebGL experience.
 * Desktop tier = fine pointer + wide viewport + enough RAM/cores + WebGL.
 * Everything else gets the GPU-cheap CSS path. SSR-safe (mounted gate).
 */
export function useDeviceTier(): DeviceInfo {
  const [info, setInfo] = useState<DeviceInfo>({
    mounted: false,
    tier: "mobile",
    reducedMotion: false,
    canWebGL: false,
  });

  useEffect(() => {
    const compute = () => {
      const nav = navigator as Navigator & {
        deviceMemory?: number;
        hardwareConcurrency?: number;
      };
      const fine = window.matchMedia("(pointer: fine)").matches;
      const wide = window.innerWidth >= 1024;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mem = nav.deviceMemory ?? 8;
      const cores = nav.hardwareConcurrency ?? 8;
      const webgl = detectWebGL();
      const capable = fine && wide && mem >= 4 && cores >= 4 && webgl;
      setInfo({
        mounted: true,
        tier: capable ? "desktop" : "mobile",
        reducedMotion: reduced,
        canWebGL: webgl,
      });
    };
    compute();
    window.addEventListener("resize", compute, { passive: true });
    const mm = window.matchMedia("(prefers-reduced-motion: reduce)");
    mm.addEventListener?.("change", compute);
    return () => {
      window.removeEventListener("resize", compute);
      mm.removeEventListener?.("change", compute);
    };
  }, []);

  return info;
}
