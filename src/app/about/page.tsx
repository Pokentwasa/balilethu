import Link from "next/link";
import { getCategories } from "@/lib/content";
import { categoryHref } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { quickEnquiryUrl } from "@/lib/whatsapp";
import { businessTimeline, deliveryFacts } from "@/data/facts";
import { PageHeader } from "@/components/PageHeader";
import { Media } from "@/components/Media";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CTASection } from "@/components/CTASection";
import { MobileCtaBar } from "@/components/MobileCtaBar";

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
        title={<>A livestock supplier <em>you deal with directly.</em></>}
        intro={
          <p>
            Balilethu Livestock supplies calves, cattle, sheep, goats and poultry — with delivery in KwaZulu-Natal and the Eastern
            Cape, and support for people buying livestock for the first time.
          </p>
        }
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <div className="container-x">
        <div className="overflow-hidden rounded-sm" data-reveal="clip">
          <Media image={null} slot="sections/about" alt="Balilethu Livestock" seed="about-hero" tone="dry" sizes="100vw" priority className="aspect-[4/3] sm:aspect-[21/9]" caption="Balilethu team / farm" />
        </div>
      </div>

      <section aria-labelledby="who-heading" className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <h2 id="who-heading" className="text-4xl sm:text-5xl lg:col-span-4">Who we supply</h2>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-8">
            {serves.map((s) => (
              <li key={s.title} className="border-t border-line py-6" data-reveal>
                <h3 className="font-serif text-2xl">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="what-heading" className="bg-paper py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <h2 id="what-heading" className="text-4xl sm:text-5xl lg:col-span-4">What we provide</h2>
          <div className="lg:col-span-8">
            <ul className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={categoryHref(c)} className="inline-flex min-h-12 items-center rounded-sm border border-line bg-bone px-5 font-serif text-xl hover:border-forest/40">
                    {c.name}
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
              <li key={t.year} className="grid grid-cols-[6rem_1fr] gap-6 border-t border-line py-6 sm:grid-cols-[9rem_1fr]" data-reveal>
                <span className="font-serif text-3xl text-forest">{t.year}</span>
                <p className="text-lg leading-relaxed text-ink-soft">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ProcessSteps />

      <section aria-labelledby="regions-heading" className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <h2 id="regions-heading" className="text-4xl sm:text-5xl lg:col-span-4">Where we operate</h2>
          <div className="space-y-4 text-lg leading-relaxed text-ink-soft lg:col-span-8">
            <p>
              Balilethu Livestock is registered in Mount Frere, Eastern Cape. {deliveryFacts.summary} {deliveryFacts.otherProvinces}
            </p>
            <p>{deliveryFacts.crossBorder}</p>
            <Link href="/delivery" className="inline-block font-semibold text-forest link-underline">
              Delivery &amp; collection details
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
      <MobileCtaBar whatsappHref={quickEnquiryUrl()} secondary={{ label: "Browse", href: "/livestock" }} />
    </>
  );
}
