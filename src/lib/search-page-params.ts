import { getValidFilters } from "@/lib/data-table";
import { createSearchParamsCache } from "nuqs/server";

type CacheInterface = ReturnType<typeof createSearchParamsCache>;

export async function generatePageSearchParams(
  searchParams: Promise<Record<string, string | string[] | undefined>>,
  schema: CacheInterface,
) {
  const pageSearchParams = await searchParams;
  const search = schema.parse(pageSearchParams);

  const filters = getValidFilters(search.filters);
  return { search, filters };
}
