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
      <div className="container-x pt-24 md:pt-28">
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
              <Media image={null} plateText={item.name} sizes="(min-width: 1024px) 58vw, 100vw" priority className="aspect-[4/3]" />
            }
          />
        </div>

        <div className="order-3 lg:col-span-7 lg:row-start-2">
          <section aria-labelledby="about-heading" className="lg:mt-16">
            <h2 id="about-heading" className="text-3xl sm:text-4xl">About this stock</h2>
            <div className="mt-5 max-w-2xl space-y-4 text-lg text-ink-soft">
              {item.longDescription.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="notes-heading" className="mt-14">
            <h2 id="notes-heading" className="text-3xl sm:text-4xl">Before you purchase</h2>
            <ul className="mt-6 max-w-2xl border-t border-ink">
              {notes.map((n) => (
                <li key={n} className="border-b border-line py-3 text-ink-soft">
                  {n}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="faq-heading" className="mt-14">
            <h2 id="faq-heading" className="mb-6 text-3xl sm:text-4xl">Questions about {category.name.toLowerCase()}</h2>
            <Faq faqs={category.faqs} />
          </section>
        </div>

        <aside className="order-2 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
          <div className="lg:sticky lg:top-28">
            <p className="label-sm text-muted">
              <Link href={categoryHref(category)} className="link-underline">
                {category.name}
              </Link>
              <span className="mx-1 text-line">/</span> {item.breed}
            </p>
            <h1 className="mt-4 text-[2.8rem] leading-[0.98] sm:text-6xl">{item.name}</h1>
            <p className="mt-4 text-lg text-ink-soft">{item.shortDescription}</p>

            <div className="mt-8 border-t border-ink pt-5">
              <p className="text-sm text-muted">Price</p>
              <p className="mt-1 font-serif text-4xl">{price.main}</p>
              {price.note && <p className="mt-1 text-sm text-muted">{price.note}</p>}
            </div>
            <dl className="mt-5 border-t border-line">
              {specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 border-b border-line py-3">
                  <dt className="text-muted">{s.label}</dt>
                  <dd className="text-right">{s.value}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4 border-b border-line py-3">
                <dt className="text-muted">Delivery</dt>
                <dd className="text-right">KZN + Eastern Cape, or collection</dd>
              </div>
            </dl>
            <AvailabilityBadge availability={item.availability} className="mt-5" />

            <a href={enquiry} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8 w-full">
              <WhatsAppIcon className="size-5" /> Enquire about this livestock
            </a>
            <div className="mt-3 flex flex-wrap gap-x-8">
              <Link href={enquireHref({ category: category.slug, item: item.slug })} className="arrow-link text-sm text-forest">
                Add quantity &amp; location <ArrowRight className="size-4" />
              </Link>
              <Link href="/delivery" className="arrow-link text-sm text-forest">
                Delivery information <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </aside>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-stock" className="border-t border-line py-16 md:py-28">
          <div className="container-x">
            <h2 id="related-stock" className="text-4xl sm:text-5xl">More {category.name.toLowerCase()}</h2>
            <ul className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
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
