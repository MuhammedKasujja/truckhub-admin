import { getServices } from "@/features/services/service";
import { ServiceTable, ServiceTableSkeleton } from "@/features/services/components/service-table";
import { Suspense } from "react";
import { generatePageSearchParams } from "@/lib/search-params";
import { ServiceSearchParamsCache } from "@/features/services/schemas";
import { requirePermission } from "@/lib/auth";

export default async function ServicesPage(props: PageProps<"/services">) {
  await requirePermission("services:view");
  
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    ServiceSearchParamsCache,
  );

  const promises = Promise.all([getServices(searchParams)]);
  return (
    <Suspense fallback={<ServiceTableSkeleton />}>
      <ServiceTable promises={promises} />
    </Suspense>
  );
}
