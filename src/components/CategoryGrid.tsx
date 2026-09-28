import Link from "next/link";
import type { Category } from "@/lib/types";
import { CategoryCard } from "./CategoryCard";
import { SectionHeading } from "./SectionHeading";
import { ArrowRight } from "./Icons";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  const [lead, ...rest] = categories;
  return (
    <section aria-labelledby="categories-heading" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          id="categories-heading"
          title={<>From calves and cattle to sheep, goats <em className="text-forest">and poultry.</em></>}
          intro="Livestock for farmers, households and growing agricultural businesses. Choose a category to see current stock, pricing and what you need to know before buying."
          align="split"
        />
      </div>

      {/* Mobile: horizontal snap rail. Desktop: editorial grid. */}
      <div className="mt-12 md:hidden">
        <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:none]">
          {categories.map((c, i) => (
            <li key={c.slug} className="w-[78vw] max-w-sm shrink-0 snap-start">
              <CategoryCard category={c} index={i} />
            </li>
          ))}
        </ul>
        <ul className="container-x mt-4 border-t border-tan">
          {categories.map((c) => (
            <li key={c.slug} className="border-b border-tan">
              <Link href={`/${c.group}/${c.slug}`} className="flex min-h-12 items-center justify-between font-serif text-xl">
                {c.name}
                <ArrowRight className="size-4 text-forest" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-x mt-14 hidden md:block">
        <div className="grid gap-4 lg:grid-cols-2">
          <CategoryCard category={lead} index={0} size="large" />
          <div className="grid grid-cols-2 gap-4">
            {rest.slice(0, 4).map((c, i) => (
              <CategoryCard key={c.slug} category={c} index={i + 1} />
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {rest.slice(4).map((c, i) => (
            <CategoryCard key={c.slug} category={c} index={i + 5} size="wide" />
          ))}
        </div>
      </div>
    </section>
  );
}
