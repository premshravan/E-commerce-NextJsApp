import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

async function Orders() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const orders = await getMyOrders(userId);
  return (
    <div>
      <div>
        <h1>My orders</h1>
        {orders.length ===0 ? (
            <div>
                <p>You have not placed any orders</p>
            </div>
        ):(
            <div>
                <h1></h1>
            </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
