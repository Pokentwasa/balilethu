import { getCategories, getStock } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { GroupView } from "@/components/views/GroupView";

export const metadata = pageMetadata({
  title: "Livestock for Sale | Calves, Cattle, Sheep & Goats",
  description:
    "Browse livestock and poultry from Balilethu Livestock: calves, cattle, sheep, goats, layers, broilers and day-old chicks. Delivery in KZN and the Eastern Cape.",
  path: "/livestock",
});

export default async function LivestockPage() {
  const [livestock, all, items] = await Promise.all([getCategories("livestock"), getCategories(), getStock()]);
  return (
    <GroupView
      title={<>Livestock <em>for sale</em></>}
      intro="Calves, cattle, sheep and goats — plus poultry below. Filter current listings and enquire directly on WhatsApp. Photos are illustrative."
      crumbs={[{ name: "Livestock", path: "/livestock" }]}
      categories={livestock}
      filterCategories={all}
      items={items}
    />
  );
}
