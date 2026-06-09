/**
 * Aurora background — pure CSS, GPU-cheap.
 * Each blob is blurred ONCE then animated with transform only, so the browser
 * caches the blurred layer as a texture and just moves it (no per-frame reblur).
 * This is what makes it smooth even on phones. No JS, no canvas, no WebGL.
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
