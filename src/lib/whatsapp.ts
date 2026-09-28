import { site } from "@/config/site";

export interface EnquiryDetails {
  livestock?: string;
  item?: string;
  quantity?: string;
  province?: string;
  town?: string;
  fulfilment?: "Delivery" | "Collection" | "";
  name?: string;
  message?: string;
}

/** Builds the pre-filled WhatsApp enquiry text. Empty fields are omitted. */
export function buildEnquiryMessage(d: EnquiryDetails): string {
  const lines = [`Hi ${site.name}, I'd like to enquire about:`];
  const add = (label: string, v?: string) => {
    const t = v?.trim();
    if (t) lines.push(`${label}: ${t}`);
  };
  lines.push("");
  add("Livestock", d.livestock);
  add("Breed/product", d.item);
  add("Quantity", d.quantity);
  add("Location", [d.town?.trim(), d.province?.trim()].filter(Boolean).join(", "));
  add("Fulfilment", d.fulfilment);
  if (lines.at(-1) === "") lines.pop();
  if (d.message?.trim()) lines.push("", d.message.trim());
  lines.push("", "Please let me know current availability and pricing.");
  if (d.name?.trim()) lines.push("", `Thanks, ${d.name.trim()}`);
  return lines.join("\n");
}

export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function quickEnquiryUrl(subject?: string): string {
  return whatsappUrl(
    subject
      ? buildEnquiryMessage({ livestock: subject })
      : `Hi ${site.name}, I'd like to enquire about livestock. Please let me know what is currently available.`,
  );
}
