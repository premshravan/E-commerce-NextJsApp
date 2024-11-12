import { COUPON_CODES } from "@/sanity/lib/sales/CouponCode";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);
  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className="text-white px-6 py-10 mx-4 mt-2 rounded-lg bg-gradient-to-r from-red-500 to-black shadow-lg ">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-left mb-4">
            {sale.title}
          </h2>
          <p className=" text-left text-xl sm:text-2xl font-semibold mb-2">
            {sale.description}
          </p>
          <div className="flex">
            <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform transition hover:scale-105 duration-500">
              <span className="font-bold text-base sm:text-xl">
                Use code :{" "}
                <span className="text-red-500">{sale.couponCode}</span>
              </span>
              <span className="ml-2 font-bold text-base sm:text-xl">
                for {sale.discountAmount}% OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BlackFridayBanner;
