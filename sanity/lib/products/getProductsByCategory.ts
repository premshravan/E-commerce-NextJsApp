import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategory = async (categorySlug: string) => {
  const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
        *[
            _type == "product"
            && references(*[_type == "category" && slug.current == $categorySlug]._id)
        ] | order(name asc)              
        `);

  try {
    // use sanity fetch to send the querry and pass the category
    const products = await sanityFetch({
      query: PRODUCTS_BY_CATEGORY_QUERY,
      params: {
        categorySlug,
      },
    });
    //return the list of products or empty array
    return products.data || [];
  } catch (error) {
    console.error("Error in fethcing the products category", error);
    return [];
  }
};
