"use client";

import { Product } from "@/sanity.types";
import useBasketStore from "@/store/store";
import { useEffect, useState } from "react";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);
  const [isClient, setIsClient] = useState(false);

  // use useeffect to set client true after the component mounts
  //This ensures that the component only mounts in the client side
  // prevents the hydration errors due to  mismatching of server and client
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 justify-center">
      <button
        onClick={() => removeItem(product._id)}
        className={`w-8 h-8 rounded-full flex justify-center items-center duration-100 ${itemCount == 0 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-600"}`}
        disabled={itemCount === 0 || disabled}
      >
        <span
          className={`text-xl font-bold ${itemCount === 0 ? "text-gray-600" : "text-gray-800 hover:text-white"}`}
        >
          -
        </span>
      </button>
      <span className="w-8 text-center font-semibold">{itemCount}</span>
      <button
        onClick={() => addItem(product)}
        className={`w-8 h-8 rounded-full flex justify-center items-center duration-100 ${disabled ? "bg-gray-300 cursor-not-allowed" : "bg-lime-300 hover:bg-lime-600 "}`}
        disabled={disabled}
      >
        <span className="text-xl font-bold text-white">+</span>
      </button>
    </div>
  );
}

export default AddToBasketButton;
