import { getVehicleSettings } from "@/server/settings";
import { getVehicleById } from "@/features/vehicles/service";
import { VehicleForm } from "@/features/vehicles/components/vehicle-form";
import { requirePermission } from "@/lib/auth";

export default async function Page(props: PageProps<"/vehicles/[id]/edit">) {
  await requirePermission("vehicles:edit");
  
  const { data } = await getVehicleById((await props.params).id);
  const promise = Promise.all([getVehicleSettings()]);
  return <VehicleForm initialData={data} configPromises={promise} />;
}
