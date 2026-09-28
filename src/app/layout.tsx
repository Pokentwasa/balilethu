import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { getCategories } from "@/lib/content";
import { categoryHref } from "@/lib/routes";
import { findLogo } from "@/lib/images";
import { organizationJsonLd } from "@/lib/seo";
import { Navbar, type NavGroup } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { RevealInit } from "@/components/RevealInit";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Balilethu Livestock | Livestock & Poultry for Sale in South Africa",
    template: "%s | Balilethu Livestock",
  },
  description:
    "Calves, cattle, sheep, goats, layers, broilers and day-old chicks from Balilethu Livestock. Delivery in KwaZulu-Natal and the Eastern Cape. Enquire on WhatsApp.",
  applicationName: site.name,
  alternates: { canonical: site.url },
  openGraph: { type: "website", siteName: site.name, locale: site.locale, url: site.url },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#12241a",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();
  const groups: NavGroup[] = (["livestock", "poultry"] as const).map((g) => ({
    label: g === "livestock" ? "Livestock" : "Poultry",
    href: `/${g}`,
    items: categories
      .filter((c) => c.group === g)
      .map((c) => ({ label: c.name, href: categoryHref(c), description: c.tagline })),
  }));

  return (
    <html lang="en-ZA" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen">
        <Navbar groups={groups} whatsappDisplay={site.contact.whatsappDisplay} logoSrc={findLogo()} />
        <main id="main">{children}</main>
        <Footer />
        <RevealInit />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
