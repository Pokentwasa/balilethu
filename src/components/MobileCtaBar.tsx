import Link from "next/link";
import { WhatsAppIcon } from "./Icons";

/**
 * Sticky bottom CTA on small screens. Primary action opens WhatsApp with a
 * pre-filled message; secondary goes to the structured enquiry builder.
 */
export function MobileCtaBar({
  whatsappHref,
  label = "Enquire on WhatsApp",
  secondary,
}: {
  whatsappHref: string;
  label?: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bone/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
      <div className="flex gap-2">
        {secondary && (
          <Link href={secondary.href} className="btn btn-outline !min-h-12 flex-1 !px-3 text-sm whitespace-nowrap text-forest">
            {secondary.label}
          </Link>
        )}
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary !min-h-12 flex-[1.6] !px-3 text-sm whitespace-nowrap">
          <WhatsAppIcon className="size-5" />
          {label}
        </a>
      </div>
    </div>
  );
}
