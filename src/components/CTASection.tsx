import Link from "next/link";
import { quickEnquiryUrl } from "@/lib/whatsapp";
import { Artwork } from "./Artwork";
import { WhatsAppIcon } from "./Icons";

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
    <section aria-labelledby="final-cta" className="relative isolate overflow-hidden bg-forest-deep text-bone">
      <div className="absolute inset-0 -z-10 opacity-35">
        <Artwork seed="final-cta" tone="dusk" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/40" />
      <div className="container-x py-24 md:py-36">
        <div className="max-w-3xl" data-reveal>
          <h2 id="final-cta" className="text-5xl leading-[0.98] sm:text-6xl lg:text-[5.5rem]">
            {heading}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-bone/80 sm:text-xl">{copy}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={quickEnquiryUrl(subject)} target="_blank" rel="noopener noreferrer" className="btn btn-light">
              <WhatsAppIcon className="size-5" />
              Enquire on WhatsApp
            </a>
            <Link href="/livestock" className="btn btn-outline text-bone">
              View Livestock
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
