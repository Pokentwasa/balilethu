/**
 * Alt text for photos in /public/images, keyed by path without extension.
 * Describe what the photo actually shows.
 */
export const photoAlts: Record<string, string> = {
  "hero/hero": "Cattle and calves in a field at sunset",
  "categories/calves": "Young cattle feeding on hay",
  "categories/cattle": "Red horned cow standing in a green field",
  "categories/sheep": "Flock of sheep resting on grass",
  "categories/goats": "Herd of goats behind a wire fence",
  "categories/layers": "Brown laying hens in a farmyard",
  "categories/day-old-chicks": "Day-old chicks under a heat lamp",
  "stock/nguni-pregnant-cows/1": "Red horned cow standing in a green field",
  "stock/breeding-sheep/1": "Flock of sheep resting on grass",
  "stock/breeding-sheep/2": "Close-up of a woolly sheep",
  "stock/lambs/1": "Young sheep standing on dry ground",
  "stock/goats-on-enquiry/1": "Herd of goats behind a wire fence",
  "stock/goats-on-enquiry/2": "Goat with curved horns in profile",
  "stock/lohmann-brown-layers/1": "Brown laying hens in a farmyard",
  "stock/lohmann-brown-layers/2": "Brown hen in a farmyard",
  "stock/day-old-chick-batches/1": "Day-old chicks under a heat lamp",
  "sections/why-selection": "Close-up of a woolly sheep",
  "sections/why-delivery": "Young goat resting on a wooden crate",
  "sections/why-support": "Young sheep standing on dry ground",
  "sections/why-direct": "Brown hen in a farmyard",
  "sections/beginner": "Sheep standing in a field",
  "sections/starter-products": "Day-old chicks under a heat lamp",
  "sections/about": "Brown cow looking over a wooden fence",
};

/**
 * Stock listing photos are currently stock photography, not Balilethu's own
 * animals, so they are labelled "Illustrative photo". Set to false once
 * listing folders contain photos of the actual animals for sale.
 */
export const stockPhotosAreIllustrative = true;
