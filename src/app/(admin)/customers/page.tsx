import { getCustomers } from "@/features/clients/service";
import { Suspense } from "react";
import {
  CustomerTable,
  CustomerTableSkeleton,
} from "@/features/clients/components/customer-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { CustomerSearchParamsCache } from "@/features/clients/schemas";
import { requirePermission } from "@/lib/auth";
import {
  PageAction,
  PageDescription,
  PageBackButton,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { HasPermission } from "@/components/has-permission";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { getTranslations } from "@/i18n/server";

export default async function Page(props: PageProps<"/customers">) {
  await requirePermission("clients:view");
  const tr = await getTranslations()

  const searchParams = await generatePageSearchParams(
    props.searchParams,
    CustomerSearchParamsCache,
  );

  const promises = Promise.all([getCustomers(searchParams)]);
  return (
    <Suspense fallback={<CustomerTableSkeleton />}>
      <PageHeader>
        <PageTitle>
          <PageBackButton/>
          {tr("common.clients")}</PageTitle>
        {/* <PageDescription>Manage your projects and team members</PageDescription> */}
        <PageAction>
          <HasPermission permission={"clients:create"}>
            <Button asChild>
              <Link href={"/customers/new"}>
                <PlusIcon />
                New Customer
              </Link>
            </Button>
          </HasPermission>
        </PageAction>
      </PageHeader>
      <CustomerTable promises={promises} />
    </Suspense>
  );
}
