import { pageMetadata } from "@/lib/seo";
import { EnquirySection } from "@/components/EnquirySection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BuyingSteps } from "@/components/BuyingDelivery";

export const metadata = pageMetadata({
  title: "WhatsApp Livestock Enquiry",
  description:
    "Choose livestock, quantity and location, and send a ready-made WhatsApp enquiry to Balilethu Livestock.",
  path: "/enquire",
});

export default async function EnquirePage({ searchParams }: { searchParams: Promise<{ type?: string; item?: string }> }) {
  const { type, item } = await searchParams;
  return (
    <>
      <div className="bg-forest pt-24 md:pt-28">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "WhatsApp enquiry", path: "/enquire" }]} tone="light" />
        </div>
      </div>
      <EnquirySection headingLevel="h1" initialCategory={type} initialItem={item} />
      <section aria-labelledby="after-heading" className="py-16 md:py-24">
        <div className="container-x">
          <h2 id="after-heading" className="mb-10 text-3xl sm:text-4xl">
            What happens next
          </h2>
          <BuyingSteps />
        </div>
      </section>
    </>
  );
}
