import Link from "next/link";
import type { StarterProduct } from "@/lib/types";
import { ContentFlag } from "./ContentFlag";
import { Media } from "./Media";
import { ArrowRight } from "./Icons";

export function BeginnerSupport({ products, showCta = true }: { products: StarterProduct[]; showCta?: boolean }) {
  return (
    <section aria-labelledby="starting-heading" className="bg-coffee py-20 text-bone md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 id="starting-heading" className="text-[2.4rem] leading-[1.02] sm:text-5xl lg:text-6xl">
              Starting with livestock?
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-bone/80">
              Balilethu started by supplying bottle-fed calves to people raising animals for the first time. Where available, we
              can help you get set up with supporting products and practical guidance — ask when you enquire.
            </p>
            <div className="mt-8 overflow-hidden" data-reveal="clip">
              <Media image={null} slot="sections/beginner" alt="Bottle-feeding a young calf" sizes="(min-width: 1024px) 35vw, 100vw" className="aspect-[16/11]" />
            </div>
            {showCta && (
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link href="/starter-products" className="btn btn-light">
                  View starter products
                </Link>
                <Link href="/enquire?type=calves#enquiry" className="arrow-link text-bone">
                  Get started <ArrowRight className="size-4" />
                </Link>
              </div>
            )}
          </div>
        </div>

        <ul className="grid content-start gap-x-10 border-t border-bone/20 sm:grid-cols-2 lg:col-span-7">
          {products.map((p) => (
            <li key={p.slug} className="border-b border-bone/20 py-5">
              <h3 className="font-serif text-2xl">
                {p.name} {!p.confirmed && <ContentFlag />}
              </h3>
              <p className="mt-1 leading-relaxed text-bone/75">{p.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
