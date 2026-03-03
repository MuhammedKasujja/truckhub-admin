import { getVehicles } from "@/server/vehicles";
import { VehicleTable, VehicleTableSkeleton } from "./components/vehicle-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { VehicleSearchParamsCache } from "@/schemas/vehicle";
import { Suspense } from "react";

export default async function VehiclePage(props: PageProps<"/vehicles">) {
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    VehicleSearchParamsCache,
  );

  const promises = Promise.all([getVehicles(searchParams)]);
  return (
    <Suspense fallback={<VehicleTableSkeleton />}>
      <VehicleTable promises={promises} />
    </Suspense>
  );
}
