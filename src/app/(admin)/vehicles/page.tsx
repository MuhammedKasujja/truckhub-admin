import { getVehicles } from "@/server/vehicles";
import { VehicleTable } from "./components/vehicle-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { VehicleSearchParamsCache } from "@/schemas/vehicle";

export default async function VehiclePage(props: PageProps<"/vehicles">) {
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    VehicleSearchParamsCache,
  );

  const promises = Promise.all([getVehicles(searchParams)]);
  return <VehicleTable promises={promises} />;
}
