import { getVehicleSettings } from "@/server/settings";
import { ServiceForm } from "@/features/services/components/service-form";
import { getServiceById } from "@/features/services/service";
import { Suspense } from "react";
import { requirePermission } from "@/lib/auth";

export default async function Page(props: PageProps<"/services/[id]/edit">) {
  await requirePermission("services:edit");
  
  const serviceId = (await props.params).id;
  const { data } = await getServiceById(serviceId);
  const promise = getVehicleSettings();
  return (
    <Suspense fallback={<div>Loading Service details</div>}>
      <ServiceForm
        initialData={{ ...data, id: data?.id ?? parseInt(serviceId) }}
        vehicleConfigPromise={promise}
      />
    </Suspense>
  );
}
