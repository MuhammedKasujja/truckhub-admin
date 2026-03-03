import z from "zod";
import { Trip } from "@/types/trip";
import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers";
import {
  parseAsString,
  parseAsArrayOf,
  parseAsInteger,
  parseAsStringEnum,
  createSearchParamsCache,
} from "nuqs/server";

export const TripCreateSchema = z.object({
  name: z.string(),
  display_name: z.string(),
  seats: z.number().nullable(),
  base_fare: z.number(),
  min_fare: z.number(),
  price_per_min: z.number(),
  price_per_unit_distance: z.number(),
  booking_fee: z.number().nullable(),
  tax_fee: z.number().nullable(),
  distance_unit: z.enum(["km", "miles"]).default("km"),
  vehicle_type_id: z.number(),
  description: z.string().nullable(),
});

export const TripUpdateSchema = z.object({
  id: z.number(),
  ...TripCreateSchema.partial().shape,
});

export type TripCreateSchemaType = z.infer<typeof TripCreateSchema>;

export type TripUpdateSchemaType = z.infer<typeof TripUpdateSchema>;

export const TripSearchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<Trip>().withDefault([
    { id: "created_at", desc: true },
  ]),
  search: parseAsString.withDefault(""),
  created_at: parseAsArrayOf(parseAsInteger).withDefault([]),
  // advanced filter
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
});

export type TripListSearchParams = Awaited<
  ReturnType<typeof TripSearchParamsCache.parse>
>;
