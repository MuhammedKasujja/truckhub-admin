import { getCustomers } from "@/features/clients/service";
import { Suspense } from "react";
import {
  PassengerTable,
  PassengerTableSkeleton,
} from "./_components/passenger-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { PassengerSearchParamsCache } from "@/features/clients/schemas";

export default async function Page(props: PageProps<"/passengers">) {
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    PassengerSearchParamsCache,
  );

  const promises = Promise.all([getCustomers(searchParams)]);
  return (
    <Suspense fallback={<PassengerTableSkeleton />}>
      <PassengerTable promises={promises} />
    </Suspense>
  );
}
