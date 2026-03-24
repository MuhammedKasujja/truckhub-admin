import { getServicesByQuery } from "@/features/services/service";
import { BookingRequestForm } from "@/features/bookings/components/booking-request-form";
import { getCustomersByQuery } from "@/features/customers/service";
import { requirePermission } from "@/lib/auth";

export default async function CreateBookingPage() {
  await requirePermission("bookings:create");

  const promises = Promise.all([
    getServicesByQuery({}),
    getCustomersByQuery({}),
  ]);
  return <BookingRequestForm promises={promises} />;
}
