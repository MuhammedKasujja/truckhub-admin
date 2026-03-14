import { VehicleDetails } from "@/features/vehicles/components/vehicle-details";
import { getVehicleDetailsById } from "@/features/vehicles/service";
import { Suspense } from "react";

export default async function Page(props: PageProps<"/vehicles/[id]/view">) {
  const promises = Promise.all([
    getVehicleDetailsById((await props.params).id),
  ]);

  return (
    <Suspense fallback={<div>Loading vehicle details...</div>}>
      <VehicleDetails promises={promises} />
    </Suspense>
  );
}
