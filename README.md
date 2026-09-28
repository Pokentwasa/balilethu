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

**Adding photos:** put images in `public/images/...` (or a CMS/CDN host added to `images.remotePatterns` in `next.config.ts`), then fill `images` on a stock item or `image` on a category:

```ts
images: [{ src: "/images/calves/hereford-1.jpg", alt: "Hereford-cross heifers in a paddock", width: 1600, height: 1200 }]
```

Until then, `Media` renders placeholder landscape artwork, which is pure SVG and costs no network requests. For the hero, pass an image to `<Hero image={…} />` in `src/app/page.tsx`.

## Colour palette

Tokens live in `src/app/globals.css` (`@theme`): forest (`#1f3a2c`), earth (`#855545`, plus `earth-deep` / `earth-soft`), clay accent, sand, bone and charcoal ink. Forest and earth are the two dark surfaces. Earth is used for the "How buying works" band and the closing CTA.

## Components

`Navbar` (dropdowns, mobile sheet), `Hero` + `HeroMotion`, `CategoryGrid`/`CategoryCard`, `StockCard`, `AvailabilityBadge`, `StockCatalogue` (filters), `EnquiryBuilder` + `EnquirySection`, `ProcessSteps`, `WhyBalilethu`, `BeginnerSupport`, `DeliverySection` + `CoverageMap`, `Testimonials`, `CTASection`, `Faq`, `Breadcrumbs`, `MobileCtaBar`, `ContactForm`, `StockGallery`, `Footer`. Page layouts live in `src/components/views/`.

## WhatsApp enquiries

`src/lib/whatsapp.ts` builds the pre-filled message and a standard `https://wa.me/<number>?text=…` link. There's no API integration. The contact form also sends through WhatsApp, because no email inbox or form backend is confirmed. To add email delivery, post the same fields to a server action.

## SEO

- Every page is server-rendered HTML. Category and stock pages are statically generated with `generateStaticParams`.
- Each page has a unique title and description, a canonical URL, and Open Graph and Twitter tags (`pageMetadata` in `src/lib/seo.ts`).
- JSON-LD: `Organization` + `LocalBusiness` (site-wide), `BreadcrumbList`, `FAQPage`, `ItemList` and `Product`. `Product` only gets an `Offer` when a confirmed price exists.
- Every page has one H1, and category pages link to each other internally.

## Performance and accessibility

- Fonts come from `next/font` (Fraunces and Inter, self-hosted, `swap`).
- Photos go through `next/image` (AVIF/WebP, responsive `sizes`, priority on the LCP image).
- GSAP is dynamically imported after first paint and used only for the hero. Scroll reveals use IntersectionObserver with CSS transforms.
- Content stays visible without JavaScript. Reveals opt in only once JS runs, and all motion respects `prefers-reduced-motion`.
- Semantic landmarks and a skip link; keyboard-operable menus (Escape closes them), visible focus rings, labelled form fields with inline errors, `aria-pressed` filter chips, and a modal filter drawer.
