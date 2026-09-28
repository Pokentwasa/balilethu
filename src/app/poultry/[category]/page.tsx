import { categoryRoute } from "@/lib/category-routes";

const route = categoryRoute("poultry");

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
