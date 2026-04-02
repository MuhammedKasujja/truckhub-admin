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
import { Edit2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getRideRequestDetailsById } from "@/features/ride-requests/service";
import {
  formatDate,
  formatDistance,
  formatDuration,
  formatPrice,
} from "@/lib/format";
import { Status } from "@/components/ui/status";
import { HasPermission } from "@/components/has-permission";
import { EditPaymentModal } from "@/features/payments/components/edit-payment-modal";
import { RideRequestMap } from "./ride-request-map";

type RideRequestDetailsWrapperProps = {
  promises: Promise<[Awaited<ReturnType<typeof getRideRequestDetailsById>>]>;
};

export function RideRequestDetailsWrapper({
  promises,
}: RideRequestDetailsWrapperProps) {
  const [{ data: ride, error }] = React.use(promises);

  useFetchEror(error);

  if (error) {
    return <div>Ride not found</div>;
  }

  return (
    <div className="grid gap-5">
      <Card>
        <CardHeader>
          <CardTitle>
            {ride?.origin.name} - {ride?.destination.name}
          </CardTitle>
          <CardAction className="flex gap-4">
            {!ride?.is_paid && (
              <HasPermission permission={"payments:create"}>
                <EditPaymentModal
                  initialData={{
                    entity_id: ride?.id,
                    amount: ride?.balance,
                    type: "ride",
                  }}
                />
              </HasPermission>
            )}
            <Status>{ride?.status}</Status>
            <Button asChild>
              <Link href={`/rides/${ride?.id}/edit`}>
                <Edit2Icon />
              </Link>
            </Button>
          </CardAction>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>{formatDate(ride?.request_start_time)}</div>
          <div>{ride?.customer.fullname}</div>
          <div>{ride?.customer.email}</div>
          <div>{ride?.customer.phone}</div>
          <div>{formatDate(ride?.created_at)}</div>
          <div>Distance: {formatDistance(ride!.distance)}</div>
          <div>Time: {formatDuration(ride!.duration)}</div>
        </CardContent>
        <CardFooter className="space-y-4 flex items-center gap-2">
          <Button>{formatPrice(ride?.amount)}</Button>
          <Button>{formatPrice(ride?.balance)}</Button>
          <Button variant={"outline"}>
            Partial: {formatPrice(ride?.partial)}
          </Button>
        </CardFooter>
      </Card>
      <RideRequestMap
        origin={ride!.origin}
        destination={ride!.destination}
        waypoints={[]}
      />
    </div>
  );
}
