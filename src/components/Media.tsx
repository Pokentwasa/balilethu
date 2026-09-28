import Image from "next/image";
import type { StockImage } from "@/lib/types";
import { Plate } from "./Plate";
import { findImage } from "@/lib/images";

/**
 * Image slot: renders the supplied photograph, or a plain catalogue plate
 * when none exists yet.
 */
export function Media({
  image,
  sizes,
  priority = false,
  className = "",
  imgClassName = "",
  plateText,
  captionClassName = "bottom-3 left-3",
  slot,
  alt,
}: {
  image: StockImage | null | undefined;
  /** Text set on the plate shown when no photo exists. */
  plateText?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  captionClassName?: string;
  /** When `image` is empty, looks for public/images/<slot>.(jpg|png|webp|avif). */
  slot?: string;
  alt?: string;
}) {
  if (!image && slot) image = findImage(slot, alt ?? "");
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
        <Plate text={plateText} />
      )}
    </div>
  );
}

/** Tells buyers a listing photo is representative, not the animal for sale. */
export function IllustrativeTag({ className = "bottom-3 left-3" }: { className?: string }) {
  return (
    <span className={`absolute z-10 ${className} bg-ink/60 px-2 py-1 text-[0.64rem] font-medium tracking-[0.06em] text-bone/90 uppercase`}>
      Illustrative photo
    </span>
  );
}
