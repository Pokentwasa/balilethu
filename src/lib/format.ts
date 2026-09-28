import type { Availability, StockItem } from "./types";

const zar = new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 });

export function formatRand(value: number): string {
  // Intl gives "R 1 300" with a narrow no-break space; normalise spacing.
  return zar.format(value).replace(/\s/g, " ").replace(/^R /, "R");
}

export function priceLabel(item: Pick<StockItem, "price" | "priceQualifier">): { main: string; note: string | null } {
  if (item.price == null) return { main: "Price on enquiry", note: "Confirmed with current stock" };
  return { main: formatRand(item.price), note: item.priceQualifier };
}

export const availabilityLabel: Record<Availability, string> = {
  available: "Available",
  limited: "Limited",
  enquire: "Enquire",
  "sold-out": "Sold out",
};
