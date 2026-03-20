import { SpecialBookingRequestForm } from "@/features/bookings/components/special-booking/special-booking-request-form";
import { getCustomersByQuery } from "@/features/customers/service";
import { getServicesByQuery } from "@/features/services/service";
import { requirePermission } from "@/lib/auth";

export default async function Page() {
  await requirePermission("bookings:create");
  
  const promises = Promise.all([
    getServicesByQuery({}),
    getCustomersByQuery({}),
  ]);

  return <SpecialBookingRequestForm promises={promises} />;
}
