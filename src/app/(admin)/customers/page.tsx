import { getCustomers } from "@/features/customers/service";
import { Suspense } from "react";
import {
  CustomerTable,
  CustomerTableSkeleton,
} from "@/features/customers/components/customer-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { CustomerSearchParamsCache } from "@/features/customers/schemas";

export default async function Page(props: PageProps<"/customers">) {
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    CustomerSearchParamsCache,
  );

  const promises = Promise.all([getCustomers(searchParams)]);
  return (
    <Suspense fallback={<CustomerTableSkeleton />}>
      <CustomerTable promises={promises} />
    </Suspense>
  );
}
