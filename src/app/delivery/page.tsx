import { pageMetadata } from "@/lib/seo";
import { deliveryFacts } from "@/data/facts";
import { PageHeader } from "@/components/PageHeader";
import { Media } from "@/components/Media";
import { Faq } from "@/components/Faq";
import { BuyingSteps } from "@/components/BuyingDelivery";
import { CTASection } from "@/components/CTASection";

export const metadata = pageMetadata({
  title: "Livestock Delivery in KZN & the Eastern Cape",
  description:
    "Balilethu Livestock delivers in KwaZulu-Natal and the Eastern Cape (up to Mount Frere). Collection with own transport from other provinces. No export sales.",
  path: "/delivery",
});

const rules = [
  { title: "Delivery", body: deliveryFacts.summary },
  { title: "Other provinces", body: deliveryFacts.otherProvinces },
  { title: "Minimum orders", body: "Minimum quantities can apply to some livestock and packages. Confirm the minimum for your order when you enquire." },
  { title: "Paperwork", body: deliveryFacts.certificate },
  { title: "Outside South Africa", body: `${deliveryFacts.crossBorder} ${deliveryFacts.fmd}` },
];

const faqs = [
  { question: "Which areas do you deliver to?", answer: deliveryFacts.summary },
  { question: "I'm in another province. Can I still buy?", answer: deliveryFacts.otherProvinces },
  { question: "Do you deliver to neighbouring countries?", answer: deliveryFacts.crossBorder },
  { question: "What paperwork do I get?", answer: deliveryFacts.certificate },
  { question: "Why can't livestock be exported?", answer: deliveryFacts.fmd },
];

export default function DeliveryPage() {
  return (
    <>
      <PageHeader
        title="Delivery & collection"
        intro={<p>{deliveryFacts.summary} Collection for everyone else.</p>}
        crumbs={[{ name: "Delivery", path: "/delivery" }]}
      />

      <div data-reveal="clip">
        <Media image={null} slot="categories/goats" alt="Herd of goats behind a wire fence" sizes="100vw" priority className="aspect-[4/3] sm:aspect-[21/9]" />
      </div>

      <section aria-labelledby="where-heading" className="py-20 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <h2 id="where-heading" className="font-serif text-[2.2rem] leading-[1.06] sm:text-5xl lg:col-span-7 lg:text-[3.4rem]" data-reveal>
            Delivery available across KwaZulu-Natal and into the Eastern Cape up to Mount Frere.
          </h2>
          <dl className="border-t border-ink lg:col-span-4 lg:col-start-9">
            {rules.map((r) => (
              <div key={r.title} className="border-b border-line py-5">
                <dt className="font-semibold">{r.title}</dt>
                <dd className="mt-1 text-muted">{r.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="process-heading" className="border-t border-line py-16 md:py-24">
        <div className="container-x">
          <h2 id="process-heading" className="mb-10 text-3xl sm:text-4xl">
            From enquiry to delivery
          </h2>
          <BuyingSteps />
        </div>
      </section>

      <section aria-labelledby="delivery-faq" className="border-t border-line py-16 md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 id="delivery-faq" className="text-3xl sm:text-4xl lg:col-span-4">
            Delivery questions
          </h2>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq faqs={faqs} />
          </div>
        </div>
      </section>

      <CTASection heading="Check delivery for your area" copy="Send your location and what you need. The team will confirm delivery or collection." subject="Delivery to my area" />
    </>
  );
}
