# Image slots (for developers)

Photos are uploaded unsorted into `public/images/`, then sorted into the structure below. The site picks up files at build time by these names (`src/lib/images.ts`); placeholder artwork shows until a file exists.

**Formats:** `.jpg`, `.jpeg`, `.png`, `.webp` or `.avif`.
**Size:** landscape, at least 1600px wide (2400px for the hero). The site resizes
and compresses them for you, but keep each file under about 5 MB.
**Names:** lowercase, exactly as listed. `calves.jpg` works, `Calves.JPG` does not.

## `hero/` — homepage banner

| File | Where it shows |
| --- | --- |
| `hero.jpg` | Full-width image behind "Quality livestock. Straightforward buying." A wide farm or cattle shot works best, with space on the left for the text. |

## `categories/` — one photo per category

Used on the category cards and at the top of each category page.

| File | Page |
| --- | --- |
| `calves.jpg` | /livestock/calves |
| `cattle.jpg` | /livestock/cattle |
| `sheep.jpg` | /livestock/sheep |
| `goats.jpg` | /livestock/goats |
| `layers.jpg` | /poultry/layers |
| `broilers.jpg` | /poultry/broilers |
| `day-old-chicks.jpg` | /poultry/day-old-chicks |

## `stock/<listing>/` — photos for each stock listing

Each listing has its own folder. Name the photos `1.jpg`, `2.jpg`, `3.jpg`… and
they'll appear in that order in the listing's gallery. `1.jpg` is also used on the
listing's card.

| Folder | Listing |
| --- | --- |
| `hereford-cross-calves/` | Hereford cross calves |
| `angus-cross-calves/` | Angus cross calves |
| `bonsmara-cross-calves/` | Bonsmara cross calves |
| `beefmaster-charolais-cross-calves/` | Beefmaster & Charolais cross calves |
| `holstein-cross-bull-calves/` | Holstein cross bull calves |
| `nguni-pregnant-cows/` | Nguni pregnant cows |
| `brahman-cows/` | Brahman cows |
| `breeding-sheep/` | Breeding sheep |
| `lambs/` | Lambs |
| `goats-on-enquiry/` | Goats |
| `lohmann-brown-layers/` | Lohmann Brown layers |
| `broiler-chickens/` | Broiler chickens |
| `day-old-chick-batches/` | Day-old chicks |

## `sections/` — photos for page sections

| File | Where it shows |
| --- | --- |
| `why-selection.jpg` | Homepage, "Why Balilethu": wide selection |
| `why-delivery.jpg` | Homepage, "Why Balilethu": delivery |
| `why-support.jpg` | Homepage, "Why Balilethu": first-time buyers |
| `why-direct.jpg` | Homepage, "Why Balilethu": direct buying |
| `beginner.jpg` | Homepage, "Starting with livestock?" (e.g. bottle-feeding calves) |
| `starter-products.jpg` | Banner on /starter-products |
| `about.jpg` | Banner on /about (team, farm or animals) |

## `gallery/` — "Livestock on its way" (homepage)

| File | Suggested photo |
| --- | --- |
| `delivery-day.jpg` | Large tile: a delivery or loading |
| `calves-loading.jpg` | Calves ready to go |
| `poultry-collection.jpg` | A poultry order or collection |
| `on-the-farm.jpg` | Wide farm shot |

## Tips

- Use real Balilethu photos only. Every photo should show your own animals, deliveries or farm.
- Good light and a steady shot matter more than an expensive camera.
- Photos are public once the site is deployed, so avoid anything showing customers'
  faces or number plates unless they've agreed.
