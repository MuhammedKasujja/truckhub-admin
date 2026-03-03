import { Suspense } from "react";
import { TripTable, TripTableSkeleton } from "./components/trip-table";
import { getTrips } from "@/server/trips";

export default async function Page() {
  // const searchParams = await generatePageSearchParams(
  //   props.searchParams,
  //   VehicleSearchParamsCache,
  // );

  const promises = Promise.all([getTrips()]);
  return (
    <Suspense fallback={<TripTableSkeleton />}>
      <TripTable promises={promises} />
    </Suspense>
  );
}
