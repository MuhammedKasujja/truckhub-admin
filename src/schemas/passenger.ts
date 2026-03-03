import z from "zod";
import { Passenger } from "@/types/passenger";
import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers";
import {
  parseAsString,
  parseAsArrayOf,
  parseAsInteger,
  parseAsStringEnum,
  createSearchParamsCache,
} from "nuqs/server";

export const PassengerCreateSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  user_name: z.string().optional(),
  phone: z.string(),
  email: z.string(),
  password: z.string(),
});

export const PassengerUpdateSchema = z.object({
  id: z.number(),
  ...PassengerCreateSchema.partial().shape,
});

export type PassengerCreateSchemaType = z.infer<typeof PassengerCreateSchema>;

export type PassengerUpdateSchemaType = z.infer<typeof PassengerUpdateSchema>;

export const PassengerSearchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<Passenger>().withDefault([
    { id: "created_at", desc: true },
  ]),
  search: parseAsString.withDefault(""),
  created_at: parseAsArrayOf(parseAsInteger).withDefault([]),
  // advanced filter
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
});

export type PassengerListSearchParams = Awaited<
  ReturnType<typeof PassengerSearchParamsCache.parse>
>;
