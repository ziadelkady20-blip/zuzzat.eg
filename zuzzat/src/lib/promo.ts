import { PROMO_CODES } from "@/lib/data";

export function calculateDiscount(code: string, subtotal: number): number {
  const upperCode = code.toUpperCase();
  if (!(upperCode in PROMO_CODES)) return 0;
  const promo = PROMO_CODES[upperCode];
  return promo.type === "percent"
    ? Math.round(subtotal * promo.value)
    : Math.min(promo.value, subtotal);
}
