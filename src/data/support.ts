import type { StarterProduct, Testimonial } from "@/lib/types";

/**
 * Starter / support items for new livestock owners.
 * `confirmed: false` items were requested in the brief but are not yet
 * confirmed as Balilethu products — they render with a "to confirm" marker
 * while content flags are on. Remove or confirm before launch.
 */
export const starterProducts: StarterProduct[] = [
  {
    slug: "milk-replacer",
    name: "Milk replacer",
    description: "For young calves that are still on milk.",
    relatesTo: ["calves"],
    confirmed: false,
  },
  {
    slug: "feeders",
    name: "Bottles & feeders",
    description: "Feeding equipment for calves and poultry.",
    relatesTo: ["calves", "layers", "broilers", "day-old-chicks"],
    confirmed: false,
  },
  {
    slug: "starter-packages",
    name: "Starter packages",
    description: "Grouped livestock orders sized for a first purchase.",
    relatesTo: ["calves"],
    confirmed: true,
  },
  {
    slug: "care-products",
    name: "Care products",
    description: "Basic health and care items for new animals.",
    relatesTo: ["calves", "cattle", "sheep", "goats"],
    confirmed: false,
  },
  {
    slug: "guides",
    name: "Guides",
    description: "Practical notes on getting set up before your animals arrive.",
    relatesTo: ["calves", "day-old-chicks"],
    confirmed: false,
  },
  {
    slug: "video-support",
    name: "Video support",
    description: "Short videos on feeding and care, shared on Balilethu's social channels.",
    relatesTo: ["calves"],
    confirmed: false,
  },
];

/**
 * Real customer stories only. Leave empty until the client supplies them —
 * the Testimonials section shows labelled placeholders in development.
 */
export const testimonials: Testimonial[] = [];
