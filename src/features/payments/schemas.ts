import z from "zod";
import { Payment } from "@/features/payments/types";
import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers";
import {
  parseAsString,
  parseAsArrayOf,
  parseAsInteger,
  parseAsStringEnum,
  createSearchParamsCache,
} from "nuqs/server";
import { formatPrice } from "@/lib/format";

/**
 *
 * @param maxAmount zero value means already fully paid
 * @returns
 */
export const createEditPaymentSchema = (maxAmount: number = 0) => {
  return z.object({
    id: z.number().optional().nullable(),
    entity_id: z.number(),
    amount: z
      .number()
      .min(100)
      .max(maxAmount, {
        error: `Payment amount cannot exceed ${formatPrice(maxAmount)}`,
      }),
    payment_mode: z.string(),
    transaction_ref: z.string().optional().nullable(),
    type: z.enum(["booking", "ride"]),
  });
};

export type PaymentEditSchemaType = z.infer<
  ReturnType<typeof createEditPaymentSchema>
>;

export const PaymentSearchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<Payment>().withDefault([
    { id: "date", desc: true },
  ]),
  search: parseAsString.withDefault(""),
  created_at: parseAsArrayOf(parseAsInteger).withDefault([]),
  // advanced filter
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
});

export type PaymentListSearchParams = Awaited<
  ReturnType<typeof PaymentSearchParamsCache.parse>
>;
