import Link from "next/link";
import type { StockItem } from "@/lib/types";
import { getCategorySync } from "@/lib/content";
import { formatRand } from "@/lib/format";
import { stockHref } from "@/lib/routes";
import { buildEnquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { Media } from "./Media";
import { ArrowRight } from "./Icons";

export function StockCard({ item, headingLevel = "h3" }: { item: StockItem; headingLevel?: "h2" | "h3" }) {
  const category = getCategorySync(item.category);
  const href = stockHref(item);
  const soldOut = item.availability === "sold-out";
  const Heading = headingLevel;
  const enquiry = whatsappUrl(buildEnquiryMessage({ livestock: category.name, item: item.name }));

  const price = item.price != null ? `${formatRand(item.price)}${item.priceQualifier ? ` ${item.priceQualifier}` : ""}` : "On enquiry";
  const details = [
    { label: "Price", value: price },
    { label: "Minimum", value: item.minimumOrder ?? "Confirm on enquiry" },
    { label: "Delivery", value: "KZN + Eastern Cape" },
  ];
  // Photos are marked illustrative once per section, not on every card.
  const image = item.images[0] ? { ...item.images[0], illustrative: false } : undefined;

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative overflow-hidden rounded-sm">
        <Media
          image={image}
          seed={`stock-${item.slug}`}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
          className={`aspect-[5/4] ${soldOut ? "grayscale-[0.6]" : ""}`}
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          caption={item.name}
        />
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <p className="text-sm text-muted">
          {category.name} · {item.breed}
        </p>
        <Heading className="mt-1 font-serif text-[1.65rem] leading-tight">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {item.name}
          </Link>
        </Heading>
        <AvailabilityBadge availability={item.availability} className="mt-1" />
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{item.shortDescription}</p>

        <dl className="mt-4 border-t border-line text-[0.95rem]">
          {details.map((d) => (
            <div key={d.label} className="flex justify-between gap-4 border-b border-line py-2">
              <dt className="text-muted">{d.label}</dt>
              <dd className="text-right">{d.value}</dd>
            </div>
          ))}
        </dl>

        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-6 pt-4">
          <Link href={href} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-forest">
            Details <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={enquiry}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${item.name} on WhatsApp`}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-clay"
          >
            {soldOut ? "Ask about next intake" : "Enquire"} <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
