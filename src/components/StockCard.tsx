import Link from "next/link";
import type { StockItem } from "@/lib/types";
import { getCategorySync } from "@/lib/content";
import { formatRand } from "@/lib/format";
import { stockHref } from "@/lib/routes";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { Media } from "./Media";
import { ArrowRight } from "./Icons";

/** Catalogue entry: photograph, label, name, three ruled lines, one link. */
export function StockCard({
  item,
  headingLevel = "h3",
  aspect = "aspect-[4/5]",
}: {
  item: StockItem;
  headingLevel?: "h2" | "h3";
  aspect?: string;
}) {
  const category = getCategorySync(item.category);
  const href = stockHref(item);
  const Heading = headingLevel;
  const price = item.price != null ? `${formatRand(item.price)}${item.priceQualifier ? ` ${item.priceQualifier}` : ""}` : "On enquiry";

  const rows = [
    { label: "Price", value: price },
    { label: "Minimum", value: item.minimumOrder ?? "Confirm on enquiry" },
    { label: "Delivery", value: "KZN + Eastern Cape" },
  ];

  return (
    <article className="group relative flex h-full flex-col">
      <div className="overflow-hidden" data-reveal="clip">
        <Media
          image={item.images[0]}
          plateText={item.breed}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
          className={`${aspect} ${item.availability === "sold-out" ? "grayscale-[0.6]" : ""}`}
          imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
        />
      </div>

      <p className="label-sm mt-5 text-muted">
        {category.name} <span className="mx-1 text-line">/</span> {item.breed}
      </p>
      <Heading className="mt-2 text-[1.9rem] leading-[1.05]">
        <Link href={href} className="after:absolute after:inset-0 after:content-['']">
          {item.name}
        </Link>
      </Heading>

      <dl className="mt-5 border-t border-line text-[0.95rem]">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between gap-4 border-b border-line py-2.5">
            <dt className="text-muted">{r.label}</dt>
            <dd className="text-right">{r.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-5">
        <AvailabilityBadge availability={item.availability} />
        <span className="arrow-link text-sm text-forest">
          View details <ArrowRight className="size-4" />
        </span>
      </div>
    </article>
  );
}
