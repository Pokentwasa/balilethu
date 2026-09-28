import { stockItemRoute } from "@/lib/category-routes";

const route = stockItemRoute("livestock");

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
