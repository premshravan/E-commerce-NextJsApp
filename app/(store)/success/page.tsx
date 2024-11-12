"use client";

import { Button } from "@/components/ui/button";
import useBasketStore from "@/store/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);
  const sessionId=searchParams.get("session_Id")
  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-12 rounded-xl shadow-lg mx-w-2xl w-full mx-4">
        <div className="flex justify-center mb-8">
          <div className="h-16 w-16 bg-green-500/25  rounded-full flex items-center justify-center">
            <svg
              className="h-8 w-8 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-6 text-center">Thank You for your Order...!!!</h1>
        <div className="border-t border-b py-6 mb-6">
            <p className="text-lg mb-4 text-center">
                Your order has been confirmed and will be shipped shortly..
            </p>
            <div className="space-y-2">
                {orderNumber && (
                    <p className="text-gray-400 flex items-center text-center justify-center ">
                        <span>Order Number is :</span>
                        <span className="text-sm text-green-500 ">{orderNumber}</span>
                    </p>
                )}
                {sessionId && (
                  <p className="flex justify-between text-gray-500">
                    <span>Transaction Id:</span>
                    <span className="text-sm">{sessionId}</span>
                  </p>
                )}
            </div>
        </div>
        <div className="space-y-2 flex flex-col justify-center items-center text-pink-500">
          <p>Confirmation Email has been send to your Email address</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/orders">View Order Details</Link>
            </Button>
            <Button asChild variant="outline" className="hover:bg-lime-400 bg-cyan-500/80 text-white">
              <Link href="/">Continue Shopping</Link>
            </Button> 
          </div>
        </div>
      </div>
    </div>
  );
}
export default SuccessPage;
