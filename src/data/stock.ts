import type { StockItem } from "@/lib/types";
import { deliveryFacts } from "./facts";

/**
 * Stock listings. In production these come from the CMS; this file is the
 * local stand-in and uses the same shape.
 *
 * Prices and minimum orders are null until Balilethu confirms current figures.
 * Previously published figures are noted in comments for the client to confirm
 * — do not uncomment them without confirmation (price lists expire).
 * Availability is "enquire" everywhere until a live stock count exists.
 */

const deliveryNote = `${deliveryFacts.summary} Other provinces: own transport for collection.`;

type Draft = Omit<StockItem, "images" | "location" | "deliveryNotes" | "seoTitle" | "seoDescription" | "longDescription"> &
  Partial<Pick<StockItem, "images" | "location" | "deliveryNotes" | "seoTitle" | "seoDescription" | "longDescription">>;

function item(d: Draft): StockItem {
  return {
    images: [],
    location: null,
    deliveryNotes: deliveryNote,
    seoTitle: null,
    seoDescription: null,
    longDescription: [d.shortDescription],
    ...d,
  };
}

export const stock: StockItem[] = [
  // ── Calves ────────────────────────────────────────────────
  item({
    name: "Hereford cross calves",
    slug: "hereford-cross-calves",
    category: "calves",
    breed: "Hereford cross",
    shortDescription: "Hereford-cross heifers and bulls.",
    longDescription: [
      "Hereford-cross heifer and bull calves, suited to buyers growing out beef animals or starting a small herd.",
      "Tell us how many heifers and bulls you need. We'll confirm current numbers, ages and pricing before you commit.",
    ],
    price: null, // previously listed at R1 300 each — confirm
    priceQualifier: "each",
    minimumOrder: null, // previously "10 calves" — confirm
    availability: "enquire",
    featured: true,
    age: null,
    weight: null,
  }),
  item({
    name: "Angus cross calves",
    slug: "angus-cross-calves",
    category: "calves",
    breed: "Angus cross",
    shortDescription: "Angus-cross heifers and bulls.",
    longDescription: [
      "Angus-cross heifer and bull calves for beef production and herd building.",
      "Enquire with your preferred mix of heifers and bulls and we'll confirm what is available.",
    ],
    price: null, // previously listed at R1 300 each — confirm
    priceQualifier: "each",
    minimumOrder: null,
    availability: "enquire",
    featured: true,
    age: null,
    weight: null,
  }),
  item({
    name: "Bonsmara cross calves",
    slug: "bonsmara-cross-calves",
    category: "calves",
    breed: "Bonsmara cross",
    shortDescription: "Bonsmara-cross heifers and bulls.",
    longDescription: [
      "Bonsmara-cross heifer and bull calves.",
      "Enquire for current numbers, ages and pricing.",
    ],
    price: null, // previously listed at R1 300 each — confirm
    priceQualifier: "each",
    minimumOrder: null,
    availability: "enquire",
    featured: false,
    age: null,
    weight: null,
  }),
  item({
    name: "Beefmaster & Charolais cross calves",
    slug: "beefmaster-charolais-cross-calves",
    category: "calves",
    breed: "Beefmaster cross / Charolais cross",
    shortDescription: "Beefmaster-cross and Charolais-cross calves when in stock.",
    longDescription: [
      "Beefmaster-cross and Charolais-cross calves are supplied when available.",
      "Ask which of these are in the current intake.",
    ],
    price: null,
    priceQualifier: "each",
    minimumOrder: null,
    availability: "enquire",
    featured: false,
    age: null,
    weight: null,
  }),
  item({
    name: "Holstein cross bull calves",
    slug: "holstein-cross-bull-calves",
    category: "calves",
    breed: "Holstein / dairy cross",
    shortDescription: "Dairy-cross bull calves — an accessible way to start raising calves.",
    longDescription: [
      "Holstein (dairy) cross bull calves. Dairy-cross bulls are often the entry point for people new to raising calves.",
      "Young calves may still need milk feeding — ask about the calves' current feeding stage when you enquire.",
    ],
    price: null, // previously listed at R550 each; 10-calf package R5 500 — confirm
    priceQualifier: "each",
    minimumOrder: null,
    availability: "enquire",
    featured: true,
    age: null,
    weight: null,
  }),

  // ── Cattle ────────────────────────────────────────────────
  item({
    name: "Nguni pregnant cows",
    slug: "nguni-pregnant-cows",
    category: "cattle",
    breed: "Nguni (pure)",
    shortDescription: "Pure Nguni cows in calf.",
    longDescription: [
      "Pure Nguni cows, sold pregnant, for buyers building a breeding herd.",
      "Enquire for current numbers and pricing.",
    ],
    price: null,
    priceQualifier: "each",
    minimumOrder: null,
    availability: "enquire",
    featured: true,
    age: null,
    weight: null,
  }),
  item({
    name: "Brahman cows",
    slug: "brahman-cows",
    category: "cattle",
    breed: "Brahman",
    shortDescription: "Brahman cows for breeding.",
    longDescription: ["Brahman cows for breeding herds.", "Enquire for current availability and pricing."],
    price: null,
    priceQualifier: "each",
    minimumOrder: null,
    availability: "enquire",
    featured: false,
    age: null,
    weight: null,
  }),

  // ── Sheep ─────────────────────────────────────────────────
  item({
    name: "Breeding sheep",
    slug: "breeding-sheep",
    category: "sheep",
    breed: "Breeding sheep",
    shortDescription: "Sheep for breeding flocks.",
    longDescription: ["Breeding sheep for new or growing flocks.", "Enquire with the number of ewes and rams you need."],
    price: null,
    priceQualifier: "each",
    minimumOrder: null,
    availability: "enquire",
    featured: true,
    age: null,
    weight: null,
  }),
  item({
    name: "Lambs",
    slug: "lambs",
    category: "sheep",
    breed: "Lambs",
    shortDescription: "Lambs supplied in season.",
    longDescription: ["Lambs, subject to availability.", "Enquire for current numbers."],
    price: null,
    priceQualifier: "each",
    minimumOrder: null,
    availability: "enquire",
    featured: false,
    age: null,
    weight: null,
  }),

  // ── Goats ─────────────────────────────────────────────────
  item({
    name: "Goats",
    slug: "goats-on-enquiry",
    category: "goats",
    breed: "Breed on enquiry",
    shortDescription: "Goats supplied on enquiry.",
    longDescription: ["Goats are supplied on enquiry. Tell us the number of animals and what they are for."],
    price: null,
    priceQualifier: "each",
    minimumOrder: null,
    availability: "enquire",
    featured: false,
    age: null,
    weight: null,
  }),

  // ── Poultry ───────────────────────────────────────────────
  item({
    name: "Lohmann Brown layers",
    slug: "lohmann-brown-layers",
    category: "layers",
    breed: "Lohmann Brown",
    shortDescription: "Brown egg-laying hens.",
    longDescription: [
      "Lohmann Brown layers, a brown egg-laying hybrid used by households and small egg producers.",
      "Enquire with the number of hens you need and your preferred date.",
    ],
    price: null,
    priceQualifier: "each",
    minimumOrder: null,
    availability: "enquire",
    featured: true,
    age: null,
    weight: null,
  }),
  item({
    name: "Broiler chickens",
    slug: "broiler-chickens",
    category: "broilers",
    breed: "Broiler",
    shortDescription: "Broilers for meat production.",
    longDescription: ["Broiler chickens for meat production.", "Enquire with quantity and date."],
    price: null,
    priceQualifier: "each",
    minimumOrder: null,
    availability: "enquire",
    featured: false,
    age: null,
    weight: null,
  }),
  item({
    name: "Day-old chicks",
    slug: "day-old-chick-batches",
    category: "day-old-chicks",
    breed: "Day-old chicks",
    shortDescription: "Chicks supplied in batches.",
    longDescription: [
      "Day-old chicks supplied in batches.",
      "Have your brooder, heat source, feed and water ready before the chicks arrive.",
    ],
    price: null,
    priceQualifier: "each",
    minimumOrder: null,
    availability: "enquire",
    featured: true,
    age: "Day-old",
    weight: null,
  }),
];
