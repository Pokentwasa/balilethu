import Link from "next/link";
import { getCategories, getFeaturedStock } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { CategoryIndex } from "@/components/CategoryIndex";
import { StockCard } from "@/components/StockCard";
import { BrandStory } from "@/components/BrandStory";
import { RecentDeliveries } from "@/components/RecentDeliveries";
import { BuyingDelivery } from "@/components/BuyingDelivery";
import { EnquirySection } from "@/components/EnquirySection";
import { ArrowRight } from "@/components/Icons";

export const metadata = {
  ...pageMetadata({
    title: "Balilethu Livestock | Livestock & Poultry for Sale in South Africa",
    description:
      "Browse calves, cattle, sheep, goats, layers, broilers and day-old chicks from Balilethu Livestock. Delivery in KwaZulu-Natal and the Eastern Cape. Enquire on WhatsApp.",
    path: "/",
  }),
  title: { absolute: "Balilethu Livestock | Livestock & Poultry for Sale in South Africa" },
};

export default async function HomePage() {
  const [categories, featured] = await Promise.all([getCategories(), getFeaturedStock(3)]);

  return (
    <>
      <Hero />
      <CategoryIndex categories={categories} />

      <section aria-labelledby="stock-heading" className="border-t border-line py-20 md:py-32">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="stock-heading" className="text-4xl sm:text-5xl lg:text-6xl" data-reveal>
              Selected stock
            </h2>
            <Link href="/livestock" className="arrow-link text-forest">
              All listings <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-12">
            {featured.map((item, i) => (
              <li key={item.slug} className={i === 0 ? "lg:col-span-5" : i === 1 ? "lg:col-span-4 lg:mt-24" : "lg:col-span-3 lg:mt-48"}>
                <StockCard item={item} aspect={i === 0 ? "aspect-[4/5]" : i === 1 ? "aspect-[3/4]" : "aspect-[4/5]"} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BrandStory />
      <RecentDeliveries />
      <BuyingDelivery />
      <EnquirySection />
    </>
  );
}
