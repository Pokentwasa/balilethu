"use client";

import { useEffect, useMemo, useState } from "react";
import type { Availability, Category, CategorySlug } from "@/lib/types";
import { availabilityLabel } from "@/lib/format";
import { Close, Filter } from "./Icons";

/**
 * Client-side filtering over server-rendered cards. Every card is in the
 * HTML (crawlable); filters only toggle visibility.
 */
export function StockCatalogue({
  categories,
  items,
  children,
}: {
  categories: Pick<Category, "slug" | "name" | "group">[];
  items: { slug: string; category: CategorySlug; availability: Availability }[];
  children: React.ReactNode[];
}) {
  const [cats, setCats] = useState<Set<CategorySlug>>(new Set());
  const [avail, setAvail] = useState<Set<Availability>>(new Set());
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const visible = useMemo(
    () =>
      items.map(
        (it) => (cats.size === 0 || cats.has(it.category)) && (avail.size === 0 || avail.has(it.availability)),
      ),
    [items, cats, avail],
  );
  const count = visible.filter(Boolean).length;
  const active = cats.size + avail.size;

  const toggle = <T,>(set: Set<T>, v: T, update: (s: Set<T>) => void) => {
    const n = new Set(set);
    if (n.has(v)) n.delete(v);
    else n.add(v);
    update(n);
  };
  const reset = () => {
    setCats(new Set());
    setAvail(new Set());
  };

  const availOptions: Availability[] = ["available", "limited", "enquire", "sold-out"];

  const filters = (
    <div className="space-y-8">
      <fieldset>
        <legend className="eyebrow mb-3 text-muted">Livestock & poultry</legend>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Chip key={c.slug} active={cats.has(c.slug)} onClick={() => toggle(cats, c.slug, setCats)}>
              {c.name}
            </Chip>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-3 text-muted">Availability</legend>
        <div className="flex flex-wrap gap-2">
          {availOptions.map((a) => (
            <Chip key={a} active={avail.has(a)} onClick={() => toggle(avail, a, setAvail)}>
              {availabilityLabel[a]}
            </Chip>
          ))}
        </div>
      </fieldset>
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <aside className="hidden lg:col-span-3 lg:block" aria-label="Filter stock">
        <div className="sticky top-28">
          {filters}
          {active > 0 && (
            <button type="button" onClick={reset} className="mt-8 text-sm font-semibold text-clay link-underline">
              Clear filters
            </button>
          )}
        </div>
      </aside>

      <div className="lg:col-span-9">
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-line pb-4">
          <p className="text-sm text-muted" aria-live="polite">
            Showing <strong className="text-ink">{count}</strong> {count === 1 ? "listing" : "listings"}
          </p>
          <button
            type="button"
            className="btn btn-outline !min-h-11 !px-4 !py-2 text-sm lg:hidden"
            onClick={() => setDrawer(true)}
            aria-haspopup="dialog"
          >
            <Filter className="size-4" /> Filters{active > 0 && ` (${active})`}
          </button>
        </div>

        <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
          {children.map((child, i) => (
            <li key={items[i].slug} hidden={!visible[i]}>
              {child}
            </li>
          ))}
        </ul>
        {count === 0 && (
          <div className="rounded-sm border border-line p-10 text-center">
            <p className="font-serif text-2xl">No listings match those filters.</p>
            <button type="button" onClick={reset} className="mt-4 text-sm font-semibold text-clay link-underline">
              Clear filters
            </button>
          </div>
        )}
      </div>

      {drawer && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Filter stock">
          <button type="button" aria-label="Close filters" className="absolute inset-0 bg-ink/40" onClick={() => setDrawer(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85svh] animate-drawer-in overflow-y-auto rounded-t-sm bg-bone px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] motion-reduce:animate-none">
            <div className="mb-6 flex items-center justify-between">
              <p className="font-serif text-2xl">Filter stock</p>
              <button type="button" onClick={() => setDrawer(false)} className="grid size-11 place-items-center rounded-sm" aria-label="Close filters">
                <Close className="size-5" />
              </button>
            </div>
            {filters}
            <div className="mt-8 flex gap-2">
              <button type="button" onClick={reset} className="btn btn-outline flex-1 text-forest">
                Clear
              </button>
              <button type="button" onClick={() => setDrawer(false)} className="btn btn-primary flex-[2]">
                Show {count} {count === 1 ? "listing" : "listings"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-sm border px-4 text-sm font-medium transition-colors ${
        active ? "border-forest bg-forest text-bone" : "border-line bg-paper text-ink hover:border-forest/50"
      }`}
    >
      {children}
    </button>
  );
}
