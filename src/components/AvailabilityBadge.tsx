import type { Availability } from "@/lib/types";
import { availabilityLabel } from "@/lib/format";

const styles: Record<Availability, { text: string }> = {
  available: { text: "text-forest" },
  limited: { text: "text-[#7a5413]" },
  enquire: { text: "text-clay" },
  "sold-out": { text: "text-muted line-through decoration-1" },
};

export function AvailabilityBadge({
  availability,
  tone = "light",
  className = "",
}: {
  availability: Availability;
  tone?: "light" | "overlay";
  className?: string;
}) {
  const s = styles[availability];
  const base =
    tone === "overlay"
      ? "bg-paper/92 backdrop-blur-sm shadow-[0_1px_0_rgba(0,0,0,0.04)]"
      : "border border-line bg-paper";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.7rem] font-semibold tracking-[0.12em] uppercase ${base} ${s.text} ${className}`}
    >
      <span className="sr-only">Availability: </span>
      {availabilityLabel[availability]}
    </span>
  );
}
