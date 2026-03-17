import z from "zod";
import { Booking } from "@/features/bookings/types";
import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers";
import {
  parseAsString,
  parseAsArrayOf,
  parseAsInteger,
  parseAsStringEnum,
  createSearchParamsCache,
} from "nuqs/server";

export const ServiceItem = z.object({
  service_name: z.string(),
  cost_per_item: z.number(),
  total_items: z.number(),
  discount: z.number(),
});

export const SpecialBookingCreateSchema = z.object({
  passenger_id: z.number(),
  pickup_time: z.date(),
  return_time: z.date(),
  services: z.array(ServiceItem),
});

export const SpecialBookingUpdateSchema = z.object({
  id: z.number(),
  ...SpecialBookingCreateSchema.partial().shape,
});

export type SpecialBookingCreateSchemaType = z.infer<
  typeof SpecialBookingCreateSchema
>;

export type SpecialBookingUpdateSchemaType = z.infer<
  typeof SpecialBookingUpdateSchema
>;

export const SpecialBookingSearchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<Booking>().withDefault([
    { id: "created_at", desc: true },
  ]),
  search: parseAsString.withDefault(""),
  created_at: parseAsArrayOf(parseAsInteger).withDefault([]),
  // advanced filter
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
});

export type SpecialBookingListSearchParams = Awaited<
  ReturnType<typeof SpecialBookingSearchParamsCache.parse>
>;
