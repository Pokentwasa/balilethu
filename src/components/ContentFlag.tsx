import { site } from "@/config/site";

/**
 * Development marker for content that still needs client confirmation.
 * Hidden when NEXT_PUBLIC_SHOW_CONTENT_FLAGS=false.
 */
export function ContentFlag({ children = "To confirm", className = "" }: { children?: React.ReactNode; className?: string }) {
  if (!site.showContentFlags) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-clay/60 bg-clay/5 px-2.5 py-0.5 text-[0.68rem] font-semibold tracking-wide text-clay uppercase ${className}`}
    >
      {children}
    </span>
  );
}
