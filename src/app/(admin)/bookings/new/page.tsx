import { getServicesByQuery } from "@/features/services/service";
import { BookingRequestForm } from "@/features/bookings/components/booking-request-form";
import { getCustomersByQuery } from "@/features/customers/service";

export default function CreateTripPage() {
  const promises = Promise.all([getServicesByQuery({}), getCustomersByQuery({})]);
  return <BookingRequestForm promises={promises} />;
}
