import { getVehicleSettings } from "@/server/settings";
import { ServiceForm } from "../components/service-form";

export default function CreateServicePage() {
  const promise = getVehicleSettings();
  return <ServiceForm vehicleConfigPromise={promise} />;
}
