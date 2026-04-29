import { PageHeader, PageTitle } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  PaymentTable,
  PaymentTableSkeleton,
} from "@/features/payments/components/payment-table";
import { PaymentSearchParamsCache } from "@/features/payments/schemas";
import { getPayments } from "@/features/payments/service";
import { formatPrice } from "@/lib/format";
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
      <PageHeader>
        <PageTitle>Payments</PageTitle>
      </PageHeader>
      <div className="grid md:grid-cols-3 gap-5 pb-5">
        <Card>
          <CardHeader>
            <CardDescription className="font-semibold">Revenue</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-flow-col gap-5">
            <div className="space-y-1.5">
              <CardTitle className="font-bold">{formatPrice(12450)}</CardTitle>
              <CardDescription>This month</CardDescription>
            </div>
            <Separator orientation="vertical" />
            <div className="space-y-1.5">
              <CardTitle className="font-bold text-muted-foreground">
                {formatPrice(10230)}
              </CardTitle>
              <CardDescription>Last month</CardDescription>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription className="font-semibold">Revenue</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-flow-col gap-5">
            <div className="space-y-1.5">
              <CardTitle className="font-bold">{formatPrice(12450)}</CardTitle>
              <CardDescription>This month</CardDescription>
            </div>
            <Separator orientation="vertical" />
            <div className="space-y-1.5">
              <CardTitle className="font-bold text-muted-foreground">
                {formatPrice(10230)}
              </CardTitle>
              <CardDescription>Last month</CardDescription>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription className="font-semibold">Revenue</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-flow-col gap-5">
            <div className="space-y-1.5">
              <CardTitle className="font-bold">{formatPrice(12450)}</CardTitle>
              <CardDescription>This month</CardDescription>
            </div>
            <Separator orientation="vertical" />
            <div className="space-y-1.5">
              <CardTitle className="font-bold text-muted-foreground">
                {formatPrice(10230)}
              </CardTitle>
              <CardDescription>Last month</CardDescription>
            </div>
          </CardContent>
        </Card>
      </div>
      <PaymentTable promises={promises} />
    </Suspense>
  );
}
