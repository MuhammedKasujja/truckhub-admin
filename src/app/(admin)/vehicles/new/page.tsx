import { getVehicleSettings } from "@/server/settings";
import { VehicleForm } from "@/features/vehicles/components/vehicle-form";
import { requirePermission } from "@/lib/auth";

export default async function CreateVehiclePage() {
  await requirePermission("vehicles:create");

  const promises = Promise.all([getVehicleSettings()]);
  return <VehicleForm configPromises={promises} />;
}
