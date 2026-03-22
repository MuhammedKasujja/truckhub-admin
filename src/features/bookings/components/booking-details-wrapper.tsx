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
import {
  Map,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerTooltip,
  type MapRef,
} from "@/components/ui/map";
import { generateCoordnatesFromPolyline } from "@/lib/maps";

type BookingDetailsWrapperProps = {
  promises: Promise<[Awaited<ReturnType<typeof getBookingDetailsById>>]>;
};

export function BookingDetailsWrapper({
  promises,
}: BookingDetailsWrapperProps) {
  const [{ data: booking, error }] = React.use(promises);
  const mapRef = React.useRef<MapRef>(null);

  useFetchEror(error);

  return (
    <div className="grid gap-5">
      <Card>
        <CardHeader>
          <CardTitle>
            {booking?.origin.name} - {booking?.destination.name}
          </CardTitle>
          <CardAction className="flex gap-4">
            <Status>{booking?.status}</Status>
            <Button asChild>
              <Link href={`/bookings/${booking?.id}/edit`}>
                <Edit2Icon />
              </Link>
            </Button>
          </CardAction>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>{formatDate(booking?.request_start_time)}</div>
          <div>{booking?.customer.fullname}</div>
          <div>{booking?.customer.email}</div>
          <div>{booking?.customer.phone}</div>
          <div>{formatDate(booking?.created_at)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="h-100 w-full">
              <Map
                ref={mapRef}
                center={[
                  booking!.origin.lng,
                  booking!.origin.lat,
                ]}
                zoom={11.0}
                styles={{
                  light: "https://tiles.openfreemap.org/styles/bright",
                }}
              >
                <MapRoute
                  coordinates={generateCoordnatesFromPolyline(booking?.polyline_route)}
                  color="#3b82f6"
                  width={5}
                  opacity={1}
                />
                {[
                 booking!.origin,
                  booking!.destination,
                ].map((stop, index) => (
                  <MapMarker
                    key={stop.name}
                    longitude={stop.lng}
                    latitude={stop.lat}
                  >
                    <MarkerContent>
                      <div className="size-4.5 rounded-full bg-primary border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-semibold">
                        {index + 1}
                      </div>
                    </MarkerContent>
                    <MarkerTooltip>{stop.name}</MarkerTooltip>
                  </MapMarker>
                ))}
              </Map>
        </CardContent>
      </Card>
    </div>
  );
}
