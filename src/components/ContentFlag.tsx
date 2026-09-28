import { site } from "@/config/site";

/**
 * Review note for content that still needs client confirmation.
 * Plain text, shown only when NEXT_PUBLIC_SHOW_CONTENT_FLAGS=true.
 */
export function ContentFlag({ children = "To confirm", className = "" }: { children?: React.ReactNode; className?: string }) {
  if (!site.showContentFlags) return null;
  return <span className={`text-sm text-muted ${className}`}>({children})</span>;
}
