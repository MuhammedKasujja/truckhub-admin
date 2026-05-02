import { getVehicleTypes } from "@/features/settings/vehicle-types/service";
import { VehicleTypeTable } from "@/features/settings/vehicle-types/components/vehicle-types-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { VehicleTypeSearchParamsCache } from "@/features/settings/vehicle-types/schemas";

export default async function Page(props: PageProps<"/settings/vehicle-types">) {
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    VehicleTypeSearchParamsCache,
  );
  const promise = getVehicleTypes(searchParams);

  return <VehicleTypeTable promise={promise} />;
}
