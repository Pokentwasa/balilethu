import type { Metadata } from "next";
import { site } from "@/config/site";
import type { Category, FaqItem, StockItem } from "./types";

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path === "/" ? "" : path}`;
}

/** Page metadata with canonical, Open Graph and Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ url: image }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description, siteName: site.name, locale: site.locale, images },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
  };
}

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.shortDescription,
    logo: absoluteUrl("/icon.svg"),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.contact.locality,
      addressRegion: site.contact.region,
      addressCountry: site.contact.country,
    },
    areaServed: site.delivery.provinces.map((name) => ({ "@type": "State", name })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: `+${site.contact.whatsapp}`,
      availableLanguage: ["en"],
      areaServed: "ZA",
    },
    sameAs: Object.values(site.social),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqJsonLd(faqs: FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Product schema. An Offer is only included when a confirmed price exists. */
export function productJsonLd(item: StockItem, category: Category, path: string): JsonLd {
  const availability: Record<StockItem["availability"], string | undefined> = {
    available: "https://schema.org/InStock",
    limited: "https://schema.org/LimitedAvailability",
    "sold-out": "https://schema.org/SoldOut",
    enquire: undefined,
  };
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.longDescription.join(" "),
    category: category.name,
    url: absoluteUrl(path),
    image: item.images.map((i) => absoluteUrl(i.src)),
    brand: { "@type": "Brand", name: site.name },
    ...(item.price != null && {
      offers: {
        "@type": "Offer",
        price: item.price,
        priceCurrency: "ZAR",
        url: absoluteUrl(path),
        availability: availability[item.availability],
        seller: { "@id": `${site.url}/#business` },
      },
    }),
  };
}

export function itemListJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.path),
    })),
  };
}
