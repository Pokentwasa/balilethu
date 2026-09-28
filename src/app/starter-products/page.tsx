import { getStarterProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { quickEnquiryUrl } from "@/lib/whatsapp";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentFlag } from "@/components/ContentFlag";
import { Faq } from "@/components/Faq";
import { CTASection } from "@/components/CTASection";
import { Media } from "@/components/Media";
import { ArrowRight, WhatsAppIcon } from "@/components/Icons";

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
      "Yes. Balilethu started by supplying bottle-fed calves to people raising animals for the first time. Say it's your first purchase when you enquire and the team will tell you what to have ready.",
  },
  {
    question: "What are starter packages?",
    answer:
      "Grouped livestock orders sized for a first purchase, for example a set number of calves. Package contents and prices change, so ask for the current options.",
  },
];

export default async function StarterProductsPage() {
  const products = await getStarterProducts();
  return (
    <>
      <section aria-labelledby="starter-heading" className="pt-16 lg:grid lg:min-h-[92svh] lg:grid-cols-12 lg:pt-[4.5rem]">
        <div className="relative h-[60svh] overflow-hidden lg:col-span-6 lg:h-auto" data-reveal="clip">
          <Media
            image={null}
            slot="categories/calves"
            alt="Young cattle feeding on hay"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="absolute inset-0"
          />
        </div>
        <div className="container-x py-12 lg:col-span-5 lg:col-start-8 lg:max-w-none lg:px-0 lg:py-16 lg:pr-14">
          <Breadcrumbs items={[{ name: "Starter products", path: "/starter-products" }]} />
          <h1 id="starter-heading" className="mt-10 text-[3rem] leading-[0.94] sm:text-7xl lg:text-[5rem]">
            Starting with calves?
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink-soft">
            Balilethu began by supplying bottle-fed calves to first-time buyers. Alongside livestock, the team can advise on
            practical products and set-up. Availability of supporting products varies.
          </p>

          <ul className="mt-10 border-t border-ink">
            {products.map((p) => (
              <li key={p.slug} id={p.slug} className="border-b border-line">
                <a
                  href={quickEnquiryUrl(p.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 py-4"
                >
                  <span>
                    <span className="flex items-center gap-3 font-serif text-2xl">
                      {p.name}
                      {!p.confirmed && <ContentFlag />}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">{p.description}</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-forest transition-transform group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href={quickEnquiryUrl("Starter products / first-time buyer")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-10"
          >
            <WhatsAppIcon className="size-5" /> Ask about starter options
          </a>
        </div>
      </section>

      <section aria-labelledby="starter-faq" className="border-t border-line py-16 md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 id="starter-faq" className="text-3xl sm:text-4xl lg:col-span-4">
            First-time buyer questions
          </h2>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq faqs={faqs} />
          </div>
        </div>
      </section>

      <CTASection heading="Ready to start?" subject="Starter package" />
    </>
  );
}
