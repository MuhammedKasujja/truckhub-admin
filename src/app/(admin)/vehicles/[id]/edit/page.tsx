import { getVehicleSettings } from "@/server/settings";
import { getVehicleById } from "@/features/vehicles/service";
import { VehicleForm } from "../../_components/vehicle-form";

export default async function Page(props: PageProps<"/vehicles/[id]/edit">) {
  const { data } = await getVehicleById((await props.params).id);
  const promise = Promise.all([getVehicleSettings()]);
  return <VehicleForm initialData={data} configPromises={promise} />;
}
