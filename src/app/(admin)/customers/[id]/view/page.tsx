import { CustomerDetailsWrapper } from "@/features/customers/components/customer-details-wrapper";
import { getCustomerDetailsById } from "@/features/customers/service";
import { Suspense } from "react";

export default async function Page(props: PageProps<"/customers/[id]/view">) {
  const promises = Promise.all([
    getCustomerDetailsById((await props.params).id),
  ]);

  return (
    <Suspense fallback={<div>Loading customer details...</div>}>
      <CustomerDetailsWrapper promises={promises} />
    </Suspense>
  );
}
