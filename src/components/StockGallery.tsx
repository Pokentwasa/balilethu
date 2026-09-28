"use client";

import Image from "next/image";
import { useState } from "react";
import type { StockImage } from "@/lib/types";

/** Product image gallery with thumbnail switching. */
export function StockGallery({ images, fallback }: { images: StockImage[]; fallback: React.ReactNode }) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return <>{fallback}</>;
  const current = images[active];
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-sand">
        <Image src={current.src} alt={current.alt} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
        {current.illustrative && (
          <span className="absolute bottom-3 left-3 z-10 rounded-full bg-ink/55 px-2.5 py-1 text-[0.62rem] font-medium tracking-wide text-bone/90 uppercase backdrop-blur-sm">
            Illustrative photo
          </span>
        )}
      </div>
      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5" aria-label="Choose image">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}: ${img.alt}`}
                aria-current={i === active}
                className={`relative block aspect-square w-full overflow-hidden rounded-lg ring-offset-2 ring-offset-bone ${i === active ? "ring-2 ring-forest" : "opacity-75 hover:opacity-100"}`}
              >
                <Image src={img.src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
