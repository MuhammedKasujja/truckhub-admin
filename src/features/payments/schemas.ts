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

export const PaymentCreateSchema = z.object({
  name: z.string(),
  seats: z.number().optional(),
  base_fare: z.number(),
  min_fare: z.number(),
  price_per_min: z.number(),
  price_per_unit_distance: z.number(),
  booking_fee: z.number().optional(),
  tax_fee: z.number().optional(),
  vehicle_type_id: z.number(),
  minimum_hire_fee: z.number(),
  description: z.string().optional().nullable(),
});

export const PaymentUpdateSchema = z.object({
  id: z.number(),
  ...PaymentCreateSchema.partial().shape,
});

export type PaymentCreateSchemaType = z.infer<typeof PaymentCreateSchema>;

export type PaymentUpdateSchemaType = z.infer<typeof PaymentUpdateSchema>;

export const PaymentSearchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<Payment>().withDefault([
    { id: 'date', desc: true },
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
