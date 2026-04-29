import { Suspense } from "react";
import {
  BookingTable,
  BookingTableSkeleton,
} from "@/features/bookings/components/booking-table";
import { getBookings } from "@/features/bookings/services";
import { BookingSearchParamsCache } from "@/features/bookings/schemas";
import { generatePageSearchParams } from "@/lib/search-params";
import { requirePermission } from "@/lib/auth";
import { BookingStatisticsCard } from "@/features/bookings/components";
import { PageHeader, PageTitle } from "@/components/header";

export default async function Page(props: PageProps<"/bookings">) {
  await requirePermission("bookings:view");

  const searchParams = await generatePageSearchParams(
    props.searchParams,
    BookingSearchParamsCache,
  );

  const promises = Promise.all([getBookings(searchParams)]);
  return (
    <Suspense fallback={<BookingTableSkeleton />}>
      <PageHeader>
        <PageTitle>Bookings</PageTitle>
      </PageHeader>
      <BookingStatisticsCard/>
      <BookingTable promises={promises} />
    </Suspense>
  );
}
