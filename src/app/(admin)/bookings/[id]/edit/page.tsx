import { getServicesByQuery } from "@/features/services/service";
import { BookingRequestForm } from "@/features/bookings/components/booking-request-form";
import { getCustomersByQuery } from "@/features/clients/service";
import { requirePermission } from "@/lib/auth";
import { getBookingById } from "@/features/bookings/services";

export default async function EditBookingPage(props: PageProps<'/bookings/[id]/edit'>) {
  const bookingId = (await props.params).id
  await requirePermission("bookings:edit");
  await getBookingById(bookingId)

  const promises = Promise.all([
    getServicesByQuery({}),
    getCustomersByQuery({}),
  ]);
  return <BookingRequestForm promises={promises} />;
}
