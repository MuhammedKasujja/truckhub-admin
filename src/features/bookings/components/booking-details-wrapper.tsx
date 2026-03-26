"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchEror } from "@/hooks/use-fetch-error";
import { CreditCard, Edit2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getBookingDetailsById } from "@/features/bookings/services";
import { formatDate, formatPrice } from "@/lib/format";
import { Status } from "@/components/ui/status";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditPaymentModal } from "@/features/payments/components/edit-payment-modal";
import { HasPermission } from "@/components/has-permission";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

type BookingDetailsWrapperProps = {
  promises: Promise<[Awaited<ReturnType<typeof getBookingDetailsById>>]>;
};

export function BookingDetailsWrapper({
  promises,
}: BookingDetailsWrapperProps) {
  const [{ data: booking, error }] = React.use(promises);

  useFetchEror(error);

  return (
    <div className="grid gap-5">
      <Card>
        <CardHeader>
          <CardTitle>
            {formatDate(booking?.pickup_time)} -{" "}
            {formatDate(booking?.return_time)}
          </CardTitle>
          <CardAction className="flex gap-4">
            {!booking?.is_paid && (
              <HasPermission permission={"payments:create"}>
                <EditPaymentModal
                  initialData={{
                    entity_id: booking?.id,
                    amount: booking?.balance,
                    type: "booking",
                  }}
                />
              </HasPermission>
            )}
            <Status>{booking?.status}</Status>
            <HasPermission permission={"bookings:edit"}>
              <Button asChild>
                <Link href={`/bookings/${booking?.id}/edit`}>
                  <Edit2Icon />
                </Link>
              </Button>
            </HasPermission>
          </CardAction>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>{booking?.customer.fullname}</div>
          <div>{booking?.customer.email}</div>
          <div>{booking?.customer.phone}</div>
          <div>{formatDate(booking?.created_at)}</div>
        </CardContent>
        <CardFooter className="space-y-4 flex items-center gap-2">
          <Button>{formatPrice(booking?.amount)}</Button>
          <Button>
            {booking?.is_paid ? "Paid" : formatPrice(booking?.balance)}
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border bg-background">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-25">Service</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {booking?.services.map((service) => (
                  <TableRow key={service.service_id}>
                    <TableCell className="font-medium">
                      {service.service_name}
                    </TableCell>
                    <TableCell>{formatPrice(service.cost_per_item)}</TableCell>
                    <TableCell>{service.total_items}</TableCell>
                    <TableCell className="text-right">
                      {formatPrice(service.cost_per_item * service.total_items)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">
                    {formatPrice(
                      booking?.services.reduce(
                        (prev, service) =>
                          service.cost_per_item * service.total_items + prev,
                        0,
                      ) ?? 0,
                    )}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
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
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {booking?.payments.length ? (
                  booking?.payments.map((payment) => (
                    <TableRow key={payment.id.toString()}>
                      <TableCell className="font-medium">
                        {payment.number}
                      </TableCell>
                      <TableCell>{formatPrice(payment.amount)}</TableCell>
                      <TableCell>{payment.status}</TableCell>
                      <TableCell className="text-right">
                        {formatDate(payment.date)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      <Empty className="">
                        <EmptyHeader>
                          <EmptyMedia variant="icon">
                            <CreditCard />
                          </EmptyMedia>
                          <EmptyTitle>No Payments Found</EmptyTitle>
                        </EmptyHeader>
                        <EmptyContent>
                          {!booking?.is_paid && (
                            <HasPermission permission={"payments:create"}>
                              <EditPaymentModal
                                initialData={{
                                  entity_id: booking?.id,
                                  amount: booking?.balance,
                                  type: "booking",
                                }}
                                trigger={
                                  <Button variant={"outline"}>
                                    Make Payment
                                  </Button>
                                }
                              />
                            </HasPermission>
                          )}
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
