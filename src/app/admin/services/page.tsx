import { getServices } from "@/server/services";
import { ServiceTable } from "./components/service-table";

export default async function ServicesPage() {
  const promises = Promise.all([getServices()]);
  return <ServiceTable promises={promises} />;
}
