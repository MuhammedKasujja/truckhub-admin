import {
  PaymentTable,
  PaymentTableSkeleton,
} from "@/features/payments/components/payment-table";
import { PaymentSearchParamsCache } from "@/features/payments/schemas";
import { getPayments } from "@/features/payments/service";
import { generatePageSearchParams } from "@/lib/search-params";
import { Suspense } from "react";

export default async function PaymentsPage(props: PageProps<"/payments">) {
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    PaymentSearchParamsCache,
  );

  const promises = Promise.all([getPayments(searchParams)]);

  return (
    <Suspense fallback={<PaymentTableSkeleton />}>
      <PaymentTable promises={promises} />
    </Suspense>
  );
}
