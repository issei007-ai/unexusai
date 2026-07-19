/**
 * Unixi — the Unexus AI chat mascot, rebuilt as animated SVG from the brand
 * turnaround sheet. Pure vector + CSS keyframes (no sprite raster), so it's
 * crisp at any size and costs ~3KB.
 *
 * States:
 *  - "idle"    float + breathing, slow halo sway, periodic blink
 *  - "talking" mouth pulses (used while the typing dots are up)
 *  - "wave"    one-shot hand wave (played when the panel opens)
 */
export type UnixiState = "idle" | "talking" | "wave";

export default function UnixiAvatar({ size = 40, state = "idle" }: { size?: number; state?: UnixiState }) {
  return (
    <svg
      className="unixi"
      data-state={state}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="unixi-eye" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C084FC" />
          <stop offset="1" stopColor="#7B3FF2" />
        </linearGradient>
      </defs>

      {/* Halo — always active, slow ambient sway */}
      <g className="unixi-halo">
        <ellipse cx="60" cy="22" rx="26" ry="7" stroke="#C084FC" strokeWidth="4.5" opacity="0.9" />
        <ellipse cx="60" cy="22" rx="26" ry="7" stroke="#7B3FF2" strokeWidth="1.5" opacity="0.5" />
      </g>

      {/* Body group — floats/breathes as one */}
      <g className="unixi-body">
        {/* Antenna */}
        <line x1="60" y1="30" x2="60" y2="40" stroke="#E6E8EE" strokeWidth="3" strokeLinecap="round" />
        <circle cx="60" cy="30" r="2.6" fill="#C084FC" />

        {/* Ears */}
        <circle cx="23" cy="68" r="7.5" fill="#E6E8EE" />
        <circle cx="97" cy="68" r="7.5" fill="#E6E8EE" />
        <circle cx="23" cy="68" r="3" fill="#7B3FF2" opacity="0.75" />
        <circle cx="97" cy="68" r="3" fill="#7B3FF2" opacity="0.75" />

        {/* Head */}
        <ellipse cx="60" cy="70" rx="36" ry="32" fill="#FFFFFF" />
        <ellipse cx="60" cy="70" rx="36" ry="32" stroke="#E6E8EE" strokeWidth="1.5" />

        {/* Face screen */}
        <rect x="34" y="52" width="52" height="37" rx="17" fill="#0D0D14" />

        {/* Eyes — LED, blink via scaleY */}
        <ellipse className="unixi-eye" cx="50" cy="68" rx="5" ry="6.5" fill="url(#unixi-eye)" />
        <ellipse className="unixi-eye" cx="70" cy="68" rx="5" ry="6.5" fill="url(#unixi-eye)" />

        {/* Mouth — smile at rest, pulsing bar while talking */}
        <path className="unixi-smile" d="M53 79 Q60 84 67 79" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse className="unixi-mouth" cx="60" cy="80" rx="6" ry="2.4" fill="#C084FC" />

        {/* Waving hand — shown only in the wave state */}
        <g className="unixi-hand">
          <rect x="96" y="80" width="13" height="16" rx="6.5" fill="#FFFFFF" stroke="#E6E8EE" strokeWidth="1.5" />
          <line x1="99.5" y1="80" x2="99.5" y2="86" stroke="#0D0D14" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="103" y1="79" x2="103" y2="86" stroke="#0D0D14" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="106.5" y1="80" x2="106.5" y2="86" stroke="#0D0D14" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
