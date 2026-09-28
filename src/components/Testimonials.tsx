import type { Testimonial } from "@/lib/types";
import { site } from "@/config/site";
import { Media } from "./Media";
import { SectionHeading } from "./SectionHeading";
import { ContentFlag } from "./ContentFlag";

/**
 * Customer stories + delivery/collection photography.
 * Only real testimonials are rendered. With none supplied, labelled
 * placeholders appear in development and the quote row is omitted in production.
 */
export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const showPlaceholders = testimonials.length === 0 && site.showContentFlags;
  const gallery = [
    { seed: "gallery-delivery", slot: "gallery/delivery-day", caption: "Delivery day", cls: "col-span-2 row-span-2" },
    { seed: "gallery-calves", slot: "gallery/calves-loading", caption: "Calves ready to load", cls: "" },
    { seed: "gallery-poultry", slot: "gallery/poultry-collection", caption: "Poultry collection", cls: "" },
    { seed: "gallery-farm", slot: "gallery/on-the-farm", caption: "On the farm", cls: "col-span-2" },
  ];

  return (
    <section aria-labelledby="customers-heading" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          id="customers-heading"
          eyebrow="Customers & deliveries"
          title="Livestock on its way."
          intro="Deliveries, collections and the people buying from Balilethu. More regular updates are posted on Balilethu's Facebook and TikTok."
          align="split"
        />

        <div className="mt-12 grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-4 md:auto-rows-[14rem]">
          {gallery.map((g) => (
            <div key={g.seed} className={`overflow-hidden rounded-[1.1rem] ${g.cls}`} data-reveal="clip">
              <Media image={null} slot={g.slot} seed={g.seed} sizes="(min-width: 768px) 50vw, 100vw" className="h-full" caption={g.caption} />
            </div>
          ))}
        </div>

        {(testimonials.length > 0 || showPlaceholders) && (
          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {(testimonials.length > 0 ? testimonials : placeholderSlots).map((t, i) => (
              <li
                key={i}
                className={`flex flex-col justify-between rounded-[1.1rem] p-7 ${
                  testimonials.length > 0 ? "bg-paper" : "border border-line bg-paper/60"
                }`}
                data-reveal
              >
                {testimonials.length === 0 && <ContentFlag className="mb-5 self-start">Placeholder — add real customer story</ContentFlag>}
                <blockquote className={`font-serif text-xl leading-snug ${testimonials.length === 0 ? "text-muted/70" : ""}`}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="mt-6 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  {t.location && <span className="text-muted"> · {t.location}</span>}
                  {t.purchase && <span className="block text-muted">{t.purchase}</span>}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

const placeholderSlots: Testimonial[] = Array.from({ length: 3 }, () => ({
  quote: "Customer quote goes here once supplied by Balilethu.",
  name: "Customer name",
  location: "Town, province",
  purchase: "What they bought",
  image: null,
}));
