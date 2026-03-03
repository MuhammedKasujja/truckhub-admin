import { getDrivers } from "@/server/drivers";
import { Suspense } from "react";
import { DriverTable, DriverTableSkeleton } from "./components/driver-table";

export default async function Page() {
  const promises = Promise.all([getDrivers()]);
  return (
    <Suspense fallback={<DriverTableSkeleton />}>
      <DriverTable promises={promises} />
    </Suspense>
  );
}
