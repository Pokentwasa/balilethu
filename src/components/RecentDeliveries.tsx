import Image from "next/image";
import { findImages } from "@/lib/images";

/**
 * Photographs from public/images/deliveries/. Renders nothing until real
 * delivery photos exist — stock photography must not stand in here.
 */
export function RecentDeliveries() {
  const photos = findImages("deliveries", "Balilethu Livestock delivery").slice(0, 5);
  if (photos.length < 3) return null;
  const layouts = ["lg:col-span-7 aspect-[3/2]", "lg:col-span-5 aspect-[4/5]", "lg:col-span-4 aspect-[4/5]", "lg:col-span-8 aspect-[16/9]", "lg:col-span-12 aspect-[21/9]"];
  return (
    <section aria-labelledby="deliveries-heading" className="py-20 md:py-32">
      <div className="container-x">
        <h2 id="deliveries-heading" className="text-4xl sm:text-5xl" data-reveal>
          Recent deliveries
        </h2>
        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-6">
          {photos.map((p, i) => (
            <figure key={p.src} className={`relative overflow-hidden bg-sand ${layouts[i]}`} data-reveal="clip">
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
