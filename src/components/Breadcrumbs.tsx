import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export function Breadcrumbs({ items, tone = "dark" }: { items: { name: string; path: string }[]; tone?: "dark" | "light" }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  const color = tone === "light" ? "text-bone/70" : "text-muted";
  return (
    <>
      <nav aria-label="Breadcrumb" className={`text-sm ${color}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((it, i) => {
            const last = i === all.length - 1;
            return (
              <li key={it.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={tone === "light" ? "text-bone" : "text-ink"}>
                    {it.name}
                  </span>
                ) : (
                  <>
                    <Link href={it.path} className="link-underline hover:text-current">
                      {it.name}
                    </Link>
                    <span aria-hidden="true" className="opacity-50">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
