"use client";

import { useEffect } from "react";

/**
 * Restrained hero motion: headline line reveal and slow image parallax/scale.
 * GSAP is loaded lazily after first paint so it never blocks LCP.
 */
export function HeroMotion({ scope }: { scope: string }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const root = document.querySelector(scope);
      if (!root) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-hero-line]",
          { yPercent: 100 },
          { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.09, delay: 0.05 },
        );
        gsap.fromTo(
          "[data-hero-fade]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.45 },
        );
        gsap.fromTo("[data-hero-media]", { scale: 1.05 }, { scale: 1, duration: 2.4, ease: "power2.out" });
        gsap.to("[data-hero-parallax]", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
        });
      }, root);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [scope]);

  return null;
}
