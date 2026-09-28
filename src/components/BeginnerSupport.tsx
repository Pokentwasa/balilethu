import Link from "next/link";
import type { StarterProduct } from "@/lib/types";
import { Media } from "./Media";
import { ArrowRight } from "./Icons";

export function BeginnerSupport({ products, showCta = true }: { products: StarterProduct[]; showCta?: boolean }) {
  return (
    <section aria-labelledby="starting-heading" className="bg-paper py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28" data-reveal>
            <h2 id="starting-heading" className="text-[2.4rem] leading-[1.02] sm:text-5xl lg:text-6xl">
              Starting with livestock?
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              Balilethu started by supplying bottle-fed calves to people raising animals for the first time. Where available, we
              can help you get set up with supporting products and practical guidance — ask when you enquire.
            </p>
            <div className="mt-8 overflow-hidden rounded-sm" data-reveal="clip">
              <Media image={null} slot="sections/beginner" alt="Bottle-feeding a young calf" seed="beginner-calves" tone="mist" sizes="(min-width: 1024px) 35vw, 100vw" className="aspect-[16/11]" caption="Bottle-feeding calves" />
            </div>
            {showCta && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/starter-products" className="btn btn-primary">
                  View Starter Products <ArrowRight className="size-4" />
                </Link>
                <Link href="/enquire?type=calves#enquiry" className="btn btn-outline text-forest">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>

        <ul className="grid content-start gap-x-10 border-t border-line sm:grid-cols-2 lg:col-span-7">
          {products.map((p) => (
            <li key={p.slug} className="border-b border-line py-5">
              <h3 className="font-serif text-2xl">{p.name}</h3>
              <p className="mt-1 leading-relaxed text-muted">{p.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
