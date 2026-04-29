import { Suspense } from "react";
import {
  RideRequestTable,
  RideRequestTableSkeleton,
} from "@/features/ride-requests/components/ride-requests-table";
import { getRideRequests } from "@/features/ride-requests/service";
import { RideRequestSearchParamsCache } from "@/features/ride-requests/schemas";
import { generatePageSearchParams } from "@/lib/search-params";
import { requirePermission } from "@/lib/auth";
import { PageAction, PageHeader, PageTitle } from "@/components/page-header";
import { Can } from "@/components/has-permission";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

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
        <PageAction>
          <Can permission="rides:create">
            <Button size={"sm"} asChild>
              <Link href={"/rides/new"}>
                <PlusIcon />
                New Request
              </Link>
            </Button>
          </Can>
        </PageAction>
      </PageHeader>
      <RideRequestTable promises={promises} />
    </Suspense>
  );
}
