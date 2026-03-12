import { Suspense } from "react";
import { TripTable, BookingTableSkeleton } from "./components/booking-table";
import { getTrips } from "@/features/trips/service";
import { TripSearchParamsCache } from "@/features/trips/schemas";
import { generatePageSearchParams } from "@/lib/search-params";

export default async function Page(props: PageProps<"/trips">) {
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    TripSearchParamsCache,
  );

  const promises = Promise.all([getTrips(searchParams)]);
  return (
    <Suspense fallback={<BookingTableSkeleton />}>
      <TripTable promises={promises} />
    </Suspense>
  );
}
