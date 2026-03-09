import { getCarBrands } from "@/features/setiings/car-brand/service";
import { CarBrandTable } from "@/features/setiings/car-brand/components/car-brand-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { CarBrandSearchParamsCache } from "@/features/setiings/car-brand/schemas";

export default async function Page(props: PageProps<"/settings/car-brands">) {
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    CarBrandSearchParamsCache,
  );
  const promise = getCarBrands(searchParams);

  return <CarBrandTable carBrandListPromise={promise} />;
}
