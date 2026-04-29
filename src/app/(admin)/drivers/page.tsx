import { getDrivers } from "@/features/drivers/service";
import { Suspense } from "react";
import {
  DriverTable,
  DriverTableSkeleton,
} from "@/features/drivers/components/driver-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { DriverSearchParamsCache } from "@/features/drivers/schemas";
import { requirePermission } from "@/lib/auth";
import { PageAction, PageHeader, PageTitle } from "@/components/page-header";
import { Can } from "@/components/has-permission";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

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
        <PageAction>
          <Can permission={"drivers:create"}>
            <Button asChild>
              <Link href={"/drivers/new"}>
                <PlusIcon />
                New Driver
              </Link>
            </Button>
          </Can>
        </PageAction>
      </PageHeader>
      <DriverTable promises={promises} />
    </Suspense>
  );
}
