import { CustomerDetailsWrapper } from "@/features/customers/components/customer-details-wrapper";
import {
  getCustomerDetailsById,
  getCustomerPayments,
  getCustomerBookings,
  getCustomerRides,
} from "@/features/customers/service";
import { requirePermission } from "@/lib/auth";
import { Suspense } from "react";

export default async function Page(props: PageProps<"/customers/[id]/view">) {
  await requirePermission("customers:view");
  const customerId = (await props.params).id;

  const promises = Promise.all([
    getCustomerDetailsById(customerId),
    getCustomerPayments(customerId),
    getCustomerBookings(customerId),
    getCustomerRides(customerId),
  ]);

  return (
    <Suspense fallback={<div>Loading customer details...</div>}>
      <CustomerDetailsWrapper promises={promises} />
    </Suspense>
  );
}
