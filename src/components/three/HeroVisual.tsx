"use client";
import dynamic from "next/dynamic";
import { useDeviceTier } from "@/lib/useDeviceTier";
import AuroraBg from "@/components/ui/AuroraBg";

// WebGL bundle is desktop-only and lazy — phones never download or run it.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Picks the right hero visual for the device:
 *  • Aurora (CSS) always renders as the base layer — cheap, looks premium everywhere.
 *  • The WebGL 3D blob is layered on top ONLY for capable desktops without reduced-motion.
 */
export default function HeroVisual() {
  const { mounted, tier, reducedMotion } = useDeviceTier();
  const showWebGL = mounted && tier === "desktop" && !reducedMotion;

  return (
    <>
      <AuroraBg />
      {showWebGL && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <HeroScene />
        </div>
      )}
    </>
  );
}
