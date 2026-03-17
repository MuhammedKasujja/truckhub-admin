import { SpecialBookingRequestForm } from "@/features/bookings/components/special-booking/special-booking-request-form";
import { getCustomersByQuery } from "@/features/customers/service";
import { getServicesByQuery } from "@/features/services/service";

export default function Page() {
  const promises = Promise.all([
    getServicesByQuery({}),
    getCustomersByQuery({}),
  ]);

  return <SpecialBookingRequestForm promises={promises} />;
}
