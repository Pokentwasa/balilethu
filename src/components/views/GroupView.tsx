import type { Category, StockItem } from "@/lib/types";
import { PageHeader } from "../PageHeader";
import { StockCatalogue } from "../StockCatalogue";
import { StockCard } from "../StockCard";
import Link from "next/link";
import { categoryHref } from "@/lib/routes";
import { ArrowRight } from "../Icons";
import { CTASection } from "../CTASection";
import { MobileCtaBar } from "../MobileCtaBar";
import { JsonLd } from "../JsonLd";
import { itemListJsonLd } from "@/lib/seo";
import { stockHref } from "@/lib/routes";
import { quickEnquiryUrl } from "@/lib/whatsapp";

/** Hub page: category cards + filterable stock catalogue. */
export function GroupView({
  title,
  intro,
  crumbs,
  categories,
  filterCategories,
  items,
}: {
  title: React.ReactNode;
  intro: string;
  crumbs: { name: string; path: string }[];
  categories: Category[];
  filterCategories: Category[];
  items: StockItem[];
}) {
  return (
    <>
      <PageHeader title={title} intro={<p>{intro}</p>} crumbs={crumbs} />

      <nav aria-label="Categories" className="container-x">
        <ul className="flex flex-wrap gap-x-8 gap-y-2 border-y border-line py-4">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={categoryHref(c)} className="arrow-link font-serif text-2xl font-normal">
                {c.name} <ArrowRight className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section aria-labelledby="catalogue-heading" id="stock" className="py-16 md:py-24">
        <div className="container-x">
          <h2 id="catalogue-heading" className="sr-only">
            Listings
          </h2>
          <StockCatalogue
            categories={filterCategories.map((c) => ({ slug: c.slug, name: c.name, group: c.group }))}
            items={items.map((i) => ({ slug: i.slug, category: i.category, availability: i.availability }))}
          >
            {items.map((item) => (
              <StockCard key={item.slug} item={item} />
            ))}
          </StockCatalogue>
        </div>
      </section>

      <CTASection />
      <MobileCtaBar whatsappHref={quickEnquiryUrl()} secondary={{ label: "Build enquiry", href: "/enquire#enquiry" }} />
      <JsonLd data={itemListJsonLd(items.map((i) => ({ name: i.name, path: stockHref(i) })))} />
    </>
  );
}
