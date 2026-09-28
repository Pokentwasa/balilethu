# Content audit — Balilethu Livestock

This file records every business fact used on the site, where it came from,
and what still needs confirmation by Balilethu before launch.

## How the facts were gathered

`balilethulivestock.com` could not be fetched directly from the build
environment (its network policy blocks the domain). Facts were gathered from
search-engine extracts of the live site and from public listings about the
business. **Everything below should be checked against the live site and
with the client before launch.**

## Facts used on the site

| Fact | Where it's used | Source | Status |
| --- | --- | --- | --- |
| Delivers in KwaZulu-Natal and Eastern Cape (up to Mount Frere) | Delivery section, category pages, enquiry builder, footer | Live site (search extract) | Use; confirm wording |
| Other provinces: customer arranges own transport for collection | Same as above | Live site (search extract) | Use |
| No delivery outside South Africa; cannot sell for export even with own transport | Delivery, FAQs, product notes | Live site (search extract) | Use |
| Certificate of Removal provided, valid for local authorities within SA | Delivery, cattle FAQ, product notes | Live site (search extract) | Use |
| Foot and Mouth Disease restrictions make export extremely difficult | Delivery page | Live site (search extract) | Use; check it's still current |
| Began in 2023 as Balilethu Calves with bottle-fed calves | About timeline, calves page, beginner section | Press coverage (Food For Mzansi) | Confirm |
| By 2024: breeding cattle, pregnant cows, sheep, lambs, broilers, Lohmann Brown layers, day-old chicks | About timeline, categories | Press coverage | Confirm |
| Calf types: Hereford ×, Angus ×, Bonsmara ×, Beefmaster ×, Charolais ×, Holstein/dairy × bulls | Calves page and stock | balilethucalves.com (search extract) | Confirm current range |
| Cattle: pure Nguni pregnant cows, Brahman cows | Cattle page and stock | balilethucalves.com (search extract) | Confirm |
| Registered as Balilethu Livestock (Pty) Ltd, Mount Frere, Eastern Cape | Footer, schema, contact | Public company directory | Confirm address to display |
| WhatsApp 082 787 6645 | Every WhatsApp link | Public listing | **Must confirm**; set with `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Facebook @Aphelele97, TikTok @aphelelendamase_ | Footer, contact | Public profiles where price lists are posted | Confirm the client wants these linked |

## Not shown until confirmed (fields left `null`)

These appear as "Price on enquiry" or "Confirmed on enquiry" in the UI.

| Item | Previously published figure | Where to set |
| --- | --- | --- |
| Hereford / Angus / Bonsmara cross calves | R1 300 each | `src/data/stock.ts` → `price` |
| Holstein cross bull calves | R550 each | `src/data/stock.ts` |
| Calf minimum order | 10 calves | `minimumOrder` on stock and `src/data/categories.ts` |
| Calf packages | 10 Holstein × bulls R5 500; 20 Hereford × R24 000; 25 Hereford × R30 000 | New stock items (`priceQualifier: "per package"`) |
| Category "From R…" prices | — | `fromPrice` in `src/data/categories.ts` |
| Ages / weights | — | `age`, `weight` on stock items |
| Poultry, sheep and goat prices and minimums | — | `src/data/stock.ts` |

Price lists are time-limited (one public list was "valid until 31 October 2025"),
so don't reuse these figures without a current list from the client.

## Placeholder or unconfirmed content (marked "To confirm" in development)

- **Starter products:** milk replacer, bottles & feeders, care products, guides and
  video support were requested in the brief but aren't confirmed as products.
  Starter *packages* are confirmed (calf packages). Edit `src/data/support.ts`.
- **Testimonials:** none supplied. Add real ones to `testimonials` in
  `src/data/support.ts`. Placeholders show only while content flags are on.
- **Photography:** the site currently uses Unsplash stock photos, not Balilethu's
  own animals. Listing photos are labelled "Illustrative photo"; turn that off with
  `stockPhotosAreIllustrative` in `src/data/photos.ts` once real listing photos are in.
  Still missing: a broilers photo (white meat birds) and real delivery/customer photos
  for the "Livestock on its way" gallery. Those slots show placeholder artwork.
- **Phone line, email, business hours:** not confirmed, so they're hidden or shown as "Use WhatsApp".
- **Availability:** every listing is "Enquire" until a live stock count exists.

## Deliberately not used

- The founder's personal story and the "women-led" framing. These come from press
  coverage, and the brief asked for no dramatic origin story. Add them only if the client wants them.
- Crop farming (spinach/cabbage at Underberg), which is out of scope for a livestock catalogue.
