import type { Category, CategorySlug, StockItem } from "./types";
import { getCategorySync } from "./content";

export function categoryHref(c: Pick<Category, "group" | "slug">): string {
  return `/${c.group}/${c.slug}`;
}

export function stockHref(item: Pick<StockItem, "category" | "slug">): string {
  const c = getCategorySync(item.category as CategorySlug);
  return `/${c.group}/${c.slug}/${item.slug}`;
}

export function enquireHref(params: { category?: string; item?: string } = {}): string {
  const q = new URLSearchParams();
  if (params.category) q.set("type", params.category);
  if (params.item) q.set("item", params.item);
  const s = q.toString();
  return `/enquire${s ? `?${s}` : ""}#enquiry`;
}
