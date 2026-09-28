import Link from "next/link";
import { site } from "@/config/site";
import { categories } from "@/data/categories";
import { deliveryFacts } from "@/data/facts";
import { categoryHref } from "@/lib/routes";
import { whatsappUrl } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./Icons";

export function Footer() {
  const livestock = categories.filter((c) => c.group === "livestock");
  const poultry = categories.filter((c) => c.group === "poultry");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink pb-28 text-bone/75 lg:pb-0">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-xs">
            Livestock and poultry supplier. {site.contact.locality}, {site.contact.region}.
          </p>
          <a
            href={whatsappUrl()}
            className="arrow-link mt-5 text-bone"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="size-5" /> WhatsApp {site.contact.whatsappDisplay}
          </a>
        </div>

        <FooterCol title="Livestock" links={livestock.map((c) => ({ label: c.name, href: categoryHref(c) }))} />
        <FooterCol title="Poultry" links={poultry.map((c) => ({ label: c.name, href: categoryHref(c) }))} />
        <FooterCol
          title="Buying"
          links={[
            { label: "All stock", href: "/livestock" },
            { label: "WhatsApp enquiry", href: "/enquire" },
            { label: "Starter products", href: "/starter-products" },
            { label: "Delivery", href: "/delivery" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ]}
        />
        <div className="md:col-span-2">
          <h2 className="label-sm mb-4 text-bone/50">Delivery</h2>
          <p className="text-sm leading-relaxed">{deliveryFacts.summary}</p>
          <p className="mt-3 text-sm leading-relaxed text-bone/60">No deliveries or sales for export outside South Africa.</p>
        </div>
      </div>
      <div className="border-t border-bone/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-bone/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {site.contact.locality}, {site.contact.region}.
          </p>
          <ul className="flex gap-5">
            <li>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="link-underline">Facebook</a>
            </li>
            <li>
              <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="link-underline">TikTok</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="md:col-span-2">
      <h2 className="label-sm mb-4 text-bone/50">{title}</h2>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-underline hover:text-bone">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
