import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";
import React from "react";

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const products = await searchProductsByName(query);

  // if no producta r available
  if (!products.length) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-500 p-4">
        <div className="bg-white p-8 w-full rounded-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {" "}
            No products found for Name : {query}
          </h1>
          <p className="text-gray-500 text-center text-2xl">
            Try with different keywords
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-300 p-4">
      <div className="bg-emerald-200 p-4 shadow-lg rounded-lg w-full max-w-6xl">
        <h1 className="font-bold text-2xl text-center capitalize">
          Search results for item : {query}
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default SearchPage;
