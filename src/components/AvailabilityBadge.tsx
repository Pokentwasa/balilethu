import type { Availability } from "@/lib/types";

const text: Record<Availability, string> = {
  available: "Available",
  limited: "Limited stock",
  enquire: "Available on enquiry",
  "sold-out": "Sold out",
};

/** Availability as a short line of plain text — not a badge. */
export function AvailabilityBadge({ availability, className = "" }: { availability: Availability; className?: string }) {
  return (
    <p className={`text-sm ${availability === "sold-out" ? "text-muted" : "text-ink-soft"} ${className}`}>
      <span className="sr-only">Availability: </span>
      {text[availability]}
    </p>
  );
}
