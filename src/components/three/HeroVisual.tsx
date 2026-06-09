"use client";
import dynamic from "next/dynamic";
import { useAdaptive3D } from "@/lib/useAdaptive3D";
import AuroraBg from "@/components/ui/AuroraBg";

// WebGL bundle is desktop-only and lazy — phones never download or run it.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Picks the right hero visual for the device:
 *  • Aurora (CSS) always renders as the base layer — cheap, premium everywhere.
 *  • The WebGL 3D blob layers on top ONLY when the machine proves it can run it
 *    smoothly (see useAdaptive3D). If frame rate is poor, it's removed and the
 *    page falls back to aurora-only for the rest of the session.
 */
export default function HeroVisual() {
  const { enabled, reportBad, reportStable } = useAdaptive3D();

  return (
    <>
      <AuroraBg />
      {enabled && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <HeroScene onUnsupported={reportBad} onStable={reportStable} />
        </div>
      )}
    </>
  );
}
