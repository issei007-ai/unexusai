"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const OPTIMISABLE = /^(\/(?!\/)|https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\/)/i;

/**
 * Cover image for blog and news cards/articles. Uploaded covers are resized
 * and converted by next/image (a 1.8 MB PNG becomes a small WebP at the size
 * actually shown). Covers load eagerly: there are only a few per page, and
 * lazy loading never started inside the animated cards. If the optimiser
 * can't serve an image, it falls back to the original file, including when
 * the failure happened before hydration (when onError never fires).
 * The parent must be position: relative with a size.
 */
export default function LxCover({ src, alt, sizes, priority }: { src: string; alt: string; sizes: string; priority?: boolean }) {
  const [raw, setRaw] = useState(!OPTIMISABLE.test(src));
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (raw) return;
    const img = ref.current;
    // Already failed before React attached onError? Fall back now.
    if (img && img.complete && img.naturalWidth === 0) setRaw(true);
    // Still nothing after a while (stuck request): fall back too.
    const t = window.setTimeout(() => {
      if (ref.current && ref.current.naturalWidth === 0) setRaw(true);
    }, 12000);
    return () => window.clearTimeout(t);
  }, [raw]);

  if (!raw) {
    return (
      <Image
        ref={ref}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "eager"}
        style={{ objectFit: "cover" }}
        onError={() => setRaw(true)}
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="eager" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />;
}
