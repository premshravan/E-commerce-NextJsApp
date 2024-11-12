import AddToBasketButton from "@/components/AddToBasketButton";

import { imageUrl } from "@/lib/imageUrl";
import { getProductsBySlug } from "@/sanity/lib/products/getProductsBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

async function ProductPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const product = await getProductsBySlug(slug);
  if (!product) {
    return notFound();
  }
  const isOutofStock = product.stock != null && product.stock <= 0;
  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        <div
          className={`relative rounded-lg shadow-lg overflow-hidden aspect-square ${isOutofStock ? "opacity-30 " : ""}`}
        >
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? "product image"}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          )}
          {isOutofStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
              <span className="text-white font-bold">Out Of Stock..!!!</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-xl font-semibold mb-4">
              Rs.{product.price?.toFixed(2)} /-
            </div>
            <div className=" max-w-none mb-6 prose text-gray-600 text-lg">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>
          <div className="mt-4">
            <AddToBasketButton product={product} disabled={isOutofStock} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductPage;
