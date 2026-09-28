"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { StockImage } from "@/lib/types";
import { Plate } from "./Plate";
import { ArrowRight } from "./Icons";

export interface IndexEntry {
  slug: string;
  name: string;
  line: string;
  href: string;
  image: StockImage | null;
}

/**
 * One block of the category index: a large photograph beside a numbered
 * list. Hovering or focusing a row brings its photograph forward.
 */
export function CategoryIndexBlock({
  label,
  entries,
  start = 1,
  reverse = false,
  size = "large",
}: {
  label: string;
  entries: IndexEntry[];
  start?: number;
  reverse?: boolean;
  size?: "large" | "small";
}) {
  const [active, setActive] = useState(0);
  const large = size === "large";

  return (
    <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
      {/* Photograph (desktop) */}
      <div
        className={`relative hidden overflow-hidden bg-sand lg:block ${
          large ? "aspect-[6/5] lg:col-span-7" : "aspect-[3/2] lg:col-span-6 lg:col-start-7"
        } ${reverse ? "lg:order-2" : ""}`}
        data-reveal="clip"
      >
        {entries.map((e, i) => (
          <div
            key={e.slug}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
          >
            {e.image ? (
              <Image src={e.image.src} alt={e.image.alt} fill sizes="(min-width: 1024px) 55vw, 0px" className="object-cover" />
            ) : (
              <Plate text={e.name} />
            )}
          </div>
        ))}
      </div>

      {/* Index list */}
      <div className={`flex flex-col justify-end ${large ? "lg:col-span-5" : "lg:col-span-5 lg:row-start-1"}`}>
        <h3 className="label-sm mb-4 text-clay">{label}</h3>
        <ul className="border-b border-line">
          {entries.map((e, i) => (
            <li key={e.slug} className="border-t border-line">
              <Link
                href={e.href}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 py-4 lg:grid-cols-[2.5rem_1fr_auto] lg:py-6"
              >
                {/* Mobile thumbnail / desktop number */}
                <span className="relative block size-[4.5rem] overflow-hidden bg-sand lg:hidden">
                  {e.image ? (
                    <Image src={e.image.src} alt="" fill sizes="72px" className="object-cover" />
                  ) : (
                    <span className="absolute inset-0 bg-sand" />
                  )}
                </span>
                <span className="hidden font-serif text-lg text-muted tabular-nums lg:block">
                  {String(start + i).padStart(2, "0")}
                </span>
                <span>
                  <span
                    className={`block font-serif leading-none transition-colors ${
                      large ? "text-3xl lg:text-[3.25rem]" : "text-3xl lg:text-[2.6rem]"
                    } ${i === active ? "lg:text-ink" : "lg:text-ink/70"} group-hover:text-ink`}
                  >
                    {e.name}
                  </span>
                  <span className="mt-2 block text-sm text-muted">{e.line}</span>
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold text-forest">
                  <span className="hidden sm:inline">View</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
