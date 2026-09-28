import { getCategories, getStock } from "@/lib/content";
import { EnquiryBuilder, type EnquiryOptions } from "./EnquiryBuilder";
import { SectionHeading } from "./SectionHeading";

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
  return (
    <section id="enquiry" aria-labelledby="enquiry-heading" className="scroll-mt-20 bg-forest py-20 text-bone md:py-28">
      <div className="container-x">
        <SectionHeading
          id="enquiry-heading"
          as={headingLevel}
          tone="light"
          title="Tell us what you need."
          intro="Pick the livestock, quantity and where you are. We'll turn it into a WhatsApp message so the team can reply with availability and pricing."
          align="split"
        />
        <div className="mt-12">
          <EnquiryBuilder options={options} initialCategory={initialCategory} initialItem={initialItem} tone="dark" />
        </div>
      </div>
    </section>
  );
}
