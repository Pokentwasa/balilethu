import type { Category, StockItem } from "@/lib/types";
import { PageHeader } from "../PageHeader";
import { StockCatalogue } from "../StockCatalogue";
import { StockCard } from "../StockCard";
import { CategoryCard } from "../CategoryCard";
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

      <section aria-label="Categories" className="pb-16">
        <ul className={`container-x grid grid-cols-2 gap-3 md:gap-4 ${categories.length > 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {categories.map((c, i) => (
            <li key={c.slug}>
              <CategoryCard category={c} index={i} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="catalogue-heading" id="stock" className="border-t border-tan py-16 md:py-24">
        <div className="container-x">
          <h2 id="catalogue-heading" className="mb-10 text-4xl sm:text-5xl">
            All listings
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
