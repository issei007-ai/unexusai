import LxSplit from "@/components/lx/LxSplit";
import SvcOrbit from "@/components/lx/SvcOrbit";
import UnixiAvatar from "@/components/ui/UnixiAvatar";

/**
 * Interior-page hero for redesign-2. Same props as the old PageHero (badge
 * text, title, subtitle, pills, CTAs) so the copy is unchanged. The visual is
 * Unixi with the page's own keywords orbiting him; `orbit={false}` gives a
 * text-only hero for legal pages and articles.
 */
export default function LxPageHero({
  eyebrow,
  title,
  subtitle,
  pills,
  children,
  orbit,
  narrow,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  pills?: string[];
  children?: React.ReactNode;
  orbit?: string[] | false;
  narrow?: boolean;
}) {
  const items = orbit === false ? [] : orbit ?? pills ?? [];
  const withVisual = orbit !== false && items.length > 0;
  return (
    <section className={`lx-wrap lx-phero${withVisual ? "" : " lx-phero--solo"}${narrow ? " lx-phero--narrow" : ""}`}>
      <div className="lx-hero__copy">
        {eyebrow && <span className="lx-badge lx-enter">{eyebrow}</span>}
        <h1 className="lx-h1 lx-h1--page lx-words"><LxSplit text={title} /></h1>
        {subtitle && <p className="lx-lede lx-enter" style={{ ["--d" as string]: "220ms" }}>{subtitle}</p>}
        {pills && pills.length > 0 && (
          <ul className="lx-tags lx-enter" style={{ ["--d" as string]: "300ms" }}>
            {pills.map((p) => <li key={p}>{p}</li>)}
          </ul>
        )}
        {children && <div className="lx-ctas lx-enter" style={{ ["--d" as string]: "340ms" }}>{children}</div>}
      </div>
      {withVisual && (
        <div className="lx-enter lx-shero__vis" style={{ ["--d" as string]: "160ms" }}>
          <SvcOrbit items={items.slice(0, 7)} core={<UnixiAvatar size={320} />} />
        </div>
      )}
    </section>
  );
}
