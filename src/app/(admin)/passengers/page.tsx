import { getPassengers } from "@/server/passengers";
import { Suspense } from "react";
import {
  PassengerTable,
  PassengerTableSkeleton,
} from "./_components/passenger-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { PassengerSearchParamsCache } from "@/schemas/passenger";

export default async function Page(props: PageProps<"/passengers">) {
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    PassengerSearchParamsCache,
  );

  const promises = Promise.all([getPassengers(searchParams)]);
  return (
    <Suspense fallback={<PassengerTableSkeleton />}>
      <PassengerTable promises={promises} />
    </Suspense>
  );
}
