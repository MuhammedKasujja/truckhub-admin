import { getVehicleSettings } from "@/server/settings";
import { ServiceForm } from "../../_components/service-form";
import { getServiceById } from "@/server/services";

export default async function Page(props: PageProps<"/services/[id]/edit">) {
  const { data } = await getServiceById((await props.params).id);
  const promise = getVehicleSettings();
  return <ServiceForm initialData={data} vehicleConfigPromise={promise} />;
}
