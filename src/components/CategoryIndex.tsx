import type { Category } from "@/lib/types";
import { categoryHref } from "@/lib/routes";
import { CategoryIndexBlock, type IndexEntry } from "./CategoryIndexBlock";

function toEntries(categories: Category[]): IndexEntry[] {
  return categories.map((c) => ({
    slug: c.slug,
    name: c.name,
    line: c.indexLine,
    href: categoryHref(c),
    image: c.image,
  }));
}

/** Editorial livestock directory: livestock large, poultry smaller and reversed. */
export function CategoryIndex({ categories }: { categories: Category[] }) {
  const livestock = categories.filter((c) => c.group === "livestock");
  const poultry = categories.filter((c) => c.group === "poultry");
  return (
    <section aria-labelledby="index-heading" className="py-20 md:py-32">
      <div className="container-x">
        <h2 id="index-heading" className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl" data-reveal>
          Calves, cattle, sheep, goats and poultry.
        </h2>
        <div className="mt-14 lg:mt-20">
          <CategoryIndexBlock label="Livestock" entries={toEntries(livestock)} />
        </div>
        <div className="mt-20 lg:mt-32">
          <CategoryIndexBlock label="Poultry" entries={toEntries(poultry)} start={livestock.length + 1} reverse size="small" />
        </div>
      </div>
    </section>
  );
}
