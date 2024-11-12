import { imageUrl } from "@/lib/imageUrl";
import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";

function ProductThumb({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;
  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col bg-white rounded-lg border border-gray-500 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden w-60 h-70 ${isOutOfStock ? "opacity-50" : ""}`}
    >
      <div className=" relative aspect-square w-full h-full overflow-hidden ">
        {product.image && (
          <Image
            className=" object-contain transition-transform duration-200 group-hover:scale-105"
            src={imageUrl(product.image).url()}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width:750px) 100vw,(max-width:1200px) 50vw,33vw "
          />
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
            <span className="font-bold text-black text-sm border p-2 bg-red-500 rounded">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold truncate text-gray-800">
          {product.name}
        </h2>
        <p className="mt-2 text-sm line-clamp-2 text-gray-700">
          {product.description
            ?.map((block) =>
              block._type === "block"
                ? block.children?.map((child) => child.text).join("")
                : ""
            )
            .join(" ") || "No decsription Available"}
        </p>
        <p className=" mt-2 font-bold text-lg text-gray-800">
          Rs.{product.price?.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
export default ProductThumb;
