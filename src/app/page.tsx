import Link from "next/link";
import { getCategories, getFeaturedStock, getStarterProducts, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { quickEnquiryUrl } from "@/lib/whatsapp";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { StockCard } from "@/components/StockCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ProcessSteps } from "@/components/ProcessSteps";
import { EnquirySection } from "@/components/EnquirySection";
import { WhyBalilethu } from "@/components/WhyBalilethu";
import { BeginnerSupport } from "@/components/BeginnerSupport";
import { DeliverySection } from "@/components/DeliverySection";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { MobileCtaBar } from "@/components/MobileCtaBar";
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
  const [categories, featured, starter, testimonials] = await Promise.all([
    getCategories(),
    getFeaturedStock(6),
    getStarterProducts(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero image={null} />
      <CategoryGrid categories={categories} />

      <section aria-labelledby="stock-heading" className="border-t border-line bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            id="stock-heading"
            eyebrow="Current stock"
            title="Available livestock"
            intro="A selection of what Balilethu supplies. Prices and numbers change with each intake — every enquiry is confirmed against current stock."
            align="split"
          >
            <Link href="/livestock" className="mt-6 inline-flex items-center gap-2 font-semibold text-forest link-underline">
              Browse all stock <ArrowRight className="size-4" />
            </Link>
          </SectionHeading>
          <ul className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <li key={item.slug}>
                <StockCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProcessSteps />
      <EnquirySection />
      <WhyBalilethu />
      <BeginnerSupport products={starter} />
      <DeliverySection />
      <Testimonials testimonials={testimonials} />
      <CTASection />
      <MobileCtaBar whatsappHref={quickEnquiryUrl()} secondary={{ label: "Browse", href: "/livestock" }} />
    </>
  );
}
