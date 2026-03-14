import { getVehicleSettings } from "@/server/settings";
import { ServiceForm } from "@/features/services/components/service-form";
import { getServiceById } from "@/features/services/service";

export default async function Page(props: PageProps<"/services/[id]/edit">) {
  const serviceId = (await props.params).id;
  const { data } = await getServiceById(serviceId);
  const promise = getVehicleSettings();
  return (
    <ServiceForm
      initialData={{ ...data, id: data?.id ?? parseInt(serviceId) }}
      vehicleConfigPromise={promise}
    />
  );
}
