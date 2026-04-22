import { Suspense } from "react";
import {
  BookingTable,
  BookingTableSkeleton,
} from "@/features/bookings/components/booking-table";
import { getBookings } from "@/features/bookings/services";
import { BookingSearchParamsCache } from "@/features/bookings/schemas";
import { generatePageSearchParams } from "@/lib/search-params";
import { requirePermission } from "@/lib/auth";
import { PageHeader } from "@/components/page-header";
import { BookingStatisticsCard } from "@/features/bookings/components";

export default async function Page(props: PageProps<"/bookings">) {
  await requirePermission("bookings:view");

  const searchParams = await generatePageSearchParams(
    props.searchParams,
    BookingSearchParamsCache,
  );

  const promises = Promise.all([getBookings(searchParams)]);
  return (
    <Suspense fallback={<BookingTableSkeleton />}>
      <PageHeader title="Bookings" />
      <BookingStatisticsCard/>
      <BookingTable promises={promises} />
    </Suspense>
  );
}
