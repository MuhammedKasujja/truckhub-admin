import { getServices } from "@/server/services";
import { ServiceTable, ServiceTableSkeleton } from "./components/service-table";
import { Suspense } from "react";

export default async function ServicesPage() {
  const promises = Promise.all([getServices()]);
  return (
    <Suspense fallback={<ServiceTableSkeleton />}>
      <ServiceTable promises={promises} />
    </Suspense>
  );
}
