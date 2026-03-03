import { getServices } from "@/server/services";
import { ServiceTable, ServiceTableSkeleton } from "./components/service-table";
import { Suspense } from "react";
import { generatePageSearchParams } from "@/lib/search-params";
import { ServiceSearchParamsCache } from "@/schemas/service";

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
