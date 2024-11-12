import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getMyOrders(userId: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  //define the querry to get order based on user id sorted by order date
  const MY_ORDERS_QUERRY = defineQuery(`
        *[_type=='order' && clerkUserId == $userId] | order(orderDate desc){
            ...,products[]{
                ...,
                product->
            }
        }

        `);
  try {
    //use sanity fetch to send the query
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERRY,
      params: { userId },
    });
    // return the list of orders or an empty array if none are found
    return orders.data || [];
  } catch (error) {
    console.log("Error in fetching orders",error);
    throw new Error("Error in fetching orders")    
  }
}
