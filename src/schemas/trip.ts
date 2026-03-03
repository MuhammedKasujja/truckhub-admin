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
  service_id: z.number(),
  passenger_id: z.string(),
  driver_id: z.string().optional(),
  pickup_location: z.string(),
  dropoff_location: z.string(),
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
