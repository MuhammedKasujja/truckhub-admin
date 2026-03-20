import { BookingDetailsWrapper } from "@/features/bookings/components/booking-details-wrapper";
import { getBookingDetailsById } from "@/features/bookings/services";
import { requirePermission } from "@/lib/auth";
import { Suspense } from "react";

export default async function Page(props: PageProps<"/users/[id]/view">) {
  await requirePermission("bookings:edit");

  const promises = Promise.all([
    getBookingDetailsById((await props.params).id),
  ]);

  return (
    <Suspense fallback={<div>Loading booking details...</div>}>
      <BookingDetailsWrapper promises={promises} />
    </Suspense>
  );
}
