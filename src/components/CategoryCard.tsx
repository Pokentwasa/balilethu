import Link from "next/link";
import type { Category } from "@/lib/types";
import { categoryHref } from "@/lib/routes";
import { formatRand } from "@/lib/format";
import { Media } from "./Media";
import { ArrowUpRight } from "./Icons";

export function CategoryCard({ category, index, size = "default" }: { category: Category; index: number; size?: "default" | "large" | "wide" }) {
  const tall = size === "large";
  return (
    <Link
      href={categoryHref(category)}
      className="group relative block h-full overflow-hidden rounded-[1.25rem] bg-forest-deep text-bone"
      data-reveal
      style={{ ["--reveal-delay" as string]: `${(index % 4) * 70}ms` }}
    >
      <Media
        image={category.image}
        seed={`cat-${category.slug}`}
        sizes={tall || size === "wide" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 85vw"}
        className={
          tall
            ? "aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[34rem]"
            : size === "wide"
              ? "aspect-[4/5] md:aspect-[16/8]"
              : "aspect-[4/5]"
        }
        imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
        caption={category.name}
        captionClassName="top-14 left-5"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/20 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-forest-deep/45 to-transparent" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
        <span className="font-mono text-xs text-bone/85">{String(index + 1).padStart(2, "0")}</span>
        <span className="rounded-full border border-bone/30 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-bone/80">
          {category.group}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className={`font-serif leading-none ${tall ? "text-5xl sm:text-6xl" : "text-[2.1rem]"}`}>{category.name}</h3>
        <p className="mt-2 max-w-xs text-sm leading-snug text-bone/75">{category.tagline}</p>
        <div className="mt-5 flex items-center justify-between border-t border-bone/20 pt-4">
          <span className="text-sm text-bone/80">
            {category.fromPrice != null ? <>From <strong className="font-semibold text-bone">{formatRand(category.fromPrice)}</strong></> : "Price on enquiry"}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
            View Stock
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
