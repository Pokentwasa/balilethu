import Link from "next/link";
import { getStarterProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { getCategorySync } from "@/lib/content";
import { categoryHref } from "@/lib/routes";
import { quickEnquiryUrl } from "@/lib/whatsapp";
import { PageHeader } from "@/components/PageHeader";
import { ContentFlag } from "@/components/ContentFlag";
import { Faq } from "@/components/Faq";
import { CTASection } from "@/components/CTASection";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { Media } from "@/components/Media";

export const metadata = pageMetadata({
  title: "Starter Products & Beginner Support",
  description:
    "Starting with livestock? Balilethu Livestock offers starter packages and practical guidance for first-time buyers of calves and poultry.",
  path: "/starter-products",
});

const faqs = [
  {
    question: "I've never kept livestock. Can I still buy?",
    answer:
      "Yes. Balilethu started by supplying bottle-fed calves to people raising animals for the first time. Tell us it's your first purchase when you enquire and we'll talk you through what to have ready.",
  },
  {
    question: "What are starter packages?",
    answer:
      "Grouped livestock orders sized for a first purchase — for example a set number of calves. Package contents and prices change, so ask for the current options.",
  },
];

export default async function StarterProductsPage() {
  const products = await getStarterProducts();
  return (
    <>
      <PageHeader
        title={<>Starting <em>with livestock?</em></>}
        intro={<p>Practical support for first-time buyers: starter packages, set-up guidance and supporting products where available.</p>}
        crumbs={[{ name: "Starter products", path: "/starter-products" }]}
      />

      <div className="container-x">
        <div className="overflow-hidden" data-reveal="clip">
          <Media image={null} slot="sections/starter-products" alt="Starter support for new livestock owners" sizes="100vw" priority className="aspect-[4/3] sm:aspect-[21/9]" />
        </div>
      </div>

      <section aria-labelledby="products-heading" className="py-16 md:py-24">
        <div className="container-x">
          <h2 id="products-heading" className="text-4xl sm:text-5xl">Products &amp; support</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Ask about any of these when you enquire. Availability of supporting products varies.
          </p>
          <ul className="mt-12 grid gap-x-12 border-t border-tan sm:grid-cols-2">
            {products.map((p) => (
              <li key={p.slug} id={p.slug} className="border-b border-tan py-6">
                <h3 className="font-serif text-2xl">
                  {p.name} {!p.confirmed && <ContentFlag />}
                </h3>
                <p className="mt-1 leading-relaxed text-muted">{p.description}</p>
                <p className="mt-2 text-[0.95rem] text-muted">
                  For:{" "}
                  {p.relatesTo.map((slug, i) => {
                    const c = getCategorySync(slug);
                    return (
                      <span key={slug}>
                        {i > 0 && ", "}
                        <Link href={categoryHref(c)} className="text-forest underline underline-offset-4">
                          {c.name}
                        </Link>
                      </span>
                    );
                  })}
                </p>
              </li>
            ))}
          </ul>
          <a href={quickEnquiryUrl("Starter products / first-time buyer")} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-12">
            Ask about starter options
          </a>
        </div>
      </section>

      <section aria-labelledby="starter-faq" className="border-t border-tan py-16 md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 id="starter-faq" className="text-4xl sm:text-5xl lg:col-span-5">First-time buyer questions</h2>
          <div className="lg:col-span-7">
            <Faq faqs={faqs} />
          </div>
        </div>
      </section>

      <CTASection heading="Ready to get started?" subject="Starter package" />
      <MobileCtaBar whatsappHref={quickEnquiryUrl("Starter products / first-time buyer")} />
    </>
  );
}
