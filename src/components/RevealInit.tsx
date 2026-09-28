"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Adds scroll-reveal to elements marked with `data-reveal`.
 * Content stays visible without JS; the `js-reveal` class opts in to the
 * hidden initial state only once we know the observer is running.
 */
export function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    // Anything already on screen is shown immediately to avoid a flash.
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("is-visible");
    });
    root.classList.add("js-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => !el.classList.contains("is-visible") && io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
