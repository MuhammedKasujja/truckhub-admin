import { getServices } from "@/features/services/service";
import { ServiceTable, ServiceTableSkeleton } from "./_components/service-table";
import { Suspense } from "react";
import { generatePageSearchParams } from "@/lib/search-params";
import { ServiceSearchParamsCache } from "@/features/services/schemas";

export default async function ServicesPage(props: PageProps<"/services">) {
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
