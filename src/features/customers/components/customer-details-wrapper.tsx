"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchEror } from "@/hooks/use-fetch-error";
import { CreditCard, Edit2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  getCustomerDetailsById,
  getCustomerPayments,
} from "@/features/customers/service";
import { formatDate, formatPrice } from "@/lib/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { HasPermission } from "@/components/has-permission";
import { EditPaymentModal } from "@/features/payments/components/edit-payment-modal";

type CustomerDetailsWrapperProps = {
  promises: Promise<
    [
      Awaited<ReturnType<typeof getCustomerDetailsById>>,
      Awaited<ReturnType<typeof getCustomerPayments>>,
    ]
  >;
};

export function CustomerDetailsWrapper({
  promises,
}: CustomerDetailsWrapperProps) {
  const [{ data: customer, error }, { data: payments }] = React.use(promises);

  useFetchEror(error);

  return (
    <div className="grid gap-5">
      <Card>
        <CardHeader>
          <CardTitle>{customer?.fullname}</CardTitle>
          <CardAction>
            <Button asChild size={"icon"}>
              <Link href={`/customers/${customer?.id}/edit`}>
                <Edit2Icon />
              </Link>
            </Button>
          </CardAction>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>{customer?.email}</div>
          <div>{customer?.phone}</div>
          <div>Balance: {formatPrice(customer?.balance)}</div>
          <div>Paid to Date: {formatPrice(customer?.paid_to_date)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border bg-background">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-25">Number</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments?.length ? (
                  payments.map((payment) => (
                    <TableRow key={payment.id.toString()}>
                      <TableCell className="font-medium">
                        {payment.number}
                      </TableCell>
                      <TableCell>{formatPrice(payment.amount)}</TableCell>
                      <TableCell>{payment.status}</TableCell>
                      <TableCell>{payment.payment_mode}</TableCell>
                      <TableCell>{formatDate(payment.date)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <Empty className="">
                        <EmptyHeader>
                          <EmptyMedia variant="icon">
                            <CreditCard />
                          </EmptyMedia>
                          <EmptyTitle>No Payments Found</EmptyTitle>
                        </EmptyHeader>
                        <EmptyContent>
                          <HasPermission permission={"payments:create"}>
                            <EditPaymentModal
                              initialData={{
                                type: "booking",
                              }}
                              trigger={
                                <Button variant={"outline"}>
                                  Make Payment
                                </Button>
                              }
                            />
                          </HasPermission>
                        </EmptyContent>
                      </Empty>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
