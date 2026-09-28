import Link from "next/link";
import type { StockImage } from "@/lib/types";
import { quickEnquiryUrl } from "@/lib/whatsapp";
import { Media } from "./Media";
import { HeroMotion } from "./HeroMotion";
import { ArrowRight, WhatsAppIcon } from "./Icons";

export function Hero({ image }: { image: StockImage | null }) {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest-deep text-bone">
      <div data-hero-parallax className="absolute inset-0 -z-20 will-change-transform">
        <div data-hero-media className="absolute inset-0 will-change-transform">
          <Media
            image={image}
            slot="hero/hero"
            alt="Cattle on a farm — Balilethu Livestock"
            seed="hero-farm"
            tone="dawn"
            sizes="100vw"
            priority
            className="absolute inset-0"
            imgClassName="object-[68%_center] lg:object-center"
            caption="Hero — cattle in the field"
            captionClassName="top-24 right-5"
          />
        </div>
      </div>
      {/* Readability overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep via-forest-deep/55 to-forest-deep/10" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-forest-deep/50 to-transparent" />

      <div className="container-x pt-32 pb-14 md:pb-20">
        <div className="max-w-5xl">
          <p data-hero-fade className="eyebrow mb-6 text-sand">Balilethu Livestock</p>
          <h1 id="hero-heading" className="text-[3.1rem] leading-[0.95] font-light sm:text-7xl lg:text-[7.25rem]">
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
          <div data-hero-fade className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/livestock" className="btn btn-light group">
              View Livestock
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href={quickEnquiryUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-bone">
              <WhatsAppIcon className="size-5" />
              Enquire on WhatsApp
            </a>
          </div>
        </div>
        <p
          data-hero-fade
          className="mt-14 flex flex-wrap gap-x-4 gap-y-1 border-t border-bone/20 pt-5 text-xs font-medium tracking-[0.2em] text-bone/70 uppercase"
        >
          <span>Livestock</span><span aria-hidden="true">•</span>
          <span>Poultry</span><span aria-hidden="true">•</span>
          <span>Delivery</span><span aria-hidden="true">•</span>
          <span>Farmer support</span>
        </p>
      </div>
      <HeroMotion scope="#hero" />
    </section>
  );
}
