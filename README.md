# Balilethu Livestock — website

A livestock catalogue for Balilethu Livestock, where every enquiry goes through WhatsApp:
**browse → select → enquire on WhatsApp**. There's no online checkout.

Built with Next.js 16 (App Router, server-rendered and statically generated), TypeScript, Tailwind CSS 4, and GSAP (lazy-loaded, hero only).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
```

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number, e.g. `27827876645` |
| `NEXT_PUBLIC_SHOW_CONTENT_FLAGS` | Set to `false` at launch to hide "To confirm" markers, placeholder testimonials and photo labels |

**Before launch, work through [`CONTENT_AUDIT.md`](./CONTENT_AUDIT.md).** Prices, minimums, photos and several contact details are waiting on the client.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home: hero, categories, featured stock, process, enquiry builder, why us, beginner support, delivery, customers, CTA |
| `/livestock` | All listings with filters (mobile filter drawer) |
| `/poultry` | Poultry listings |
| `/livestock/{calves,cattle,sheep,goats}` | Category pages: intro, key facts, stock, FAQ, delivery note |
| `/poultry/{layers,broilers,day-old-chicks}` | Same, for poultry |
| `/{livestock,poultry}/[category]/[slug]` | Stock detail: gallery, price, specs, purchasing notes, sticky mobile CTA |
| `/enquire?type=calves&item=…` | Structured WhatsApp enquiry builder (pre-fill via query) |
| `/starter-products`, `/delivery`, `/about`, `/contact` | Supporting pages |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Generated |

## Content and CMS

The content model lives in `src/lib/types.ts` (`Category`, `StockItem`, `StarterProduct`, `Testimonial`). Local data lives in `src/data/`:

- `categories.ts`: category copy, SEO, FAQs, key facts
- `stock.ts`: stock listings. Each has name, slug, category, breed, descriptions, price, price qualifier, minimum order, availability, featured, images, age, weight, location, delivery notes and SEO fields.
- `support.ts`: starter products and testimonials
- `facts.ts`: delivery and business facts, so every page uses the same wording
- `src/config/site.ts`: contact details, delivery provinces, social links

Pages read content only through the async functions in `src/lib/content.ts`. To connect a headless CMS (Sanity, Payload, Contentful…), change those functions to query the CMS and return the same types. No page code needs to change. Use ISR or on-demand revalidation so stock updates publish without a redeploy.

**Adding photos:** drop files into `public/images/` using the names in [`docs/IMAGES.md`](./docs/IMAGES.md). For example, `categories/calves.jpg` or `stock/hereford-cross-calves/1.jpg`. They're picked up automatically at build time (`src/lib/images.ts`), so no code changes are needed. Photos set explicitly in the data (or later from a CMS) take priority. Until a photo exists, `Media` shows a plain catalogue plate ("Photo to follow"). Listings never borrow another listing's or the category's photo.

## Colour palette

Tokens live in `src/app/globals.css` (`@theme`): warm off-white background (bone), charcoal ink, forest green (`#1f3a2c`) as the brand anchor, and earth brown (`#855545`) as the accent. Green is used for primary buttons and the WhatsApp section; earth for the homepage brand-story panel and small accents. The footer is charcoal.

Type: Newsreader (editorial serif, headings) and Archivo (grotesk, body). Corners are square (buttons 2px). Structure comes from rules, spacing and type rather than bordered cards.

## Components

`Navbar`, `Hero` + `HeroMotion`, `CategoryIndex` + `CategoryIndexBlock` (editorial category directory), `StockCard` (catalogue entry), `AvailabilityBadge`, `StockCatalogue` (filters), `BrandStory`, `RecentDeliveries` (renders only with real photos in `public/images/deliveries/`), `BuyingDelivery` + `BuyingSteps`, `EnquiryBuilder` + `EnquirySection`, `CTASection`, `Faq`, `Breadcrumbs`, `MobileCtaBar`, `ContactForm`, `StockGallery`, `Media` + `Plate`, `Footer`. Page layouts live in `src/components/views/`.

## WhatsApp enquiries

`src/lib/whatsapp.ts` builds the pre-filled message and a standard `https://wa.me/<number>?text=…` link. There's no API integration. The contact form also sends through WhatsApp, because no email inbox or form backend is confirmed. To add email delivery, post the same fields to a server action.

## SEO

- Every page is server-rendered HTML. Category and stock pages are statically generated with `generateStaticParams`.
- Each page has a unique title and description, a canonical URL, and Open Graph and Twitter tags (`pageMetadata` in `src/lib/seo.ts`).
- JSON-LD: `Organization` + `LocalBusiness` (site-wide), `BreadcrumbList`, `FAQPage`, `ItemList` and `Product`. `Product` only gets an `Offer` when a confirmed price exists.
- Every page has one H1, and category pages link to each other internally.

## Performance and accessibility

- Fonts come from `next/font` (Newsreader and Archivo, self-hosted, `swap`).
- Photos go through `next/image` (AVIF/WebP, responsive `sizes`, priority on the LCP image).
- GSAP is dynamically imported after first paint and used only for the hero (headline reveal, slow image settle, light parallax). Headings and images reveal once on scroll via IntersectionObserver; nothing else animates.
- Content stays visible without JavaScript. Reveals opt in only once JS runs, and all motion respects `prefers-reduced-motion`.
- Semantic landmarks and a skip link; keyboard-operable menus (Escape closes them), visible focus rings, labelled form fields with inline errors, `aria-pressed` filter chips, and a modal filter drawer.
