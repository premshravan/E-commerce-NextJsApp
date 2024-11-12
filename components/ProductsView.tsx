import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/categorySelector";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className="flex flex-col">
      {/* categories */}

      <div className="w-full sm:w-[200px]">
        <CategorySelectorComponent categories={categories} />
      </div>
      {/* products */}
      <div className="flex-1">
        <div>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
