import { categoryRoute } from "@/lib/category-routes";

const route = categoryRoute("livestock");

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
