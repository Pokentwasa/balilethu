import Link from "next/link";
import type { Category, StockItem } from "@/lib/types";
import { categoryHref, enquireHref } from "@/lib/routes";
import { formatRand } from "@/lib/format";
import { itemListJsonLd } from "@/lib/seo";
import { stockHref } from "@/lib/routes";
import { buildEnquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { deliveryFacts } from "@/data/facts";
import { Breadcrumbs } from "../Breadcrumbs";
import { Media } from "../Media";
import { StockCard } from "../StockCard";
import { Faq } from "../Faq";
import { JsonLd } from "../JsonLd";
import { MobileCtaBar } from "../MobileCtaBar";
import { CTASection } from "../CTASection";
import { ArrowRight, WhatsAppIcon } from "../Icons";

export function CategoryView({
  category,
  items,
  siblings,
}: {
  category: Category;
  items: StockItem[];
  siblings: Category[];
}) {
  const groupLabel = category.group === "livestock" ? "Livestock" : "Poultry";
  const enquiry = whatsappUrl(buildEnquiryMessage({ livestock: category.name }));

  return (
    <>
      {/* Header */}
      <header className="pt-28 md:pt-36">
        <div className="container-x">
          <Breadcrumbs items={[{ name: groupLabel, path: `/${category.group}` }, { name: category.name, path: categoryHref(category) }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h1 className="text-[3rem] leading-[0.95] font-light sm:text-7xl lg:text-[6.25rem]">{category.heading}</h1>
            </div>
            <div className="space-y-4 text-lg leading-relaxed text-muted lg:col-span-5 lg:pb-2">
              {category.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          {/* Key facts strip */}
          <dl className="mt-12 grid grid-cols-2 border-y border-line md:grid-cols-4">
            <Fact label="Pricing" value={category.fromPrice != null ? `From ${formatRand(category.fromPrice)}` : "Price on enquiry"} />
            <Fact label="Minimum order" value={category.minimumOrder ?? "Confirmed on enquiry"} />
            {category.keyPoints.slice(0, 2).map((k) => (
              <Fact key={k.label} label={k.label} value={k.value} />
            ))}
          </dl>
        </div>
      </header>

      <div className="container-x mt-10">
        <div className="overflow-hidden rounded-sm" data-reveal="clip">
          <Media
            image={category.image}
            seed={`cat-${category.slug}`}
            sizes="100vw"
            priority
            className="aspect-[4/3] sm:aspect-[21/9]"
            caption={`${category.name} — hero`}
          />
        </div>
      </div>

      {/* Sticky category nav */}
      <nav aria-label={`${groupLabel} categories`} className="sticky top-[4.5rem] z-30 mt-12 border-y border-line bg-bone/95 backdrop-blur-md lg:top-20">
        <ul className="container-x flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
          {siblings.map((s) => (
            <li key={s.slug} className="shrink-0">
              <Link
                href={categoryHref(s)}
                aria-current={s.slug === category.slug ? "page" : undefined}
                className={`flex min-h-11 items-center rounded-sm px-4 text-sm font-medium ${
                  s.slug === category.slug ? "bg-forest text-bone" : "hover:bg-sand"
                }`}
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Current stock */}
      <section aria-labelledby="current-stock" className="py-16 md:py-24">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 id="current-stock" className="text-4xl sm:text-5xl">
                {category.name} listings
              </h2>
            </div>
            <p className="max-w-md text-muted">
              Availability and prices are confirmed on enquiry; stock changes with each intake. Photos are illustrative.
            </p>
          </div>
          <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li key={item.slug}>
                <StockCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Details + delivery + FAQ */}
      <section aria-labelledby="know-heading" className="bg-paper py-16 md:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="know-heading" className="text-4xl sm:text-5xl">
              Before you buy {category.name.toLowerCase()}
            </h2>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {category.keyPoints.map((k) => (
                <div key={k.label} className="grid grid-cols-[8rem_1fr] gap-4 py-4">
                  <dt className="text-sm text-muted">{k.label}</dt>
                  <dd className="font-medium">{k.value}</dd>
                </div>
              ))}
              {category.knownTypes.length > 0 && (
                <div className="grid grid-cols-[8rem_1fr] gap-4 py-4">
                  <dt className="text-sm text-muted">Recent types</dt>
                  <dd className="font-medium">{category.knownTypes.join(", ")}</dd>
                </div>
              )}
            </dl>

            <div className="mt-10 rounded-sm bg-sand p-6">
              <h3 className="font-serif text-2xl">Delivery note</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">
                {deliveryFacts.summary} {deliveryFacts.otherProvinces}
              </p>
              <Link href="/delivery" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest link-underline">
                Delivery details <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={enquiry} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <WhatsAppIcon className="size-5" /> Enquire about {category.name.toLowerCase()}
              </a>
              <Link href={enquireHref({ category: category.slug })} className="btn btn-outline text-forest">
                Build an enquiry
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="mb-6 text-3xl sm:text-4xl">Common questions</h2>
            <Faq faqs={category.faqs} />
          </div>
        </div>
      </section>

      {/* Related categories — internal links */}
      <section aria-labelledby="related-heading" className="py-16">
        <div className="container-x">
          <h2 id="related-heading" className="eyebrow mb-6 text-muted">
            Also available
          </h2>
          <ul className="flex flex-wrap gap-2">
            {siblings
              .filter((s) => s.slug !== category.slug)
              .map((s) => (
                <li key={s.slug}>
                  <Link href={categoryHref(s)} className="inline-flex min-h-12 items-center gap-2 rounded-sm border border-line bg-paper px-5 font-serif text-lg hover:border-forest/40">
                    {s.name} <ArrowRight className="size-4 text-clay" />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <CTASection heading={`Looking for ${category.name.toLowerCase()}?`} subject={category.name} />
      <MobileCtaBar whatsappHref={enquiry} secondary={{ label: "Build enquiry", href: enquireHref({ category: category.slug }) }} />
      <JsonLd data={itemListJsonLd(items.map((i) => ({ name: i.name, path: stockHref(i) })))} />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-line py-5 pr-4 odd:border-r md:border-r md:px-5 md:first:pl-0 md:last:border-r-0 [&:nth-child(n+3)]:border-t md:[&:nth-child(n+3)]:border-t-0 [&:nth-child(even)]:pl-4">
      <dt className="text-xs tracking-wide text-muted uppercase">{label}</dt>
      <dd className="mt-1 font-serif text-lg leading-snug sm:text-xl">{value}</dd>
    </div>
  );
}
