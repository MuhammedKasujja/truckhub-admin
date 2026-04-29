import { getVehicles } from "@/features/vehicles/service";
import { VehicleTable, VehicleTableSkeleton } from "@/features/vehicles/components/vehicle-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { VehicleSearchParamsCache } from "@/features/vehicles/schemas";
import { Suspense } from "react";
import { requirePermission } from "@/lib/auth";
import { PageHeader, PageTitle } from "@/components/header";

export default async function VehiclePage(props: PageProps<"/vehicles">) {
  await requirePermission("vehicles:view");
  
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    VehicleSearchParamsCache,
  );

  const promises = Promise.all([getVehicles(searchParams)]);
  return (
    <Suspense fallback={<VehicleTableSkeleton />}>
      <PageHeader>
        <PageTitle>Vehicles</PageTitle>
      </PageHeader>
      <VehicleTable promises={promises} />
    </Suspense>
  );
}
