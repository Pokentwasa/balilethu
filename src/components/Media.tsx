import Image from "next/image";
import type { StockImage } from "@/lib/types";
import { findImage } from "@/lib/images";

/**
 * Image slot: renders the supplied photograph, or a flat forest block when
 * no photo exists yet. No labels are overlaid on photographs.
 */
export function Media({
  image,
  sizes,
  priority = false,
  className = "",
  imgClassName = "",
  slot,
  alt,
}: {
  image: StockImage | null | undefined;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** When `image` is empty, looks for public/images/<slot>.(jpg|png|webp|avif). */
  slot?: string;
  alt?: string;
}) {
  if (!image && slot) image = findImage(slot, alt ?? "");
  const position = /(^|\s)absolute(\s|$)/.test(className) ? "" : "relative";
  return (
    <div className={`${position} overflow-hidden bg-bone ${className}`}>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`}
        />
      ) : (
        // No photo yet: a flat forest block rather than decorative artwork.
        <div className="absolute inset-0 bg-forest" aria-hidden="true" />
      )}
    </div>
  );
}
