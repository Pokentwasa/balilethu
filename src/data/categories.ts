import type { Category } from "@/lib/types";
import { deliveryFacts, deliveryFaqs } from "./facts";

/**
 * Category content. `fromPrice` and `minimumOrder` stay null until
 * Balilethu confirms current figures (see CONTENT_AUDIT.md) — the UI
 * then shows "Price on enquiry" instead of a stale or invented number.
 */
export const categories: Category[] = [
  {
    slug: "calves",
    group: "livestock",
    name: "Calves",
    singular: "calf",
    tagline: "Beef-cross and dairy-cross calves, including bottle-fed calves.",
    heading: "Calves for sale",
    intro: [
      "Calves are where Balilethu started. The business began in 2023 as Balilethu Calves, supplying bottle-fed calves to people who want to raise their own animals.",
      "Stock typically includes beef-cross heifers and bulls and dairy-cross bull calves. Breeds and numbers change with each intake, so send an enquiry with the type and quantity you need and we'll confirm what is available now.",
    ],
    knownTypes: [
      "Hereford cross",
      "Angus cross",
      "Bonsmara cross",
      "Beefmaster cross",
      "Charolais cross",
      "Holstein / dairy cross",
    ],
    keyPoints: [
      { label: "Types", value: "Beef-cross heifers and bulls, dairy-cross bulls" },
      { label: "Suited to", value: "Raising, growing out, starting a herd" },
      { label: "Delivery", value: "KZN and Eastern Cape (up to Mount Frere)" },
    ],
    fromPrice: null,
    minimumOrder: null,
    faqs: [
      {
        question: "What calf breeds do you have?",
        answer:
          "Recent stock has included Hereford cross, Angus cross, Bonsmara cross, Beefmaster cross and Charolais cross calves, as well as Holstein (dairy) cross bull calves. Availability changes with each intake — enquire for what is in stock now.",
      },
      {
        question: "Are the calves bottle-fed?",
        answer:
          "Balilethu started by supplying bottle-fed calves. Ask when you enquire whether the calves currently available are still on milk, so you can plan feeding.",
      },
      {
        question: "Is there a minimum order for calves?",
        answer:
          "Minimum quantities can apply to calf orders and packages. Confirm the current minimum when you enquire.",
      },
      ...deliveryFaqs,
    ],
    image: null,
    seo: {
      title: "Calves for Sale | Beef & Dairy Cross Calves",
      description:
        "Hereford, Angus, Bonsmara and dairy-cross calves from Balilethu Livestock. Delivery in KwaZulu-Natal and the Eastern Cape. Enquire on WhatsApp for current stock and prices.",
    },
  },
  {
    slug: "cattle",
    group: "livestock",
    name: "Cattle",
    singular: "head of cattle",
    tagline: "Breeding cattle and pregnant cows, including Nguni and Brahman.",
    heading: "Cattle for sale",
    intro: [
      "Alongside calves, Balilethu supplies breeding cattle and pregnant cows for farmers building or growing a herd.",
      "Recent stock has included pure Nguni pregnant cows and Brahman cows. Tell us what you are looking for — breed, number of animals and whether you need them in calf — and we'll confirm availability and pricing.",
    ],
    knownTypes: ["Nguni (pregnant cows)", "Brahman cows", "Breeding cattle"],
    keyPoints: [
      { label: "Types", value: "Breeding cattle, pregnant cows" },
      { label: "Suited to", value: "Herd building and breeding" },
      { label: "Paperwork", value: "Certificate of Removal provided" },
    ],
    fromPrice: null,
    minimumOrder: null,
    faqs: [
      {
        question: "Do you sell pregnant cows?",
        answer:
          "Yes. Pregnant cows, including pure Nguni cows, have been part of Balilethu's cattle stock. Enquire for current availability.",
      },
      {
        question: "What documents come with the cattle?",
        answer: `${deliveryFacts.certificate}`,
      },
      ...deliveryFaqs,
    ],
    image: null,
    seo: {
      title: "Cattle for Sale | Breeding Cattle & Pregnant Cows",
      description:
        "Breeding cattle and pregnant cows, including Nguni and Brahman, from Balilethu Livestock. Delivery in KZN and the Eastern Cape. Enquire for current availability.",
    },
  },
  {
    slug: "sheep",
    group: "livestock",
    name: "Sheep",
    singular: "sheep",
    tagline: "Breeding sheep and lambs.",
    heading: "Sheep for sale",
    intro: [
      "Balilethu supplies breeding sheep and lambs for households and farmers adding small stock.",
      "Numbers and breeds vary between intakes. Send an enquiry with how many animals you need and where you are, and we'll confirm what can be supplied.",
    ],
    knownTypes: ["Breeding sheep", "Lambs"],
    keyPoints: [
      { label: "Types", value: "Breeding sheep, lambs" },
      { label: "Suited to", value: "Breeding, small-stock farming" },
      { label: "Delivery", value: "KZN and Eastern Cape (up to Mount Frere)" },
    ],
    fromPrice: null,
    minimumOrder: null,
    faqs: [
      {
        question: "Do you sell lambs as well as adult sheep?",
        answer:
          "Yes, both breeding sheep and lambs have been supplied. Tell us which you need when you enquire.",
      },
      ...deliveryFaqs,
    ],
    image: null,
    seo: {
      title: "Sheep for Sale | Breeding Sheep & Lambs",
      description:
        "Breeding sheep and lambs from Balilethu Livestock, with delivery in KwaZulu-Natal and the Eastern Cape. Enquire on WhatsApp for current stock.",
    },
  },
  {
    slug: "goats",
    group: "livestock",
    name: "Goats",
    singular: "goat",
    tagline: "Goats supplied on enquiry.",
    heading: "Goats for sale",
    intro: [
      "Goats are supplied on enquiry. Tell us how many you need, what they are for and where you are, and we'll let you know what can be sourced and when.",
    ],
    knownTypes: [],
    keyPoints: [
      { label: "Supply", value: "On enquiry" },
      { label: "Delivery", value: "KZN and Eastern Cape (up to Mount Frere)" },
      { label: "Paperwork", value: "Certificate of Removal provided" },
    ],
    fromPrice: null,
    minimumOrder: null,
    faqs: [
      {
        question: "What goats do you have available?",
        answer:
          "Goat availability changes, so send an enquiry with the number of animals and purpose (breeding, meat or household) and we'll confirm options.",
      },
      ...deliveryFaqs,
    ],
    image: null,
    seo: {
      title: "Goats for Sale | Livestock Supplier",
      description:
        "Enquire about goats from Balilethu Livestock. Delivery in KwaZulu-Natal and the Eastern Cape, collection for other provinces.",
    },
  },
  {
    slug: "layers",
    group: "poultry",
    name: "Layers",
    singular: "layer hen",
    tagline: "Lohmann Brown laying hens.",
    heading: "Layer chickens for sale",
    intro: [
      "Balilethu supplies Lohmann Brown layers — a brown egg-laying hybrid widely used by households and small egg producers.",
      "Let us know how many hens you need and whether you're starting a new flock or adding to one. We'll confirm current availability and the next supply date.",
    ],
    knownTypes: ["Lohmann Brown"],
    keyPoints: [
      { label: "Breed", value: "Lohmann Brown" },
      { label: "Suited to", value: "Egg production" },
      { label: "Delivery", value: "KZN and Eastern Cape (up to Mount Frere)" },
    ],
    fromPrice: null,
    minimumOrder: null,
    faqs: [
      {
        question: "Which layer breed do you supply?",
        answer: "Balilethu supplies Lohmann Brown layers.",
      },
      {
        question: "Is there a minimum order for layers?",
        answer: "Confirm the current minimum quantity when you enquire.",
      },
      ...deliveryFaqs,
    ],
    image: null,
    seo: {
      title: "Layer Chickens for Sale | Lohmann Brown Layers",
      description:
        "Lohmann Brown layer hens from Balilethu Livestock for egg production. Delivery in KZN and the Eastern Cape. Enquire for availability and pricing.",
    },
  },
  {
    slug: "broilers",
    group: "poultry",
    name: "Broilers",
    singular: "broiler",
    tagline: "Broiler chickens for meat production.",
    heading: "Broiler chickens for sale",
    intro: [
      "Broiler chickens for households and small poultry businesses raising birds for meat.",
      "Tell us how many birds you need and when, and we'll confirm availability, pricing and delivery or collection.",
    ],
    knownTypes: ["Broilers"],
    keyPoints: [
      { label: "Type", value: "Broiler chickens" },
      { label: "Suited to", value: "Meat production" },
      { label: "Delivery", value: "KZN and Eastern Cape (up to Mount Frere)" },
    ],
    fromPrice: null,
    minimumOrder: null,
    faqs: [
      {
        question: "Can I order broilers as day-old chicks?",
        answer:
          "Day-old chicks are listed separately. Say in your enquiry whether you want day-old broiler chicks or older birds.",
      },
      ...deliveryFaqs,
    ],
    image: null,
    seo: {
      title: "Broiler Chickens for Sale",
      description:
        "Broiler chickens from Balilethu Livestock for households and small poultry businesses. Delivery in KwaZulu-Natal and the Eastern Cape.",
    },
  },
  {
    slug: "day-old-chicks",
    group: "poultry",
    name: "Day-old chicks",
    singular: "chick",
    tagline: "Day-old chicks for starting or restocking a flock.",
    heading: "Day-old chicks for sale",
    intro: [
      "Day-old chicks for people starting a flock or restocking. Chicks need warmth, feed and water ready on arrival, so plan your brooding setup before your delivery or collection date.",
      "Enquire with the number of chicks and preferred date. We'll confirm the next available batch.",
    ],
    knownTypes: ["Day-old chicks"],
    keyPoints: [
      { label: "Type", value: "Day-old chicks" },
      { label: "Plan ahead", value: "Brooder, heat, feed and water ready" },
      { label: "Delivery", value: "KZN and Eastern Cape (up to Mount Frere)" },
    ],
    fromPrice: null,
    minimumOrder: null,
    faqs: [
      {
        question: "What do I need ready before chicks arrive?",
        answer:
          "Have a clean, draught-free brooding area with a heat source, chick feed and fresh water set up before the chicks arrive.",
      },
      {
        question: "How far in advance should I order?",
        answer: "Chicks are supplied in batches. Enquire early so we can confirm the next available date.",
      },
      ...deliveryFaqs,
    ],
    image: null,
    seo: {
      title: "Day-Old Chicks for Sale",
      description:
        "Order day-old chicks from Balilethu Livestock. Delivery in KwaZulu-Natal and the Eastern Cape. Enquire on WhatsApp for the next available batch.",
    },
  },
];
