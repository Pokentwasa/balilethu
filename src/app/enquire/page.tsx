import { pageMetadata } from "@/lib/seo";
import { EnquirySection } from "@/components/EnquirySection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProcessSteps } from "@/components/ProcessSteps";

export const metadata = pageMetadata({
  title: "WhatsApp Livestock Enquiry",
  description:
    "Choose livestock type, breed, quantity and location, and send a ready-made WhatsApp enquiry to Balilethu Livestock.",
  path: "/enquire",
});

export default async function EnquirePage({ searchParams }: { searchParams: Promise<{ type?: string; item?: string }> }) {
  const { type, item } = await searchParams;
  return (
    <>
      <div className="bg-forest pt-28 md:pt-32">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "WhatsApp enquiry", path: "/enquire" }]} tone="light" />
        </div>
      </div>
      <EnquirySection headingLevel="h1" initialCategory={type} initialItem={item} />
      <ProcessSteps tone="bone" />
    </>
  );
}
