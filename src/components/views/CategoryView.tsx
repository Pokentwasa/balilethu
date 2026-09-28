import Link from "next/link";
import type { Category, StockItem } from "@/lib/types";
import { categoryHref, enquireHref, stockHref } from "@/lib/routes";
import { formatRand } from "@/lib/format";
import { itemListJsonLd } from "@/lib/seo";
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

  const facts = [
    { label: "Pricing", value: category.fromPrice != null ? `From ${formatRand(category.fromPrice)}` : "On enquiry" },
    { label: "Minimum order", value: category.minimumOrder ?? "Confirmed on enquiry" },
    ...category.keyPoints.slice(0, 2),
  ];

  return (
    <>
      <header className="pt-24 md:pt-32">
        <div className="container-x">
          <Breadcrumbs items={[{ name: groupLabel, path: `/${category.group}` }, { name: category.name, path: categoryHref(category) }]} />
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <h1 className="text-[3.2rem] leading-[0.92] sm:text-7xl lg:col-span-7 lg:text-[6.5rem]" data-reveal>
              {category.heading}
            </h1>
            <div className="space-y-4 text-lg text-ink-soft lg:col-span-4 lg:col-start-9">
              {category.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-6 border-t border-ink md:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="border-b border-line py-4 md:border-b-0 md:py-5">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="mt-1 font-serif text-xl leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mt-6 md:mt-10" data-reveal="clip">
        <Media
          image={category.image}
          plateText={category.name}
          sizes="100vw"
          priority
          className="aspect-[4/3] sm:aspect-[21/9]"
        />
      </div>

      <nav aria-label={`${groupLabel} categories`} className="sticky top-16 z-30 border-b border-line bg-bone/95 backdrop-blur-md lg:top-[4.5rem]">
        <ul className="container-x flex gap-7 overflow-x-auto [scrollbar-width:none]">
          {siblings.map((s) => (
            <li key={s.slug} className="shrink-0">
              <Link
                href={categoryHref(s)}
                aria-current={s.slug === category.slug ? "page" : undefined}
                className={`flex min-h-12 items-center border-b-2 text-[0.95rem] ${
                  s.slug === category.slug ? "border-forest text-ink" : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section aria-labelledby="current-stock" className="py-16 md:py-28">
        <div className="container-x">
          <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
            <h2 id="current-stock" className="text-4xl sm:text-5xl lg:col-span-7">
              Current {category.name.toLowerCase()} listings
            </h2>
            <p className="max-w-sm text-muted lg:col-span-4 lg:col-start-9">
              Stock changes with each intake. Availability and price are confirmed when you enquire.
            </p>
          </div>
          <ul className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li key={item.slug}>
                <StockCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="know-heading" className="border-t border-line py-16 md:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="know-heading" className="text-4xl sm:text-5xl">
              Before you buy
            </h2>
            <dl className="mt-10 border-t border-ink">
              {category.keyPoints.map((k) => (
                <div key={k.label} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-4">
                  <dt className="text-muted">{k.label}</dt>
                  <dd>{k.value}</dd>
                </div>
              ))}
              {category.knownTypes.length > 0 && (
                <div className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-4">
                  <dt className="text-muted">Recent types</dt>
                  <dd>{category.knownTypes.join(", ")}</dd>
                </div>
              )}
              <div className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-4">
                <dt className="text-muted">Delivery</dt>
                <dd>
                  {deliveryFacts.summary} {deliveryFacts.otherProvinces}
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href={enquiry} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <WhatsAppIcon className="size-5" /> Enquire about {category.name.toLowerCase()}
              </a>
              <Link href="/delivery" className="arrow-link text-forest">
                Delivery information <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="mb-8 text-3xl sm:text-4xl">Questions about {category.name.toLowerCase()}</h2>
            <Faq faqs={category.faqs} />
          </div>
        </div>
      </section>

      <nav aria-labelledby="related-heading" className="border-t border-line py-12">
        <div className="container-x flex flex-wrap items-baseline gap-x-8 gap-y-3">
          <h2 id="related-heading" className="text-muted">
            Also available
          </h2>
          {siblings
            .filter((s) => s.slug !== category.slug)
            .map((s) => (
              <Link key={s.slug} href={categoryHref(s)} className="arrow-link font-serif text-2xl font-normal">
                {s.name} <ArrowRight className="size-4" />
              </Link>
            ))}
          <Link href={enquireHref({ category: category.slug })} className="arrow-link text-forest lg:ml-auto">
            Build a detailed enquiry <ArrowRight className="size-4" />
          </Link>
        </div>
      </nav>

      <CTASection heading={`Looking for ${category.name.toLowerCase()}?`} subject={category.name} />
      <MobileCtaBar whatsappHref={enquiry} secondary={{ label: "Enquiry form", href: enquireHref({ category: category.slug }) }} />
      <JsonLd data={itemListJsonLd(items.map((i) => ({ name: i.name, path: stockHref(i) })))} />
    </>
  );
}
