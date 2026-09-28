import { getCategories, getStock } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { GroupView } from "@/components/views/GroupView";

export const metadata = pageMetadata({
  title: "Poultry for Sale | Layers, Broilers & Day-Old Chicks",
  description:
    "Lohmann Brown layers, broiler chickens and day-old chicks from Balilethu Livestock. Delivery in KwaZulu-Natal and the Eastern Cape. Enquire on WhatsApp.",
  path: "/poultry",
});

export default async function PoultryPage() {
  const [poultry, items] = await Promise.all([getCategories("poultry"), getStock({ group: "poultry" })]);
  return (
    <GroupView
      title={<>Poultry <em>for sale</em></>}
      intro="Layers, broilers and day-old chicks for households and growing poultry businesses."
      crumbs={[{ name: "Poultry", path: "/poultry" }]}
      categories={poultry}
      filterCategories={poultry}
      items={items}
    />
  );
}
