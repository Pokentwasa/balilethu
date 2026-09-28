/**
 * Business details used across the site.
 *
 * Every value here must be confirmed by Balilethu Livestock before launch —
 * see CONTENT_AUDIT.md. Unconfirmed fields are left `null` and the UI hides them.
 */

const whatsappFromEnv = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");

export const site = {
  name: "Balilethu Livestock",
  legalName: "Balilethu Livestock (Pty) Ltd",
  shortDescription:
    "Livestock and poultry supplier. Calves, cattle, sheep, goats, layers, broilers and day-old chicks, with delivery in KwaZulu-Natal and the Eastern Cape.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://balilethulivestock.com").replace(/\/$/, ""),
  locale: "en_ZA",

  contact: {
    /**
     * WhatsApp number for orders, international format, digits only.
     * Taken from public listings (082 787 6645) — VERIFY before launch.
     */
    whatsapp: whatsappFromEnv || "27827876645",
    whatsappDisplay: "082 787 6645",
    /** Voice line, if different from WhatsApp. Not confirmed. */
    phone: null as string | null,
    /** Not confirmed. */
    email: null as string | null,
    /** Not confirmed. */
    hours: null as string | null,
    /** Registered business location (public company records). */
    locality: "Mount Frere",
    region: "Eastern Cape",
    country: "ZA",
  },

  delivery: {
    provinces: ["KwaZulu-Natal", "Eastern Cape"],
    /** Eastern Cape delivery extends up to Mount Frere. */
    easternCapeLimit: "Mount Frere",
  },

  social: {
    // Channels where Balilethu currently posts stock and price lists.
    facebook: "https://www.facebook.com/Aphelele97/",
    tiktok: "https://www.tiktok.com/@aphelelendamase_",
  },

  /**
   * Shows "(to confirm)" notes next to unverified content during review.
   * Off by default; set NEXT_PUBLIC_SHOW_CONTENT_FLAGS=true to see them.
   */
  showContentFlags: process.env.NEXT_PUBLIC_SHOW_CONTENT_FLAGS === "true",
} as const;

export const SA_PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
] as const;

export type Province = (typeof SA_PROVINCES)[number];

export function isDeliveryProvince(province: string): boolean {
  return (site.delivery.provinces as readonly string[]).includes(province);
}
