import { RideRequestDetailsWrapper } from "@/features/ride-requests/components/ride-request-details-wrapper";
import { getRideRequestDetailsById } from "@/features/ride-requests/service";
import { requirePermission } from "@/lib/auth";
import { Suspense } from "react";

export default async function Page(props: PageProps<"/rides/[id]/view">) {
  await requirePermission("bookings:edit");

  const promises = Promise.all([
    getRideRequestDetailsById((await props.params).id),
  ]);

  return (
    <Suspense fallback={<div>Loading Ride details...</div>}>
      <RideRequestDetailsWrapper promises={promises} />
    </Suspense>
  );
}
