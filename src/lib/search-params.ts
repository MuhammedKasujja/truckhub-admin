import qs from "qs";
import type { ParserMap } from "nuqs/server";
import { getValidFilters } from "@/lib/data-table";
import { createSearchParamsCache } from "nuqs/server";

/**
 * Generic helper to:
 * 1. Parse search params using any nuqs cache/schema
 * 2. Apply your custom filters logic
 * 3. Return strongly-typed result + augmented filters
 * */

export async function generatePageSearchParams<Parsers extends ParserMap>(
  searchParamsPromise: Promise<Record<string, string | string[] | undefined>>,
  cache: ReturnType<typeof createSearchParamsCache<Parsers>>, // ← infer from the factory
) {
  const raw = await searchParamsPromise;
  const parsed = cache.parse(raw);

  // If your parsers object always includes 'filters' (or make it conditional)
  const rawFilters = "filters" in parsed ? parsed.filters : undefined;
  const filters = getValidFilters(rawFilters);

  return {
    ...parsed,
    filters,
  };
}

export const generateApiSearchParams = (input: Record<string, unknown>) => {
  return qs.stringify(input, {
    arrayFormat: "repeat", // or 'comma' / 'brackets'
    skipNulls: true,
    encode: true,
    allowDots: true, // uncomment if your API prefers dots
  });
};
