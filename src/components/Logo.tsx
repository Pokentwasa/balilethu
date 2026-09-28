import Link from "next/link";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "light" ? "text-bone" : "text-forest";
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${color}`} aria-label="Balilethu Livestock — home">
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
        <circle cx="16" cy="16" r="15.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 20c3-4 6.5-6 10-6s7 2 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9.5 23.5c2-2 4.2-3 6.5-3s4.5 1 6.5 3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="9.5" r="2.4" fill="currentColor" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.3rem] tracking-tight">Balilethu</span>
        <span className="mt-0.5 text-[0.58rem] font-semibold tracking-[0.2em] uppercase opacity-80">Livestock</span>
      </span>
    </Link>
  );
}
