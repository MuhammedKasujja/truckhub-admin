import { getVehicleSettings } from "@/server/settings";
import { ServiceForm } from "@/features/services/components/service-form";
import { requirePermission } from "@/lib/auth";

export default async function CreateServicePage() {
  await requirePermission("services:create");

  const promise = getVehicleSettings();
  return <ServiceForm vehicleConfigPromise={promise} />;
}
