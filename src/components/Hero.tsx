import Link from "next/link";
import { quickEnquiryUrl } from "@/lib/whatsapp";
import { Media } from "./Media";
import { HeroMotion } from "./HeroMotion";
import { ArrowRight } from "./Icons";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="pt-16 lg:pt-[4.5rem]">
      <div className="lg:grid lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12">
        <div className="container-x flex flex-col justify-between gap-12 pt-10 pb-10 lg:col-span-5 lg:max-w-none lg:pt-12 lg:pr-12 lg:pb-14">
          <p data-hero-fade className="label-sm text-muted">
            Balilethu Livestock <span className="mx-2 text-line">/</span> Mount Frere, Eastern Cape
          </p>

          <div>
            <h1 id="hero-heading" className="text-[3.5rem] leading-[0.9] sm:text-7xl lg:text-[clamp(4rem,5vw,6rem)]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-hero-line className="block">Quality livestock.</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-hero-line className="block italic text-forest">Straightforward buying.</span>
              </span>
            </h1>
            <p data-hero-fade className="mt-8 max-w-md text-lg text-ink-soft">
              Calves, cattle, sheep, goats and poultry, with delivery across KwaZulu-Natal and the Eastern Cape.
            </p>
            <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/livestock" className="btn btn-primary">
                View livestock
              </Link>
              <a href={quickEnquiryUrl()} target="_blank" rel="noopener noreferrer" className="arrow-link text-forest">
                WhatsApp us <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="relative h-[64svh] overflow-hidden lg:col-span-7 lg:h-auto">
          <div data-hero-parallax className="absolute inset-x-0 -top-[6%] -bottom-[6%] will-change-transform">
            <div data-hero-media className="absolute inset-0 will-change-transform">
              <Media
                image={null}
                slot="hero/hero"
                alt="Cattle and calves in a field at sunset"
                sizes="(min-width: 1024px) 60vw, 100vw"
                priority
                className="absolute inset-0"
                imgClassName="object-[72%_center] lg:object-[62%_center]"
              />
            </div>
          </div>
        </div>
      </div>
      <HeroMotion scope="#hero" />
    </section>
  );
}
