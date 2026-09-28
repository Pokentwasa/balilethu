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
      <div className="grid grid-cols-4 grid-rows-4 gap-1" role="list" aria-label="Province coverage">
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
              className={`flex min-h-[4.5rem] flex-col justify-between p-2.5 sm:min-h-24 sm:p-3.5 ${
                delivery ? "border border-forest bg-forest text-bone" : "border border-tan bg-bone text-ink"
              }`}
            >
              <span className="font-serif text-lg leading-none sm:text-2xl">{t.code}</span>
              <span className="text-xs leading-tight sm:text-sm">
                {t.name}
                {t.code === "EC" && <span className="block opacity-80">up to Mount Frere</span>}
                <span className="sr-only">: {delivery ? "delivery available" : "collection with own transport"}</span>
              </span>
            </div>
          );
        })}
      </div>
      <figcaption className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
        <span className="flex items-center gap-2">
          <span className="size-3 bg-forest" aria-hidden="true" /> Delivery
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3 border border-tan bg-bone" aria-hidden="true" /> Collection, own transport
        </span>
        <span>Schematic, not to scale.</span>
      </figcaption>
    </figure>
  );
}
