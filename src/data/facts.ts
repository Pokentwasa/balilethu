/**
 * Business facts reused across pages. Sourced from the existing
 * balilethulivestock.com content — see CONTENT_AUDIT.md for provenance.
 * Keep wording here so every page says the same thing.
 */

export const deliveryFacts = {
  summary:
    "We deliver in KwaZulu-Natal and the Eastern Cape (up to Mount Frere).",
  otherProvinces:
    "Customers in other provinces are welcome to buy, but need to arrange their own transport to collect.",
  crossBorder:
    "We do not deliver outside South Africa. Even if you arrange your own transport, we cannot sell livestock for export.",
  certificate:
    "We provide a Certificate of Removal, which is valid for local authorities within South Africa.",
  fmd:
    "Ongoing Foot and Mouth Disease restrictions currently make exporting livestock to other countries extremely difficult.",
} as const;

export const deliveryFaqs = [
  {
    question: "Where do you deliver?",
    answer: `${deliveryFacts.summary} ${deliveryFacts.otherProvinces}`,
  },
  {
    question: "Can you deliver outside South Africa?",
    answer: `${deliveryFacts.crossBorder} ${deliveryFacts.certificate}`,
  },
] as const;

export const businessTimeline = [
  { year: "2023", text: "Started as Balilethu Calves, supplying bottle-fed calves to people raising their own animals." },
  { year: "2024", text: "Expanded to breeding cattle, pregnant cows, sheep and lambs, broilers, Lohmann Brown layers and day-old chicks." },
  { year: "Today", text: "Trading as Balilethu Livestock — one supplier for livestock and poultry." },
] as const;
