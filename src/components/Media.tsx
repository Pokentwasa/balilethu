import Image from "next/image";
import type { StockImage } from "@/lib/types";
import { Artwork, type ArtworkTone } from "./Artwork";
import { site } from "@/config/site";
import { findImage } from "@/lib/images";

/**
 * Image slot: renders the supplied photograph, or placeholder artwork with a
 * small "photo to come" caption while content flags are on.
 */
export function Media({
  image,
  seed,
  tone,
  sizes,
  priority = false,
  className = "",
  imgClassName = "",
  caption,
  captionClassName = "bottom-3 left-3",
  slot,
  alt,
}: {
  image: StockImage | null | undefined;
  seed: string;
  tone?: ArtworkTone;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  caption?: string;
  captionClassName?: string;
  /** When `image` is empty, looks for public/images/<slot>.(jpg|png|webp|avif). */
  slot?: string;
  alt?: string;
}) {
  if (!image && slot) image = findImage(slot, alt ?? caption ?? "");
  const position = /(^|\s)absolute(\s|$)/.test(className) ? "" : "relative";
  return (
    <div className={`${position} overflow-hidden bg-sand ${className}`}>
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-cover ${imgClassName}`}
          />
          {image.illustrative && <IllustrativeTag className={captionClassName} />}
        </>
      ) : (
        <>
          <div className={`absolute inset-0 ${imgClassName}`}>
            <Artwork seed={seed} tone={tone} />
          </div>
          {site.showContentFlags && caption && (
            <span className={`absolute z-10 ${captionClassName} rounded-sm bg-ink/55 px-2.5 py-1 text-[0.62rem] font-medium tracking-wide text-bone/90 uppercase backdrop-blur-sm`}>
              Photo: {caption}
            </span>
          )}
        </>
      )}
    </div>
  );
}

/** Tells buyers a listing photo is representative, not the animal for sale. */
export function IllustrativeTag({ className = "bottom-3 left-3" }: { className?: string }) {
  return (
    <span className={`absolute z-10 ${className} rounded-sm bg-ink/55 px-2.5 py-1 text-[0.62rem] font-medium tracking-wide text-bone/90 uppercase backdrop-blur-sm`}>
      Illustrative photo
    </span>
  );
}
