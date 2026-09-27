"use client";

import Image from "next/image";
import { useState } from "react";

const OPTIMISABLE = /^(\/(?!\/)|https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\/)/i;

/**
 * Cover image for blog and news cards/articles. Uploaded covers are resized
 * and converted by next/image (a 1.8 MB PNG becomes a small WebP at the size
 * actually shown). If the optimiser can't serve an image for any reason, it
 * falls back to the original file so a cover is never missing. Unknown hosts
 * use a plain lazy <img>. The parent must be position: relative with a size.
 */
export default function LxCover({ src, alt, sizes, priority }: { src: string; alt: string; sizes: string; priority?: boolean }) {
  const [raw, setRaw] = useState(!OPTIMISABLE.test(src));
  if (!raw) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} onError={() => setRaw(true)} />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />;
}
