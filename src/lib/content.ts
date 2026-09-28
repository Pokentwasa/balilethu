/**
 * Content access layer. Every page reads through these functions.
 * They are async so a CMS client can replace the local data without
 * touching page code.
 */
import { categories } from "@/data/categories";
import { stock } from "@/data/stock";
import { starterProducts, testimonials } from "@/data/support";
import type { Category, CategoryGroup, CategorySlug, StockItem } from "./types";
import { findImage, findImages } from "./images";

// Photos dropped into /public/images are used when the data has none
// (see public/images/README.md).
function withCategoryImage(c: Category): Category {
  return c.image ? c : { ...c, image: findImage(`categories/${c.slug}`, `${c.name} — Balilethu Livestock`) };
}

function withStockImages(s: StockItem): StockItem {
  return s.images.length ? s : { ...s, images: findImages(`stock/${s.slug}`, `${s.name} — Balilethu Livestock`) };
}

export async function getCategories(group?: CategoryGroup): Promise<Category[]> {
  return (group ? categories.filter((c) => c.group === group) : categories).map(withCategoryImage);
}

export async function getCategory(group: CategoryGroup, slug: string): Promise<Category | undefined> {
  const c = categories.find((x) => x.group === group && x.slug === slug);
  return c && withCategoryImage(c);
}

export function getCategorySync(slug: CategorySlug): Category {
  const c = categories.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown category ${slug}`);
  return c;
}

export async function getStock(filter?: { category?: CategorySlug; group?: CategoryGroup }): Promise<StockItem[]> {
  return stock
    .filter((s) => {
      if (filter?.category && s.category !== filter.category) return false;
      if (filter?.group && getCategorySync(s.category).group !== filter.group) return false;
      return true;
    })
    .map(withStockImages);
}

export async function getFeaturedStock(limit = 6): Promise<StockItem[]> {
  return stock.filter((s) => s.featured).slice(0, limit).map(withStockImages);
}

export async function getStockItem(category: string, slug: string): Promise<StockItem | undefined> {
  const s = stock.find((x) => x.category === category && x.slug === slug);
  return s && withStockImages(s);
}

export async function getStarterProducts() {
  return starterProducts;
}

export async function getTestimonials() {
  return testimonials;
}
