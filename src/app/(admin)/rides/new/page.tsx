import { getServicesByQuery } from "@/features/services/service";
import { getCustomersByQuery } from "@/features/clients/service";
import { requirePermission } from "@/lib/auth";
import { RideRequestForm } from "@/features/ride-requests/components/ride-request-form";

export default async function CreateTripPage() {
  await requirePermission("bookings:create");

  const promises = Promise.all([
    getServicesByQuery({}),
    getCustomersByQuery({}),
  ]);
  return <RideRequestForm promises={promises} />;
}
