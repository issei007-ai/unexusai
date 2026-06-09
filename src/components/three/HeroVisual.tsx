import AuroraBg from "@/components/ui/AuroraBg";

/**
 * Pure-CSS hero visual — runs at 60fps on phones and low-end laptops.
 * No WebGL, no canvas, no blur filters. Soft glows use radial-gradients
 * (already soft, so no expensive blur), and the only continuous motion is
 * transform/opacity on small sharp layers — composited on the GPU for free.
 */
export default function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden>
      {/* Soft color depth */}
      <AuroraBg />

      {/* Slowly rotating halo rings (counter-rotating) — sharp, just rotated */}
      <span className="hero-ring" />
      <span className="hero-ring hero-ring--2" />

      {/* Sharp floating accents (no blur → essentially free to animate) */}
      <span className="float-shape float-shape--1" />
      <span className="float-shape float-shape--2" />
      <span className="float-shape float-shape--3" />
      <span className="float-shape float-shape--4" />
    </div>
  );
}
