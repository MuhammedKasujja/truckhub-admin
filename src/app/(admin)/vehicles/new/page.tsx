import { getVehicleSettings } from "@/server/settings";
import { VehicleForm } from "../components/vehicle-form";

export default function CreateVehiclePage() {
  const promises = Promise.all([getVehicleSettings()]);
  return <VehicleForm configPromises={promises} />;
}
