import { BookingDetailsWrapper } from "@/features/bookings/components/booking-details-wrapper";
import { getBookingDetailsById } from "@/features/bookings/services";
import { Suspense } from "react";

export default async function Page(props: PageProps<"/users/[id]/view">) {
  const promises = Promise.all([
    getBookingDetailsById((await props.params).id),
  ]);

  return (
    <Suspense fallback={<div>Loading booking details...</div>}>
      <BookingDetailsWrapper promises={promises} />
    </Suspense>
  );
}
