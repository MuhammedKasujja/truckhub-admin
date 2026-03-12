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

export const BookingCreateSchema = z.object({
  service_id: z.number(),
  passenger_id: z.string(),
  driver_id: z.string().optional(),
  pickup_location: z.string(),
  dropoff_location: z.string(),
});

export const BookingUpdateSchema = z.object({
  id: z.number(),
  ...BookingCreateSchema.partial().shape,
});

export type BookingCreateSchemaType = z.infer<typeof BookingCreateSchema>;

export type BookingUpdateSchemaType = z.infer<typeof BookingUpdateSchema>;

export const BookingSearchParamsCache = createSearchParamsCache({
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

export type BookingListSearchParams = Awaited<
  ReturnType<typeof BookingSearchParamsCache.parse>
>;
