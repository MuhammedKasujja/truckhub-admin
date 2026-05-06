import { CustomerDetailsWrapper } from "@/features/clients/components/customer-details-wrapper";
import {
  getCustomerDetailsById,
  getCustomerPayments,
  getCustomerBookings,
  getCustomerRides,
} from "@/features/clients/service";
import { requirePermission } from "@/lib/auth";
import { Suspense } from "react";

export default async function Page(props: PageProps<"/customers/[id]/view">) {
  await requirePermission("clients:view");
  const customerId = (await props.params).id;

  const promises = Promise.all([
    getCustomerDetailsById(customerId),
    getCustomerPayments(customerId),
    getCustomerBookings(customerId),
    getCustomerRides(customerId),
  ]);

  return (
    <Suspense fallback={<div>Loading customer details...</div>}>
      <CustomerDetailsWrapper promises={promises} customerId={customerId} />
    </Suspense>
  );
}
