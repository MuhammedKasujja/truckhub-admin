import { getDrivers } from "@/features/drivers/service";
import { Suspense } from "react";
import { DriverTable, DriverTableSkeleton } from "@/features/drivers/components/driver-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { DriverSearchParamsCache } from "@/features/drivers/schemas";
import { requirePermission } from "@/lib/auth";
import { PageHeader, PageTitle } from "@/components/header";

export default async function Page(props: PageProps<"/drivers">) {
  await requirePermission("drivers:view");
  
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    DriverSearchParamsCache,
  );

  const promises = Promise.all([getDrivers(searchParams)]);
  return (
    <Suspense fallback={<DriverTableSkeleton />}>
      <PageHeader>
        <PageTitle>Drivers</PageTitle>
      </PageHeader>
      <DriverTable promises={promises} />
    </Suspense>
  );
}
