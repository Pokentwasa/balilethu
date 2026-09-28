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
        title={<>Talk to <em>the team</em></>}
        intro={<p>WhatsApp is the quickest way to reach us. Send what you need and where you are.</p>}
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="pb-20 md:pb-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <a
              href={whatsappUrl(`Hi ${site.name}, I'd like to enquire about livestock.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 bg-forest p-7 text-bone"
            >
              <span>
                <span className="block text-[0.95rem] text-bone/75">WhatsApp</span>
                <span className="mt-2 block font-serif text-3xl sm:text-4xl">{contact.whatsappDisplay}</span>
              </span>
              <WhatsAppIcon className="size-9" />
            </a>

            <dl className="mt-8 divide-y divide-tan border-y border-tan">
              {contact.phone && <Row label="Phone">{contact.phone}</Row>}
              {contact.email && (
                <Row label="Email">
                  <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
                    {contact.email}
                  </a>
                </Row>
              )}
              {contact.hours && <Row label="Hours">{contact.hours}</Row>}
              <Row label="Location">
                {contact.locality}, {contact.region}
              </Row>
              <Row label="Delivery">{deliveryFacts.summary}</Row>
            </dl>

            <p className="mt-6 text-sm text-muted">
              Follow current stock updates on{" "}
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-forest underline underline-offset-4">Facebook</a>{" "}
              and{" "}
              <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-forest underline underline-offset-4">TikTok</a>.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="text-3xl sm:text-4xl">Send a message</h2>
            <p className="mt-2 mb-8 text-muted">For a quick stock enquiry, the <a href="/enquire#enquiry" className="text-forest underline underline-offset-4">enquiry form</a> is fastest.</p>
            <ContactForm interests={interests} businessName={site.name} />
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export const dynamic = "force-static";
