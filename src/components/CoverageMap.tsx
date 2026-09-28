/**
 * Schematic tile map of South Africa's provinces (not to scale).
 * Delivery provinces are highlighted; others are collection-only.
 */
const tiles: { code: string; name: string; col: number; row: number; rowSpan?: number; colSpan?: number }[] = [
  { code: "NW", name: "North West", col: 2, row: 1 },
  { code: "GP", name: "Gauteng", col: 3, row: 1 },
  { code: "LP", name: "Limpopo", col: 4, row: 1 },
  { code: "NC", name: "Northern Cape", col: 1, row: 2, rowSpan: 2 },
  { code: "FS", name: "Free State", col: 2, row: 2, colSpan: 2 },
  { code: "MP", name: "Mpumalanga", col: 4, row: 2 },
  { code: "EC", name: "Eastern Cape", col: 2, row: 3, colSpan: 2 },
  { code: "KZN", name: "KwaZulu-Natal", col: 4, row: 3 },
  { code: "WC", name: "Western Cape", col: 1, row: 4, colSpan: 2 },
];

export function CoverageMap({ deliveryProvinces }: { deliveryProvinces: readonly string[] }) {
  return (
    <figure>
      <div className="grid grid-cols-4 grid-rows-4 gap-1.5 sm:gap-2" role="list" aria-label="Province coverage">
        {tiles.map((t) => {
          const delivery = deliveryProvinces.includes(t.name);
          return (
            <div
              key={t.code}
              role="listitem"
              style={{
                gridColumn: `${t.col} / span ${t.colSpan ?? 1}`,
                gridRow: `${t.row} / span ${t.rowSpan ?? 1}`,
              }}
              className={`relative flex min-h-[4.5rem] flex-col justify-between rounded-xl p-2.5 sm:min-h-24 sm:p-3.5 ${
                delivery ? "bg-forest text-bone" : "border border-dashed border-ink/20 bg-transparent text-ink/70"
              }`}
            >
              <span className="font-serif text-lg leading-none sm:text-2xl">{t.code}</span>
              <span className="text-[0.62rem] leading-tight sm:text-xs">
                {t.name}
                <span className="sr-only">: {delivery ? "delivery available" : "collection with own transport"}</span>
              </span>
              {t.code === "EC" && (
                <span className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[0.6rem] font-semibold tracking-wide uppercase text-sand sm:top-3.5 sm:right-3.5">
                  <span className="size-2 rounded-full bg-clay-soft ring-2 ring-bone/40" aria-hidden="true" />
                  up to Mount Frere
                </span>
              )}
            </div>
          );
        })}
      </div>
      <figcaption className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
        <span className="flex items-center gap-2">
          <span className="size-3 rounded bg-forest" aria-hidden="true" /> Delivery
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3 rounded border border-dashed border-ink/40" aria-hidden="true" /> Collection — own transport
        </span>
        <span className="text-xs">Schematic, not to scale.</span>
      </figcaption>
    </figure>
  );
}
