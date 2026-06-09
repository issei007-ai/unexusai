/**
 * Aurora background — pure CSS, GPU-cheap.
 * Each blob is a soft radial-gradient (no blur filter needed — the gradient is
 * already feathered). Only transform animates, on a cached layer, so it's smooth
 * even on phones. No JS, no canvas, no WebGL, no blur, no blend modes.
 */
export default function AuroraBg({ className = "" }: { className?: string }) {
  return (
    <div className={`aurora ${className}`} aria-hidden>
      <span className="aurora__blob aurora__blob--1" />
      <span className="aurora__blob aurora__blob--2" />
      <span className="aurora__blob aurora__blob--3" />
      <span className="aurora__blob aurora__blob--4" />
    </div>
  );
}
