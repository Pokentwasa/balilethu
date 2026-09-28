import Image from "next/image";
import type { Testimonial } from "@/lib/types";
import { findImages } from "@/lib/images";
import { SectionHeading } from "./SectionHeading";

/**
 * Recent deliveries: real delivery / collection photos from
 * public/images/deliveries/, plus real customer quotes if supplied.
 * Renders nothing until there is real material — no placeholders.
 */
export function RecentDeliveries({ testimonials }: { testimonials: Testimonial[] }) {
  const photos = findImages("deliveries", "Balilethu Livestock delivery").slice(0, 4);
  const hasPhotos = photos.length >= 3;
  if (!hasPhotos && testimonials.length === 0) return null;

  const layout = ["col-span-2 row-span-2", "", "", "col-span-2"];

  return (
    <section aria-labelledby="deliveries-heading" className="border-t border-tan py-20 md:py-28">
      <div className="container-x">
        <SectionHeading id="deliveries-heading" title="Recent deliveries" />

        {hasPhotos && (
          <div className="mt-12 grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:auto-rows-[14rem] md:grid-cols-4">
            {photos.map((p, i) => (
              <div key={p.src} className={`relative overflow-hidden bg-bone ${layout[i]}`} data-reveal="clip">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        )}

        {testimonials.length > 0 && (
          <ul className="mt-14 grid gap-x-10 border-t border-tan md:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name + t.quote} className="border-b border-tan py-6">
                <blockquote className="font-serif text-xl leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
                <p className="mt-4 text-[0.95rem]">
                  {t.name}
                  {t.location && <span className="text-muted">, {t.location}</span>}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
