import Link from "next/link";
import type { Category } from "@/lib/types";
import { categoryHref } from "@/lib/routes";
import { formatRand } from "@/lib/format";
import { Media } from "./Media";
import { ArrowRight } from "./Icons";

export function CategoryCard({ category, size = "default" }: { category: Category; index?: number; size?: "default" | "large" | "wide" }) {
  const tall = size === "large";
  return (
    <Link
      href={categoryHref(category)}
      className="group relative block h-full overflow-hidden bg-forest text-bone"
    >
      <Media
        image={category.image}
        sizes={tall || size === "wide" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 85vw"}
        className={
          tall
            ? "aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[34rem]"
            : size === "wide"
              ? "aspect-[4/5] md:aspect-[16/8]"
              : "aspect-[4/5]"
        }
        imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
      />
      <div className="absolute inset-x-0 bottom-0 bg-forest px-5 py-4 sm:px-6">
        <h3 className={`font-serif leading-none ${tall ? "text-4xl sm:text-5xl" : "text-[1.9rem]"}`}>{category.name}</h3>
        <div className="mt-2 flex items-baseline justify-between gap-4 text-[0.95rem]">
          <span className="text-bone/80">
            {category.fromPrice != null ? <>From {formatRand(category.fromPrice)}</> : tall ? category.tagline : null}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold">
            View stock
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
