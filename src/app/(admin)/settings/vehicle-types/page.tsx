import { getVehicleTypes } from "@/server/vehicle-types";
import { VehicleTypeTable } from "./_components/vehicle-types-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { VehicleTypeSearchParamsCache } from "@/schemas/vehicle-type";

export default async function Page(props: PageProps<"/settings/vehicle-types">) {
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    VehicleTypeSearchParamsCache,
  );
  const promise = getVehicleTypes(searchParams);

  return <VehicleTypeTable promise={promise} />;
}
