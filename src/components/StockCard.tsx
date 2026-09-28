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

  const price = item.price != null ? `${formatRand(item.price)}${item.priceQualifier ? ` ${item.priceQualifier}` : ""}` : "Contact for current pricing";
  const details = [
    { label: "Price", value: price },
    { label: "Minimum order", value: item.minimumOrder ?? "Confirm on enquiry" },
    { label: "Delivery", value: "KZN + Eastern Cape" },
  ];

  return (
    <article className="group relative flex h-full flex-col">
      <div className="overflow-hidden">
        <Media
          image={item.images[0]}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
          className={`aspect-[5/4] ${soldOut ? "grayscale-[0.6]" : ""}`}
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <Heading className="font-serif text-[1.7rem] leading-tight">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {item.name}
          </Link>
        </Heading>
        <AvailabilityBadge availability={item.availability} className="mt-1" />

        <dl className="mt-4 space-y-1 border-t border-tan pt-4 text-[0.95rem]">
          {details.map((d) => (
            <div key={d.label}>
              <dt className="inline text-muted">{d.label}: </dt>
              <dd className="inline">{d.value}</dd>
            </div>
          ))}
        </dl>

        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-6 pt-4">
          <Link href={href} className="arrow-link text-forest">
            View details <ArrowRight className="size-4" />
          </Link>
          <a
            href={enquiry}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${item.name} on WhatsApp`}
            className="arrow-link text-coffee"
          >
            {soldOut ? "Ask about next intake" : "Enquire"} <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
