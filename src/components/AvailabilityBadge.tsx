import type { Availability } from "@/lib/types";
import { availabilityLabel } from "@/lib/format";

const styles: Record<Availability, { dot: string; text: string }> = {
  available: { dot: "bg-[#4f7a45]", text: "text-forest" },
  limited: { dot: "bg-[#c08a2e]", text: "text-[#7a5413]" },
  enquire: { dot: "bg-clay", text: "text-clay" },
  "sold-out": { dot: "bg-muted/50", text: "text-muted line-through decoration-1" },
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
      <span className={`relative size-1.5 rounded-full ${s.dot}`} aria-hidden="true">
        {availability === "available" && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#4f7a45] opacity-40 motion-reduce:hidden" />
        )}
      </span>
      <span className="sr-only">Availability: </span>
      {availabilityLabel[availability]}
    </span>
  );
}
