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
import { PageAction, PageHeader, PageTitle } from "@/components/page-header";
import { Can } from "@/components/has-permission";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

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
        <PageAction>
          <Can permission="bookings:create">
            <Button asChild>
              <Link href={"/bookings/new"}>
                <PlusIcon />
                New Booking
              </Link>
            </Button>
          </Can>
        </PageAction>
      </PageHeader>
      <BookingStatisticsCard />
      <BookingTable promises={promises} />
    </Suspense>
  );
}
