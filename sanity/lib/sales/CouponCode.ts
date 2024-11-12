export const COUPON_CODES = {
  BFRIDAY: "BFRIDAY",
  XMAS2024: "XMAS2024",
  NY2021: "NY2021",
} as const;

export type CouponCode = keyof typeof COUPON_CODES;
