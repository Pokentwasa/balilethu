import Image from "next/image";
import Link from "next/link";

/**
 * Logo slot. Shows the client's logo from public/images/logo.(svg|png|webp)
 * when present (resolved on the server and passed in as `src`); otherwise the
 * business name as plain text.
 */
export function Logo({ tone = "dark", src }: { tone?: "dark" | "light"; src?: string | null }) {
  const color = tone === "light" ? "text-bone" : "text-forest-deep";
  return (
    <Link href="/" className={`inline-flex items-center ${color}`} aria-label="Balilethu Livestock — home">
      {src ? (
        <Image src={src} alt="Balilethu Livestock" width={200} height={48} priority className="h-10 w-auto" />
      ) : (
        <span className="font-serif text-[1.3rem] tracking-tight">Balilethu Livestock</span>
      )}
    </Link>
  );
}
