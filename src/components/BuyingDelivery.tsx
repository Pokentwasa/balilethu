import Link from "next/link";
import { deliveryFacts } from "@/data/facts";
import { ArrowRight } from "./Icons";

export const buyingSteps = [
  { title: "Browse stock", body: "See what's currently listed and what it costs." },
  { title: "Enquire", body: "Send the type, quantity and your location on WhatsApp." },
  { title: "Confirm", body: "The team confirms numbers, price and timing." },
  { title: "Collect / delivery", body: "Delivered in KZN and the Eastern Cape, or collected." },
];

/** Buying process as a single editorial line (vertical list on mobile). */
export function BuyingSteps() {
  return (
    <ol className="grid border-t border-ink lg:grid-cols-4">
      {buyingSteps.map((s, i) => (
        <li key={s.title} className="border-b border-line py-5 lg:border-b-0 lg:py-6 lg:pr-8">
          <p className="flex items-center gap-3 font-serif text-2xl">
            <span className="sr-only">Step {i + 1}: </span>
            {s.title}
            {i < buyingSteps.length - 1 && <ArrowRight className="hidden size-5 text-muted lg:block" />}
          </p>
          <p className="mt-2 max-w-[16rem] text-[0.95rem] text-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Homepage: how buying works + where we deliver, in one section. */
export function BuyingDelivery() {
  return (
    <section aria-labelledby="buying-heading" className="py-20 md:py-32">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 id="buying-heading" className="text-4xl sm:text-5xl lg:col-span-5" data-reveal>
            Buying livestock
          </h2>
          <p className="max-w-md text-lg text-ink-soft lg:col-span-5 lg:col-start-8 lg:self-end">
            Browse current stock, contact the team and confirm collection or delivery. There is no online checkout.
          </p>
        </div>
        <div className="mt-12">
          <BuyingSteps />
        </div>

        <div className="mt-24 grid gap-12 border-t border-line pt-12 lg:mt-32 lg:grid-cols-12">
          <p className="font-serif text-[2.1rem] leading-[1.08] sm:text-5xl lg:col-span-8 lg:text-[3.4rem]" data-reveal>
            Delivery available across KwaZulu-Natal and into the Eastern Cape up to Mount Frere.
          </p>
          <div className="lg:col-span-3 lg:col-start-10">
            <dl className="space-y-6">
              <div>
                <dt className="font-semibold">Other provinces</dt>
                <dd className="mt-1 text-muted">Collection can be arranged using your own transport.</dd>
              </div>
              <div>
                <dt className="font-semibold">Outside South Africa</dt>
                <dd className="mt-1 text-muted">No cross-border sales. {deliveryFacts.certificate}</dd>
              </div>
            </dl>
            <Link href="/delivery" className="arrow-link mt-6 text-forest">
              Delivery information <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
