import { site } from "@/config/site";
import { getCategories, getStock } from "@/lib/content";
import { whatsappUrl } from "@/lib/whatsapp";
import { EnquiryBuilder, type EnquiryOptions } from "./EnquiryBuilder";
import { ArrowRight } from "./Icons";

export async function getEnquiryOptions(): Promise<EnquiryOptions> {
  const [categories, stock] = await Promise.all([getCategories(), getStock()]);
  const itemsByCategory: EnquiryOptions["itemsByCategory"] = {};
  for (const s of stock) (itemsByCategory[s.category] ??= []).push({ slug: s.slug, name: s.name });
  return {
    categories: categories.map((c) => ({ slug: c.slug, name: c.name, group: c.group })),
    itemsByCategory,
  };
}

export async function EnquirySection({
  initialCategory,
  initialItem,
  headingLevel = "h2",
}: {
  initialCategory?: string;
  initialItem?: string;
  headingLevel?: "h1" | "h2";
}) {
  const options = await getEnquiryOptions();
  const H = headingLevel;
  return (
    <section id="enquiry" aria-labelledby="enquiry-heading" className="scroll-mt-16 bg-forest py-20 text-bone md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <H id="enquiry-heading" className="text-[2.6rem] leading-[1.02] sm:text-5xl lg:text-6xl" data-reveal>
            Looking for something specific?
          </H>
          <p className="mt-6 max-w-sm text-lg text-bone/80">
            Tell us what livestock you&apos;re looking for and where you&apos;re based. The form opens WhatsApp with your
            details filled in.
          </p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="arrow-link mt-8 text-bone"
          >
            Or message {site.contact.whatsappDisplay} directly <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <EnquiryBuilder options={options} initialCategory={initialCategory} initialItem={initialItem} />
        </div>
      </div>
    </section>
  );
}
