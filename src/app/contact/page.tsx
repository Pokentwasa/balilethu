import { site } from "@/config/site";
import { getCategories } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/whatsapp";
import { deliveryFacts } from "@/data/facts";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/Icons";

export const metadata = pageMetadata({
  title: "Contact Balilethu Livestock",
  description: "Contact Balilethu Livestock on WhatsApp to enquire about calves, cattle, sheep, goats and poultry, or to check delivery to your area.",
  path: "/contact",
});

export default async function ContactPage() {
  const categories = await getCategories();
  const interests = [...categories.map((c) => c.name), "Starter products", "Something else"];
  const { contact } = site;

  return (
    <>
      <PageHeader
        title="Contact"
        intro={<p>WhatsApp is the quickest way to reach the team. Send what you need and where you are.</p>}
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="pb-20 md:pb-28">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-sm text-muted">WhatsApp</p>
            <a
              href={whatsappUrl(`Hi ${site.name}, I'd like to enquire about livestock.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-1 inline-flex items-center gap-4 font-serif text-5xl text-forest sm:text-6xl"
            >
              {contact.whatsappDisplay}
              <WhatsAppIcon className="size-8 transition-transform group-hover:scale-110" />
            </a>

            <dl className="mt-12 border-t border-ink">
              {contact.phone && <Row label="Phone">{contact.phone}</Row>}
              {contact.email && (
                <Row label="Email">
                  <a href={`mailto:${contact.email}`} className="link-underline">
                    {contact.email}
                  </a>
                </Row>
              )}
              {contact.hours && <Row label="Hours">{contact.hours}</Row>}
              <Row label="Location">
                {contact.locality}, {contact.region}
              </Row>
              <Row label="Delivery">{deliveryFacts.summary}</Row>
              <Row label="Updates">
                Stock and price lists are posted on{" "}
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-forest underline underline-offset-4">
                  Facebook
                </a>{" "}
                and{" "}
                <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-forest underline underline-offset-4">
                  TikTok
                </a>
                .
              </Row>
            </dl>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="text-3xl sm:text-4xl">Send a message</h2>
            <p className="mt-3 mb-10 text-muted">
              Your message opens in WhatsApp, ready to send. For a stock enquiry, the{" "}
              <a href="/enquire#enquiry" className="text-forest underline underline-offset-4">
                enquiry form
              </a>{" "}
              is quicker.
            </p>
            <ContactForm interests={interests} businessName={site.name} />
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-4">
      <dt className="text-muted">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export const dynamic = "force-static";
