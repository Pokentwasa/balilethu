import Link from "next/link";
import { quickEnquiryUrl } from "@/lib/whatsapp";
import { ArrowRight, WhatsAppIcon } from "./Icons";

/** Closing call to action: one flat forest-green block. */
export function CTASection({
  heading = "Looking for livestock?",
  copy = "Tell us what you need and we'll help you check current availability.",
  subject,
}: {
  heading?: string;
  copy?: string;
  subject?: string;
}) {
  return (
    <section aria-labelledby="final-cta" className="bg-forest text-bone">
      <div className="container-x py-20 md:py-28">
        <div className="max-w-3xl" data-reveal>
          <h2 id="final-cta" className="text-5xl leading-[0.98] sm:text-6xl lg:text-[5rem]">
            {heading}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-bone/85 sm:text-xl">{copy}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a href={quickEnquiryUrl(subject)} target="_blank" rel="noopener noreferrer" className="btn btn-light">
              <WhatsAppIcon className="size-5" />
              Enquire on WhatsApp
            </a>
            <Link href="/livestock" className="arrow-link text-bone">
              View livestock <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
