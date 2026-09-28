import Link from "next/link";
import type { StockImage } from "@/lib/types";
import { quickEnquiryUrl } from "@/lib/whatsapp";
import { Media } from "./Media";
import { HeroMotion } from "./HeroMotion";
import { ArrowRight, WhatsAppIcon } from "./Icons";

export function Hero({ image }: { image: StockImage | null }) {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest text-bone">
      <div data-hero-parallax className="absolute inset-0 -z-20 will-change-transform">
        <div data-hero-media className="absolute inset-0 will-change-transform">
          <Media
            image={image}
            slot="hero/hero"
            alt="Cattle on a farm — Balilethu Livestock"
            sizes="100vw"
            priority
            className="absolute inset-0"
            imgClassName="object-[68%_center] lg:object-center"
          />
        </div>
      </div>
      {/* Flat readability overlay — no gradient */}
      <div className="absolute inset-0 -z-10 bg-ink/45" />

      <div className="container-x pt-32 pb-14 md:pb-20">
        <div className="max-w-5xl">
          <h1 id="hero-heading" className="text-[3.1rem] leading-[0.95] sm:text-7xl lg:text-[7rem]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block">Quality livestock.</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block italic">Straightforward buying.</span>
            </span>
          </h1>
          <p data-hero-fade className="mt-7 max-w-xl text-lg leading-relaxed text-bone/85 sm:text-xl">
            Browse calves, cattle, sheep, goats and poultry available from Balilethu Livestock.
          </p>
          <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/livestock" className="btn btn-light">
              View livestock
            </Link>
            <a href={quickEnquiryUrl()} target="_blank" rel="noopener noreferrer" className="arrow-link text-bone">
              <WhatsAppIcon className="size-5" />
              Enquire on WhatsApp <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
        <p
          data-hero-fade
          className="mt-14 border-t border-bone/25 pt-5 text-[0.95rem] text-bone/85"
        >
          Livestock &middot; Poultry &middot; Delivery in KZN and the Eastern Cape &middot; Support for first-time buyers
        </p>
      </div>
      <HeroMotion scope="#hero" />
    </section>
  );
}
