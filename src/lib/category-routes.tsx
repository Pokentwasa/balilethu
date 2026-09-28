/**
 * Shared route handlers for /livestock/[category] and /poultry/[category]
 * (plus their [slug] detail pages), so both groups stay in sync.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CategoryGroup } from "./types";
import { getCategories, getCategory, getStock, getStockItem } from "./content";
import { categoryHref, stockHref } from "./routes";
import { pageMetadata } from "./seo";
import { CategoryView } from "@/components/views/CategoryView";
import { StockDetailView } from "@/components/views/StockDetailView";

type CategoryParams = { params: Promise<{ category: string }> };
type ItemParams = { params: Promise<{ category: string; slug: string }> };

export function categoryRoute(group: CategoryGroup) {
  return {
    async generateStaticParams() {
      return (await getCategories(group)).map((c) => ({ category: c.slug }));
    },
    async generateMetadata({ params }: CategoryParams): Promise<Metadata> {
      const c = await getCategory(group, (await params).category);
      if (!c) return {};
      return pageMetadata({ title: c.seo.title, description: c.seo.description, path: categoryHref(c) });
    },
    async Page({ params }: CategoryParams) {
      const category = await getCategory(group, (await params).category);
      if (!category) notFound();
      const [items, siblings] = await Promise.all([getStock({ category: category.slug }), getCategories(group)]);
      return <CategoryView category={category} items={items} siblings={siblings} />;
    },
  };
}

export function stockItemRoute(group: CategoryGroup) {
  return {
    async generateStaticParams() {
      const items = await getStock({ group });
      return items.map((i) => ({ category: i.category, slug: i.slug }));
    },
    async generateMetadata({ params }: ItemParams): Promise<Metadata> {
      const { category, slug } = await params;
      const item = await getStockItem(category, slug);
      const c = await getCategory(group, category);
      if (!item || !c) return {};
      return pageMetadata({
        title: item.seoTitle ?? `${item.name} for Sale`,
        description:
          item.seoDescription ??
          `${item.name} (${item.breed}) from Balilethu Livestock. ${item.shortDescription} Delivery in KZN and the Eastern Cape. Enquire on WhatsApp for current price and availability.`,
        path: stockHref(item),
        image: item.images[0]?.src,
      });
    },
    async Page({ params }: ItemParams) {
      const { category: cat, slug } = await params;
      const category = await getCategory(group, cat);
      const item = await getStockItem(cat, slug);
      if (!category || !item) notFound();
      const related = (await getStock({ category: category.slug })).filter((s) => s.slug !== item.slug).slice(0, 3);
      return <StockDetailView item={item} category={category} related={related} />;
    },
  };
}
