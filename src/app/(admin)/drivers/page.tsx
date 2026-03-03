import { getDrivers } from "@/server/drivers";
import { Suspense } from "react";
import { DriverTable, DriverTableSkeleton } from "./components/driver-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { DriverSearchParamsCache } from "@/schemas/driver";

export default async function Page(props: PageProps<"/drivers">) {
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    DriverSearchParamsCache,
  );

  const promises = Promise.all([getDrivers(searchParams)]);
  return (
    <Suspense fallback={<DriverTableSkeleton />}>
      <DriverTable promises={promises} />
    </Suspense>
  );
}
