import { getServicesByQuery } from "@/features/services/service";
import { RideRequestForm } from "@/features/ride-requests/components/ride-request-form";
import { getCustomersByQuery } from "@/features/clients/service";
import { requirePermission } from "@/lib/auth";
import { getRideRequestById } from "@/features/ride-requests/service";

export default async function EditRideRequestPage(props: PageProps<'/rides/[id]/edit'>) {
  const bookingId = (await props.params).id
  await requirePermission("bookings:edit");
  await getRideRequestById(bookingId)

  const promises = Promise.all([
    getServicesByQuery({}),
    getCustomersByQuery({}),
  ]);
  return <RideRequestForm promises={promises} />;
}
