import type { Testimonial } from "@/lib/types";
import { Media } from "./Media";
import { findImage } from "@/lib/images";
import { SectionHeading } from "./SectionHeading";

/**
 * Customer stories + delivery/collection photography.
 * Only real testimonials are ever rendered — no placeholders.
 */
export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const gallery = [
    { seed: "gallery-delivery", slot: "gallery/delivery-day", caption: "Delivery day", cls: "col-span-2 row-span-2" },
    { seed: "gallery-calves", slot: "gallery/calves-loading", caption: "Calves ready to load", cls: "" },
    { seed: "gallery-poultry", slot: "gallery/poultry-collection", caption: "Poultry collection", cls: "" },
    { seed: "gallery-farm", slot: "gallery/on-the-farm", caption: "On the farm", cls: "col-span-2" },
  ];

  // Only show this section once there is real material: at least one
  // delivery photo in public/images/gallery/ or a real testimonial.
  const hasPhotos = gallery.some((g) => findImage(g.slot, g.caption));
  if (!hasPhotos && testimonials.length === 0) return null;

  return (
    <section aria-labelledby="customers-heading" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          id="customers-heading"
          title="Livestock on its way."
          intro="Deliveries, collections and the people buying from Balilethu. More regular updates are posted on Balilethu's Facebook and TikTok."
          align="split"
        />

        <div className="mt-12 grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-4 md:auto-rows-[14rem]">
          {gallery.map((g) => (
            <div key={g.seed} className={`overflow-hidden rounded-sm ${g.cls}`} data-reveal="clip">
              <Media image={null} slot={g.slot} seed={g.seed} sizes="(min-width: 768px) 50vw, 100vw" className="h-full" caption={g.caption} />
            </div>
          ))}
        </div>

        {testimonials.length > 0 && (
          <ul className="mt-14 grid gap-x-10 border-t border-line md:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name + t.quote} className="border-b border-line py-6">
                <blockquote className="font-serif text-xl leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
                <p className="mt-4 text-sm">
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
