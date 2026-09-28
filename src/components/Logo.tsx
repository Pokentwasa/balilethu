import Link from "next/link";

/** Wordmark. Replace with the client's logo file when supplied. */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "light" ? "text-bone" : "text-forest-deep";
  return (
    <Link href="/" className={`inline-flex items-baseline gap-2 ${color}`} aria-label="Balilethu Livestock — home">
      <span className="font-serif text-[1.55rem] leading-none tracking-[-0.02em]">Balilethu</span>
      <span className="text-[0.62rem] font-semibold tracking-[0.22em] uppercase opacity-80">Livestock</span>
    </Link>
  );
}
