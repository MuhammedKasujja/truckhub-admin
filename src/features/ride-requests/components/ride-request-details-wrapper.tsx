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
import { formatDate, formatPrice } from "@/lib/format";
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

type RideRequestDetailsWrapperProps = {
  promises: Promise<[Awaited<ReturnType<typeof getRideRequestDetailsById>>]>;
};

export function RideRequestDetailsWrapper({
  promises,
}: RideRequestDetailsWrapperProps) {
  const [{ data: ride, error }] = React.use(promises);
  const mapRef = React.useRef<MapRef>(null);

  useFetchEror(error);

  return (
    <div className="grid gap-5">
      <Card>
        <CardHeader>
          <CardTitle>
            {ride?.origin.name} - {ride?.destination.name}
          </CardTitle>
          <CardAction className="flex gap-4">
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
        </CardContent>
        <CardFooter className="space-y-4 flex items-center gap-2">
          <Button>{formatPrice(ride?.amount)}</Button>
          <Button>{formatPrice(ride?.balance)}</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardContent className="h-100 w-full">
          <Map
            ref={mapRef}
            center={[ride!.origin.lng, ride!.origin.lat]}
            zoom={11.0}
            styles={{
              light: "https://tiles.openfreemap.org/styles/bright",
            }}
          >
            <MapRoute
              coordinates={generateCoordnatesFromPolyline(ride?.polyline_route)}
              color="#3b82f6"
              width={5}
              opacity={1}
            />
            {[ride!.origin, ride!.destination].map((stop, index) => (
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
