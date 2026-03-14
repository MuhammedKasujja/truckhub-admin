import { getVehicles } from "@/features/vehicles/service";
import { VehicleTable, VehicleTableSkeleton } from "@/features/vehicles/components/vehicle-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { VehicleSearchParamsCache } from "@/features/vehicles/schemas";
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
