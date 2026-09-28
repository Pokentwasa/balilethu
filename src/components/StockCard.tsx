import Link from "next/link";
import type { StockItem } from "@/lib/types";
import { getCategorySync } from "@/lib/content";
import { priceLabel } from "@/lib/format";
import { stockHref } from "@/lib/routes";
import { buildEnquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { Media } from "./Media";
import { ArrowRight, WhatsAppIcon } from "./Icons";

export function StockCard({ item, headingLevel = "h3" }: { item: StockItem; headingLevel?: "h2" | "h3" }) {
  const category = getCategorySync(item.category);
  const href = stockHref(item);
  const price = priceLabel(item);
  const soldOut = item.availability === "sold-out";
  const Heading = headingLevel;
  const enquiry = whatsappUrl(buildEnquiryMessage({ livestock: category.name, item: item.name }));

  const specs = [
    { label: "Min. order", value: item.minimumOrder ?? "On enquiry" },
    { label: item.weight ? "Weight" : "Age", value: item.weight ?? item.age ?? "On enquiry" },
  ];

  return (
    <article className="group relative flex h-full flex-col" data-reveal>
      <div className="relative overflow-hidden rounded-[1.1rem]">
        <Media
          image={item.images[0]}
          seed={`stock-${item.slug}`}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
          className={`aspect-[5/4] ${soldOut ? "grayscale-[0.6]" : ""}`}
          imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
          caption={item.name}
        />
        <AvailabilityBadge availability={item.availability} tone="overlay" className="absolute top-3 left-3" />
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <p className="eyebrow text-clay">
          {category.name} <span className="text-muted">· {item.breed}</span>
        </p>
        <Heading className="mt-2 font-serif text-[1.65rem] leading-tight">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {item.name}
          </Link>
        </Heading>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{item.shortDescription}</p>

        <dl className="mt-5 grid grid-cols-2 border-t border-line text-sm">
          <div className="col-span-2 flex items-baseline justify-between gap-3 border-b border-line py-3">
            <dt className="text-muted">Price</dt>
            <dd className="text-right">
              <span className="font-serif text-xl text-ink">{price.main}</span>
              {item.price != null && price.note && <span className="ml-1.5 text-xs text-muted">{price.note}</span>}
            </dd>
          </div>
          {specs.map((s, i) => (
            <div key={s.label} className={`py-3 ${i === 0 ? "border-r border-line pr-3" : "pl-3"}`}>
              <dt className="text-xs text-muted">{s.label}</dt>
              <dd className="mt-0.5 font-medium">{s.value}</dd>
            </div>
          ))}
          <div className="col-span-2 border-t border-line py-3">
            <dt className="sr-only">Delivery</dt>
            <dd className="text-xs leading-relaxed text-muted">{item.location ?? "Delivery: KZN & Eastern Cape · Collection elsewhere"}</dd>
          </div>
        </dl>

        <div className="relative z-10 mt-auto flex items-center justify-between gap-3 pt-4">
          <Link href={href} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-forest">
            Details <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={enquiry}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${item.name} on WhatsApp`}
            className={`btn !min-h-11 !px-4 !py-2 text-sm ${soldOut ? "btn-outline text-muted" : "btn-primary"}`}
          >
            <WhatsAppIcon className="size-4" />
            {soldOut ? "Ask about next intake" : "Enquire"}
          </a>
        </div>
      </div>
    </article>
  );
}
