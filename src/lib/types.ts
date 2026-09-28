/**
 * Content model for the Balilethu Livestock catalogue.
 *
 * These types mirror the shape a headless CMS (Sanity, Payload, Contentful…)
 * would return. Pages only ever read content through `src/lib/content.ts`,
 * so swapping the local data files for a CMS is a change in one place.
 */

export type CategoryGroup = "livestock" | "poultry";

export type CategorySlug =
  | "calves"
  | "cattle"
  | "sheep"
  | "goats"
  | "layers"
  | "broilers"
  | "day-old-chicks";

export type Availability = "available" | "limited" | "enquire" | "sold-out";

export interface StockImage {
  /** Path under /public or an allowed remote URL. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** True when the photo is representative, not the actual animal for sale. */
  illustrative?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Category {
  slug: CategorySlug;
  group: CategoryGroup;
  /** Display name, e.g. "Calves". */
  name: string;
  /** Singular noun used in enquiry copy, e.g. "calf". */
  singular: string;
  /** One-line supporting copy for category cards. */
  tagline: string;
  /** H1 on the category page. */
  heading: string;
  /** Intro paragraph(s) on the category page. */
  intro: string[];
  /** Breed / type names confirmed for this category (may be empty). */
  knownTypes: string[];
  /** Short, factual points shown as "What to know". */
  keyPoints: { label: string; value: string }[];
  /** Lowest current price in rand, or null when not confirmed. */
  fromPrice: number | null;
  /** Minimum order text, or null when not confirmed. */
  minimumOrder: string | null;
  faqs: FaqItem[];
  image: StockImage | null;
  seo: { title: string; description: string };
}

export interface StockItem {
  name: string;
  slug: string;
  category: CategorySlug;
  breed: string;
  shortDescription: string;
  /** Paragraphs. */
  longDescription: string[];
  /** Price in rand, or null when price is given on enquiry. */
  price: number | null;
  /** e.g. "each", "per package", "from". */
  priceQualifier: string | null;
  /** e.g. "10 calves", or null when not confirmed. */
  minimumOrder: string | null;
  availability: Availability;
  featured: boolean;
  images: StockImage[];
  age: string | null;
  weight: string | null;
  location: string | null;
  deliveryNotes: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface StarterProduct {
  slug: string;
  name: string;
  description: string;
  /** Categories this product supports. */
  relatesTo: CategorySlug[];
  /** false = item suggested by the brief but not yet confirmed by Balilethu. */
  confirmed: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  location: string | null;
  purchase: string | null;
  image: StockImage | null;
}
