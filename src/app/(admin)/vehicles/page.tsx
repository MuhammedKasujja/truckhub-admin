import { getVehicles } from "@/server/vehicles";
import { VehicleTable } from "./components/vehicle-table";

export default function VehiclePage(props: PageProps<"/vehicles">) {
  const promises = Promise.all([getVehicles()]);
  return <VehicleTable promises={promises} />;
}
