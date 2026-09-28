import Link from "next/link";
import { quickEnquiryUrl } from "@/lib/whatsapp";
import { ArrowRight, WhatsAppIcon } from "./Icons";

/** Closing call to action for inner pages. */
export function CTASection({
  heading = "Looking for livestock?",
  copy = "Tell us what you need and we'll check current availability.",
  subject,
}: {
  heading?: string;
  copy?: string;
  subject?: string;
}) {
  return (
    <section aria-labelledby="final-cta" className="border-t border-line">
      <div className="container-x grid gap-8 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2 id="final-cta" className="text-[2.6rem] leading-[1.02] sm:text-6xl" data-reveal>
            {heading}
          </h2>
          <p className="mt-5 max-w-md text-lg text-ink-soft">{copy}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-5 lg:justify-end">
          <a href={quickEnquiryUrl(subject)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <WhatsAppIcon className="size-5" />
            Enquire on WhatsApp
          </a>
          <Link href="/livestock" className="arrow-link text-forest">
            View livestock <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
