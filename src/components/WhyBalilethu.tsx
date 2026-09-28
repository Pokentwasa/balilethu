import { Media } from "./Media";
import { SectionHeading } from "./SectionHeading";

const reasons = [
  {
    title: "One supplier, wide selection",
    body: "Calves, breeding cattle, pregnant cows, sheep, lambs, goats, layers, broilers and day-old chicks — enquire once for a mixed order.",
    seed: "why-selection",
    slot: "sections/why-selection",
  },
  {
    title: "Delivery in KZN and the Eastern Cape",
    body: "Delivery across KwaZulu-Natal and the Eastern Cape up to Mount Frere, and collection for buyers from other provinces.",
    seed: "why-delivery",
    slot: "sections/why-delivery",
  },
  {
    title: "Support for first-time buyers",
    body: "Balilethu began by supplying bottle-fed calves to people starting out. Starter packages and practical guidance are part of how we sell.",
    seed: "why-support",
    slot: "sections/why-support",
  },
  {
    title: "Direct, straightforward buying",
    body: "You deal with the team directly on WhatsApp. Stock, quantities and prices are confirmed before you commit.",
    seed: "why-direct",
    slot: "sections/why-direct",
  },
];

export function WhyBalilethu() {
  return (
    <section aria-labelledby="why-heading" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          id="why-heading"
          eyebrow="Why Balilethu"
          title={<>Practical livestock buying, <em className="text-forest-soft">done properly.</em></>}
          align="split"
          intro="What you can expect when you buy from Balilethu Livestock."
        />
        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <article key={r.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
              <div data-reveal="clip" className="overflow-hidden rounded-[1.1rem]">
                <Media image={null} slot={r.slot} seed={r.seed} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className={i % 2 ? "aspect-[4/5]" : "aspect-[4/4.4]"} caption={r.title} />
              </div>
              <h3 className="mt-5 font-serif text-2xl leading-tight">{r.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{r.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
