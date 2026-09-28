import type { MetadataRoute } from "next";
import { getCategories, getStock } from "@/lib/content";
import { categoryHref, stockHref } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, stock] = await Promise.all([getCategories(), getStock()]);
  const now = new Date();
  const staticPaths: [string, number][] = [
    ["/", 1],
    ["/livestock", 0.9],
    ["/poultry", 0.9],
    ["/enquire", 0.7],
    ["/starter-products", 0.7],
    ["/delivery", 0.7],
    ["/about", 0.5],
    ["/contact", 0.6],
  ];
  return [
    ...staticPaths.map(([p, priority]) => ({ url: absoluteUrl(p), lastModified: now, priority })),
    ...categories.map((c) => ({ url: absoluteUrl(categoryHref(c)), lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...stock.map((s) => ({ url: absoluteUrl(stockHref(s)), lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
