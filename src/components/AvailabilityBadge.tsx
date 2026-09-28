import type { Availability } from "@/lib/types";

const text: Record<Availability, string> = {
  available: "Available",
  limited: "Limited stock",
  enquire: "Available on enquiry",
  "sold-out": "Sold out",
};

/** Availability as plain commercial text, not a badge. */
export function AvailabilityBadge({ availability, className = "" }: { availability: Availability; className?: string }) {
  return (
    <p className={`text-[0.95rem] ${availability === "sold-out" ? "text-muted" : "text-forest"} ${className}`}>
      <span className="sr-only">Availability: </span>
      {text[availability]}
    </p>
  );
}
