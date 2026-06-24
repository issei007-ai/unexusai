import ScrollReveal from "@/components/ui/ScrollReveal";
import ServiceCubeClient from "@/components/ui/ServiceCubeClient";
import { getSection } from "@/lib/cms";
import { HOME_CUBE_DEFAULTS } from "@/lib/cms-schema";

type Face = { label: string; sub: string; metric: string; accent: string };

/** CMS-driven 3D service cube (drag-to-rotate handled by the client child). */
export default async function ServiceCube() {
  const c = await getSection("home.cube", HOME_CUBE_DEFAULTS);
  const faces = (Array.isArray(c.faces) ? c.faces : HOME_CUBE_DEFAULTS.faces).slice(0, 6) as Face[];

  return (
    <ScrollReveal direction="left">
      <ServiceCubeClient faces={faces} caption={c.caption} />
    </ScrollReveal>
  );
}
