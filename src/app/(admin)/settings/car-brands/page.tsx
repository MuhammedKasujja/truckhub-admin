import { getCarBrands } from "@/server/car-brands";
import { CarBrandTable } from "./_components/car-brand-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { CarBrandSearchParamsCache } from "@/schemas/car-brand";

export default async function Page(props: PageProps<"/settings/car-brands">) {
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    CarBrandSearchParamsCache,
  );
  const promise = getCarBrands(searchParams);

  return <CarBrandTable carBrandListPromise={promise} />;
}
