import { Can } from "@/components/has-permission";
import { PageAction, PageHeader, PageTitle } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EditPaymentModal } from "@/features/payments/components/edit-payment-modal";
import {
  PaymentTable,
  PaymentTableSkeleton,
} from "@/features/payments/components/payment-table";
import { PaymentSearchParamsCache } from "@/features/payments/schemas";
import {
  getPayments,
  getPaymentsStatistics,
} from "@/features/payments/service";
import { getTranslations } from "@/i18n/server";
import { formatPrice } from "@/lib/format";
import { generatePageSearchParams } from "@/lib/search-params";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";

export default async function PaymentsPage(props: PageProps<"/payments">) {
  const tr = await getTranslations();
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    PaymentSearchParamsCache,
  );

  const { data: statistics } = await getPaymentsStatistics();

  const promises = Promise.all([getPayments(searchParams)]);

  return (
    <Suspense fallback={<PaymentTableSkeleton />}>
      <PageHeader>
        <PageTitle>{tr("modules.payments")}</PageTitle>
        <PageAction>
          <Can permission={"payments:create"}>
            <EditPaymentModal
              initialData={{ type: "booking" }}
              trigger={
                <Button>
                  <PlusIcon />
                  {tr("payments.form.new_payment")}
                </Button>
              }
            />
          </Can>
        </PageAction>
      </PageHeader>
      <div className="grid md:grid-cols-3 gap-5 pb-5">
        <Card>
          <CardHeader>
            <CardDescription className="font-semibold">Total Revenue</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-flow-col gap-5">
            <div className="space-y-1.5">
              <CardTitle className="font-bold">
                {formatPrice(statistics?.grandTotal.newValue)}
              </CardTitle>
              <CardDescription>This month</CardDescription>
            </div>
            <Separator orientation="vertical" />
            <div className="space-y-1.5">
              <CardTitle className="font-bold text-muted-foreground">
                {formatPrice(statistics?.grandTotal.oldValue)}
              </CardTitle>
              <CardDescription>Last month</CardDescription>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription className="font-semibold">Booking Revenue</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-flow-col gap-5">
            <div className="space-y-1.5">
              <CardTitle className="font-bold">
                {formatPrice(statistics?.bookings.newValue)}
              </CardTitle>
              <CardDescription>This month</CardDescription>
            </div>
            <Separator orientation="vertical" />
            <div className="space-y-1.5">
              <CardTitle className="font-bold text-muted-foreground">
                {formatPrice(statistics?.bookings.oldValue)}
              </CardTitle>
              <CardDescription>Last month</CardDescription>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription className="font-semibold">Ride Revenue</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-flow-col gap-5">
            <div className="space-y-1.5">
              <CardTitle className="font-bold">
                {formatPrice(statistics?.rides.newValue)}
              </CardTitle>
              <CardDescription>This month</CardDescription>
            </div>
            <Separator orientation="vertical" />
            <div className="space-y-1.5">
              <CardTitle className="font-bold text-muted-foreground">
                {formatPrice(statistics?.rides.oldValue)}
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
