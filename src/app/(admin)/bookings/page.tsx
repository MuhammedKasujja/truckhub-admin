import { Suspense } from "react";
import { BookingTable, BookingTableSkeleton } from "./components/booking-table";
import { getBookings } from "@/features/bookings/service";
import { BookingSearchParamsCache } from "@/features/bookings/schemas";
import { generatePageSearchParams } from "@/lib/search-params";

export default async function Page(props: PageProps<"/bookings">) {
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    BookingSearchParamsCache,
  );

  const promises = Promise.all([getBookings(searchParams)]);
  return (
    <Suspense fallback={<BookingTableSkeleton />}>
      <BookingTable promises={promises} />
    </Suspense>
  );
}
