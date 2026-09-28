import type { Availability } from "@/lib/types";

const text: Record<Availability, string> = {
  available: "Available",
  limited: "Limited stock",
  enquire: "Available on enquiry",
  "sold-out": "Sold out",
};

const dot: Record<Availability, string> = {
  available: "bg-[#3f7a3a]",
  limited: "bg-[#b07d24]",
  enquire: "bg-earth",
  "sold-out": "bg-muted/60",
};

/** One small textual availability indicator — no pill. */
export function AvailabilityBadge({ availability, className = "" }: { availability: Availability; className?: string }) {
  return (
    <p className={`label-sm flex items-center gap-2 ${availability === "sold-out" ? "text-muted" : "text-ink-soft"} ${className}`}>
      <span className={`size-1.5 shrink-0 rounded-full ${dot[availability]}`} aria-hidden="true" />
      <span className="sr-only">Availability: </span>
      {text[availability]}
    </p>
  );
}
