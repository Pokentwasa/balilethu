import Link from "next/link";
import { deliveryFacts } from "@/data/facts";
import { Media } from "./Media";
import { ArrowRight } from "./Icons";

/** The one large editorial moment on the homepage: photograph + statement, no UI. */
export function BrandStory() {
  return (
    <section aria-labelledby="story-heading" className="lg:grid lg:grid-cols-12">
      <div className="relative h-[70svh] overflow-hidden lg:col-span-7 lg:h-auto lg:min-h-[92svh]" data-reveal="clip">
        <Media
          image={null}
          slot="sections/about"
          alt="Brown cow looking over a wooden fence"
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="absolute inset-0"
        />
      </div>
      <div className="bg-earth text-bone lg:col-span-5">
        <div className="flex h-full flex-col justify-between gap-16 px-5 py-16 sm:px-10 lg:px-14 lg:py-20">
          <h2 id="story-heading" className="text-[2.6rem] leading-[1.02] sm:text-5xl xl:text-[3.6rem]" data-reveal>
            Built for people starting, growing and maintaining livestock operations.
          </h2>
          <div className="max-w-md space-y-5 text-[1.05rem] text-bone/85">
            <p>
              Balilethu started in 2023 as Balilethu Calves, supplying bottle-fed calves to people raising their own animals.
              The range has since grown to breeding cattle, pregnant cows, sheep, lambs, goats and poultry.
            </p>
            <p>
              Customers include households keeping a few animals, farmers building a herd, and small businesses raising calves
              or poultry.
            </p>
            <p>{deliveryFacts.certificate}</p>
            <div className="flex flex-col items-start gap-1 pt-4">
              <Link href="/about" className="arrow-link text-bone">
                About Balilethu <ArrowRight className="size-4" />
              </Link>
              <Link href="/starter-products" className="arrow-link text-bone">
                Starting with calves? Starter products <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
