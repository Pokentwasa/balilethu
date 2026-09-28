/**
 * Content access layer. Every page reads through these functions.
 * They are async so a CMS client can replace the local data without
 * touching page code.
 */
import { categories } from "@/data/categories";
import { stock } from "@/data/stock";
import { starterProducts, testimonials } from "@/data/support";
import type { Category, CategoryGroup, CategorySlug, StockItem } from "./types";

export async function getCategories(group?: CategoryGroup): Promise<Category[]> {
  return group ? categories.filter((c) => c.group === group) : categories;
}

export async function getCategory(group: CategoryGroup, slug: string): Promise<Category | undefined> {
  return categories.find((c) => c.group === group && c.slug === slug);
}

export function getCategorySync(slug: CategorySlug): Category {
  const c = categories.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown category ${slug}`);
  return c;
}

export async function getStock(filter?: { category?: CategorySlug; group?: CategoryGroup }): Promise<StockItem[]> {
  return stock.filter((s) => {
    if (filter?.category && s.category !== filter.category) return false;
    if (filter?.group && getCategorySync(s.category).group !== filter.group) return false;
    return true;
  });
}

export async function getFeaturedStock(limit = 6): Promise<StockItem[]> {
  return stock.filter((s) => s.featured).slice(0, limit);
}

export async function getStockItem(category: string, slug: string): Promise<StockItem | undefined> {
  return stock.find((s) => s.category === category && s.slug === slug);
}

export async function getStarterProducts() {
  return starterProducts;
}

export async function getTestimonials() {
  return testimonials;
}
