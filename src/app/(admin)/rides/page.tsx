import { Suspense } from "react";
import {
  RideRequestTable,
  RideRequestTableSkeleton,
} from "@/features/ride-requests/components/ride-requests-table";
import { getRideRequests } from "@/features/ride-requests/service";
import { RideRequestSearchParamsCache } from "@/features/ride-requests/schemas";
import { generatePageSearchParams } from "@/lib/search-params";
import { requirePermission } from "@/lib/auth";
import { PageHeader, PageTitle } from "@/components/header";

export default async function Page(props: PageProps<"/rides">) {
  await requirePermission("bookings:view");

  const searchParams = await generatePageSearchParams(
    props.searchParams,
    RideRequestSearchParamsCache,
  );

  const promises = Promise.all([getRideRequests(searchParams)]);
  return (
    <Suspense fallback={<RideRequestTableSkeleton />}>
      <PageHeader>
        <PageTitle>Rides</PageTitle>
      </PageHeader>
      <RideRequestTable promises={promises} />
    </Suspense>
  );
}
