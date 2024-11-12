import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  return (
    <div>
      <BlackFridayBanner />
      {/* render all the products */}
      <div>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
