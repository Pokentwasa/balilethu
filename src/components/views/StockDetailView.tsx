import Link from "next/link";
import type { Category, StockItem } from "@/lib/types";
import { categoryHref, enquireHref, stockHref } from "@/lib/routes";
import { priceLabel } from "@/lib/format";
import { productJsonLd } from "@/lib/seo";
import { buildEnquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { deliveryFacts } from "@/data/facts";
import { Breadcrumbs } from "../Breadcrumbs";
import { AvailabilityBadge } from "../AvailabilityBadge";
import { StockGallery } from "../StockGallery";
import { Media } from "../Media";
import { StockCard } from "../StockCard";
import { Faq } from "../Faq";
import { JsonLd } from "../JsonLd";
import { MobileCtaBar } from "../MobileCtaBar";
import { WhatsAppIcon, ArrowRight } from "../Icons";

export function StockDetailView({ item, category, related }: { item: StockItem; category: Category; related: StockItem[] }) {
  const groupLabel = category.group === "livestock" ? "Livestock" : "Poultry";
  const path = stockHref(item);
  const price = priceLabel(item);
  const enquiry = whatsappUrl(buildEnquiryMessage({ livestock: category.name, item: item.name }));

  const specs = [
    { label: "Breed / type", value: item.breed },
    { label: "Age", value: item.age ?? "Confirmed on enquiry" },
    { label: "Weight", value: item.weight ?? "Confirmed on enquiry" },
    { label: "Minimum order", value: item.minimumOrder ?? "Confirmed on enquiry" },
    { label: "Location", value: item.location ?? "Confirmed on enquiry" },
  ];

  const notes = [
    "Prices and numbers are confirmed against current stock before you pay.",
    "Tell us your location so we can confirm delivery or collection.",
    deliveryFacts.certificate,
    deliveryFacts.crossBorder,
  ];

  return (
    <>
      <div className="container-x pt-28 md:pt-32">
        <Breadcrumbs
          items={[
            { name: groupLabel, path: `/${category.group}` },
            { name: category.name, path: categoryHref(category) },
            { name: item.name, path },
          ]}
        />
      </div>

      <article className="container-x mt-8 grid gap-10 pb-20 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-0">
        <div className="order-1 lg:col-span-7 lg:row-start-1">
          <StockGallery
            images={item.images}
            fallback={
              <Media image={null} sizes="(min-width: 1024px) 58vw, 100vw" priority className="aspect-[4/3]" />
            }
          />
        </div>

        <div className="order-3 lg:col-span-7 lg:row-start-2">
          <section aria-labelledby="about-heading" className="lg:mt-14">
            <h2 id="about-heading" className="text-3xl sm:text-4xl">About this stock</h2>
            <div className="mt-5 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-soft">
              {item.longDescription.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="notes-heading" className="mt-14">
            <h2 id="notes-heading" className="text-3xl sm:text-4xl">Before you purchase</h2>
            <ul className="mt-6 border-t border-tan">
              {notes.map((n) => (
                <li key={n} className="border-b border-tan py-3 leading-relaxed text-ink-soft">
                  {n}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="faq-heading" className="mt-14">
            <h2 id="faq-heading" className="mb-6 text-3xl sm:text-4xl">{category.name}: common questions</h2>
            <Faq faqs={category.faqs} />
          </section>
        </div>

        <aside className="order-2 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
          <div className="lg:sticky lg:top-28">
            <Link href={categoryHref(category)} className="text-[0.95rem] text-muted underline underline-offset-4">
              {category.name}
            </Link>
            <h1 className="mt-4 text-[2.6rem] leading-[1.02] font-light sm:text-6xl">{item.name}</h1>
            <AvailabilityBadge availability={item.availability} className="mt-3" />
            <p className="mt-4 text-lg leading-relaxed text-muted">{item.shortDescription}</p>

            <div className="mt-8 border-t border-tan pt-5">
              <p className="text-sm text-muted">Price</p>
              <p className="mt-1 font-serif text-4xl">
                {price.main}
                {price.note && <span className="mt-1 block font-sans text-sm text-muted">{price.note}</span>}
              </p>
              <dl className="mt-6 divide-y divide-tan border-t border-tan text-sm">
                {specs.map((s) => (
                  <div key={s.label} className="flex justify-between gap-4 py-3">
                    <dt className="text-muted">{s.label}</dt>
                    <dd className="text-right font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <a href={enquiry} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6 w-full">
                <WhatsAppIcon className="size-5" /> Enquire about this livestock
              </a>
              <Link href={enquireHref({ category: category.slug, item: item.slug })} className="arrow-link mt-2 text-forest">
                Add quantity &amp; location <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-8 border-t border-tan pt-5">
              <h2 className="font-serif text-xl">Delivery</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.deliveryNotes ?? deliveryFacts.summary}</p>
              <Link href="/delivery" className="arrow-link mt-1 text-forest">
                Delivery information <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </aside>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-stock" className="border-t border-tan py-16 md:py-24">
          <div className="container-x">
            <h2 id="related-stock" className="text-4xl">More {category.name.toLowerCase()}</h2>
            <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <StockCard item={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <MobileCtaBar whatsappHref={enquiry} label="Enquire on WhatsApp" />
      <JsonLd data={productJsonLd(item, category, path)} />
    </>
  );
}
