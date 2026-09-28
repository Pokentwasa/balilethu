import Link from "next/link";
import { site } from "@/config/site";
import { deliveryFacts } from "@/data/facts";
import { CoverageMap } from "./CoverageMap";
import { ArrowRight } from "./Icons";

export function DeliverySection({ headingLevel = "h2", showLink = true }: { headingLevel?: "h1" | "h2"; showLink?: boolean }) {
  const H = headingLevel;
  const rules = [
    { title: "Delivery", body: deliveryFacts.summary },
    { title: "Collection", body: deliveryFacts.otherProvinces },
    { title: "Minimum orders", body: "Minimum quantities can apply to some livestock and packages. Confirm the minimum for your order when you enquire." },
    { title: "Paperwork", body: deliveryFacts.certificate },
    { title: "No cross-border sales", body: `${deliveryFacts.crossBorder} ${deliveryFacts.fmd}` },
  ];
  return (
    <section aria-labelledby="delivery-heading" className="bg-sand py-20 md:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6" data-reveal>
          <H id="delivery-heading" className="text-[2.4rem] leading-[1.02] sm:text-5xl lg:text-6xl">
            Delivered in {site.delivery.provinces[0]} <em className="text-forest-soft">and the {site.delivery.provinces[1]}.</em>
          </H>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
            Buying from further away? You&apos;re welcome to — arrange your own transport and collect.
          </p>
          <div className="mt-10 rounded-sm bg-bone p-4 sm:p-6">
            <CoverageMap deliveryProvinces={site.delivery.provinces} />
          </div>
        </div>
        <div className="lg:col-span-6 lg:pt-4">
          <dl className="divide-y divide-ink/15 border-y border-ink/15">
            {rules.map((r, i) => (
              <div key={r.title} className="grid gap-2 py-6 sm:grid-cols-[11rem_1fr] sm:gap-6" data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
                <dt className="font-serif text-xl">{r.title}</dt>
                <dd className="leading-relaxed text-ink-soft">{r.body}</dd>
              </div>
            ))}
          </dl>
          {showLink && (
            <Link href="/delivery" className="mt-8 inline-flex items-center gap-2 font-semibold text-forest link-underline">
              Delivery details <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
