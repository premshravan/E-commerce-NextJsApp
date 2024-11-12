import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";
import React from "react"

async function CategoryPage (
    {params}:{params:Promise <{slug:string}>}
) {
    const {slug} =await params;
    const products = await getProductsByCategory(slug)
    const categories=await getAllCategories();
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-500 p-4 "> 
            <div className="bg-blue-500 rounded-lg w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center underline">
                        {slug
                        .split("-")
                        .map((word)=>word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ') } {" "}
                        Collection
                </h1>
                <ProductsView products={products} categories={categories} />
            </div>
        </div>
    )
}


export default CategoryPage;