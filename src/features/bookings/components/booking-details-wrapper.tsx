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
import { Edit2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getBookingDetailsById } from "@/features/bookings/services";
import { formatDate } from "@/lib/format";
import { Status } from "@/components/ui/status";

type BookingDetailsWrapperProps = {
  promises: Promise<[Awaited<ReturnType<typeof getBookingDetailsById>>]>;
};

export function BookingDetailsWrapper({
  promises,
}: BookingDetailsWrapperProps) {
  const [{ data: booking, error }] = React.use(promises);

  useFetchEror(error);

  return (
    <div className="grid grid-cols-5 grid-flow-col gap-5">
      <Card>
        <CardHeader>
          <CardTitle>
            {booking?.origin} - {booking?.destination}
          </CardTitle>
          <CardAction>
            <Status>{booking?.status}</Status>
            <Button asChild>
              {/* <Link href={`/bookings/${booking}/edit`}> */}
              <Edit2Icon />
              {/* </Link> */}
            </Button>
          </CardAction>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div>{booking?.customer.email}</div>
          <div>{booking?.customer.phone}</div>
          <div>{formatDate(booking?.created_at)}</div>
        </CardContent>
      </Card>
    </div>
  );
}
