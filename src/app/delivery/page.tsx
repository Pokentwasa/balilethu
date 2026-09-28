import { pageMetadata } from "@/lib/seo";
import { deliveryFacts } from "@/data/facts";
import { quickEnquiryUrl } from "@/lib/whatsapp";
import { PageHeader } from "@/components/PageHeader";
import { DeliverySection } from "@/components/DeliverySection";
import { Faq } from "@/components/Faq";
import { CTASection } from "@/components/CTASection";
import { MobileCtaBar } from "@/components/MobileCtaBar";

export const metadata = pageMetadata({
  title: "Livestock Delivery in KZN & the Eastern Cape",
  description:
    "Balilethu Livestock delivers in KwaZulu-Natal and the Eastern Cape (up to Mount Frere). Collection with own transport from other provinces. No export sales.",
  path: "/delivery",
});

const faqs = [
  { question: "Which areas do you deliver to?", answer: deliveryFacts.summary },
  { question: "I'm in another province. Can I still buy?", answer: deliveryFacts.otherProvinces },
  { question: "Do you deliver to neighbouring countries?", answer: deliveryFacts.crossBorder },
  { question: "What paperwork do I get?", answer: deliveryFacts.certificate },
  { question: "Why can't livestock be exported?", answer: deliveryFacts.fmd },
  {
    question: "Does my order size affect delivery?",
    answer: "Minimum quantities can apply to some livestock and packages. Confirm the minimum and delivery arrangements for your order when you enquire.",
  },
];

export default function DeliveryPage() {
  return (
    <>
      <PageHeader
        title={<>How your livestock <em>gets to you</em></>}
        intro={<p>{deliveryFacts.summary} Collection for everyone else.</p>}
        crumbs={[{ name: "Delivery", path: "/delivery" }]}
      />
      <DeliverySection showLink={false} />
      <section aria-labelledby="delivery-faq" className="py-16 md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 id="delivery-faq" className="text-4xl sm:text-5xl lg:col-span-5">Delivery questions</h2>
          <div className="lg:col-span-7">
            <Faq faqs={faqs} />
          </div>
        </div>
      </section>
      <CTASection heading="Check delivery for your area" copy="Send us your location and what you need — we'll confirm delivery or collection." />
      <MobileCtaBar whatsappHref={quickEnquiryUrl("Delivery to my area")} />
    </>
  );
}
