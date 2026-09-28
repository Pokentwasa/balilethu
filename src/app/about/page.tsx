import Link from "next/link";
import { getCategories } from "@/lib/content";
import { categoryHref } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { businessTimeline, deliveryFacts } from "@/data/facts";
import { PageHeader } from "@/components/PageHeader";
import { Media } from "@/components/Media";
import { BuyingSteps } from "@/components/BuyingDelivery";
import { ArrowRight } from "@/components/Icons";
import { CTASection } from "@/components/CTASection";

export const metadata = pageMetadata({
  title: "About Balilethu Livestock",
  description:
    "Balilethu Livestock supplies calves, cattle, sheep, goats and poultry to farmers, households and growing agricultural businesses in KwaZulu-Natal and the Eastern Cape.",
  path: "/about",
});

export default async function AboutPage() {
  const categories = await getCategories();
  const serves = [
    { title: "Farmers", body: "Building or growing a herd or flock with breeding cattle, pregnant cows, sheep and goats." },
    { title: "Households", body: "Keeping a few animals or layers for their own use." },
    { title: "Growing agricultural businesses", body: "Raising calves or poultry as a business and needing regular supply." },
    { title: "First-time buyers", body: "Starting with livestock and wanting practical guidance along the way." },
  ];

  return (
    <>
      <PageHeader
        title="About Balilethu"
        intro={
          <p>
            Livestock and poultry supplier based in Mount Frere, Eastern Cape, delivering across KwaZulu-Natal and the Eastern
            Cape.
          </p>
        }
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <div data-reveal="clip">
        <Media image={null} slot="sections/about" alt="Brown cow looking over a wooden fence" sizes="100vw" priority className="aspect-[4/3] sm:aspect-[21/9]" />
      </div>

      <section aria-labelledby="who-heading" className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <h2 id="who-heading" className="text-4xl sm:text-5xl lg:col-span-4">Who we supply</h2>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-8">
            {serves.map((s) => (
              <li key={s.title} className="border-t border-line py-6">
                <h3 className="font-serif text-2xl">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="what-heading" className="border-t border-line py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <h2 id="what-heading" className="text-4xl sm:text-5xl lg:col-span-4">What we provide</h2>
          <div className="lg:col-span-8">
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={categoryHref(c)} className="arrow-link font-serif text-2xl font-normal">
                    {c.name} <ArrowRight className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Alongside livestock and poultry, we offer starter packages and practical guidance for new buyers. {deliveryFacts.certificate}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="history-heading" className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <h2 id="history-heading" className="text-4xl sm:text-5xl lg:col-span-4">How the business has grown</h2>
          <ol className="lg:col-span-8">
            {businessTimeline.map((t) => (
              <li key={t.year} className="grid grid-cols-[6rem_1fr] gap-6 border-t border-line py-6 sm:grid-cols-[9rem_1fr]">
                <span className="font-serif text-3xl text-forest">{t.year}</span>
                <p className="text-lg leading-relaxed text-ink-soft">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="buying-heading" className="border-t border-line py-16 md:py-24">
        <div className="container-x">
          <h2 id="buying-heading" className="mb-10 text-4xl sm:text-5xl">
            How buying works
          </h2>
          <BuyingSteps />
        </div>
      </section>

      <section aria-labelledby="regions-heading" className="border-t border-line py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <h2 id="regions-heading" className="text-4xl sm:text-5xl lg:col-span-4">Where we operate</h2>
          <div className="space-y-4 text-lg leading-relaxed text-ink-soft lg:col-span-8">
            <p>
              Balilethu Livestock is registered in Mount Frere, Eastern Cape. {deliveryFacts.summary} {deliveryFacts.otherProvinces}
            </p>
            <p>{deliveryFacts.crossBorder}</p>
            <Link href="/delivery" className="arrow-link text-forest">
              Delivery information <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
