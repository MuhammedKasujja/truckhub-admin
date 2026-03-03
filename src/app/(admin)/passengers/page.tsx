import { getPassengers } from "@/server/passengers";
import { Suspense } from "react";
import {
  PassengerTable,
  PassengerTableSkeleton,
} from "./components/passenger-table";

export default async function Page() {
  const promises = Promise.all([getPassengers()]);
  return (
    <Suspense fallback={<PassengerTableSkeleton />}>
      <PassengerTable promises={promises} />
    </Suspense>
  );
}
