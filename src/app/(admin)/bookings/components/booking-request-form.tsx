"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import {
  AutoCompleteField,
  DatePickerField,
  TextField,
} from "@/components/ui/form-fields";
import { useTranslation } from "@/i18n";
import { BookingCreateSchema } from "@/features/bookings/schemas";
import { createBooking } from "@/features/bookings/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { getServicesByQuery } from "@/features/services/service";
import React from "react";
import { getPassengersByQuery } from "@/features/clients/service";
import { LocationAutoComplete } from "@/components/location-autocomplete";
import {
  getLocationDistanceTime,
  LocationDistanceTime,
} from "@/server/actions/location";
import { Service } from "@/features/services/types";
import { formatDistance, formatPrice } from "@/lib/format";
import {
  Map,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerTooltip,
  type MapRef,
} from "@/components/ui/map";
import polyline from "@mapbox/polyline";

type BookingRequestFormProps = {
  promises: Promise<
    [
      Awaited<ReturnType<typeof getServicesByQuery>>,
      Awaited<ReturnType<typeof getPassengersByQuery>>,
    ]
  >;
};

export function BookingRequestForm({ promises }: BookingRequestFormProps) {
  const [{ data: services }, { data: passengers }] = React.use(promises);
  const mapRef = React.useRef<MapRef>(null);

  const [locationDistanceTime, setLocationDistanceTime] =
    React.useState<LocationDistanceTime | null>(null);
  const [service, setService] = React.useState<Service | undefined>();

  const tr = useTranslation();
  const form = useForm<z.infer<typeof BookingCreateSchema>>({
    resolver: zodResolver(BookingCreateSchema),
  });

  const serviceId = form.watch("service_id");

  React.useEffect(() => {
    const selectedService = services.find((ele) => ele.id === serviceId);
    setService(selectedService);
  }, [serviceId, services]);

  async function onSubmit(values: z.infer<typeof BookingCreateSchema>) {
    const { isSuccess, error } = await createBooking(values);
    if (isSuccess) {
      toast.success(`${tr("trips.trip_created_successfully")}`);
    } else {
      toast.error(error!.message);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-5">
      <Card>
        <CardHeader>
          <CardTitle>{tr("trips.new_trip")}</CardTitle>
          <CardDescription>{tr("trips.create_trip_help")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            // className="p-6 md:p-8"
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.log(errors);
            })}
          >
            <FieldGroup>
              <AutoCompleteField
                label={tr("common.service")}
                name={"service_id"}
                control={form.control}
                options={services.map((ele) => ({
                  label: ele.display_name,
                  value: ele.id,
                }))}
              />
              <AutoCompleteField
                label={tr("common.passenger")}
                name={"passenger_id"}
                control={form.control}
                options={passengers.map((ele) => ({
                  label: ele.fullname,
                  value: ele.id,
                }))}
              />
              <DatePickerField
                label={"Start time"}
                name={"request_start_time"}
                control={form.control}
              />
              <LocationAutoComplete
                onPlaceLoaded={(place) => {
                  setLocationDistanceTime(null);
                  if (place) {
                    form.setValue("pickup_location", {
                      name: place.address1,
                      lat: place.lat,
                      lng: place.lng,
                      place_id: place.placeId,
                    });
                  }
                }}
              />
              <LocationAutoComplete
                onPlaceLoaded={async (place) => {
                  if (place) {
                    form.setValue("destination_location", {
                      name: place.address1,
                      lat: place.lat,
                      lng: place.lng,
                      place_id: place.placeId,
                    });
                    const pickup = form.getValues("pickup_location");
                    const { data } = await getLocationDistanceTime({
                      origin: { lat: pickup.lat, lng: pickup.lng },
                      destination: { lat: place.lat, lng: place.lng },
                    });
                    setLocationDistanceTime(data);
                    if (data) {
                      form.setValue("estimated_distance", data.distanceMeters);
                      // base 10 automatically returns the first numeric string when is encounters 
                      // the first char `s` in the string `14245s`
                      form.setValue("estimated_time", parseInt(data.duration, 10));
                    }
                  }
                }}
              />
              <TextField
                label={tr("common.driver")}
                name={"driver_id"}
                control={form.control}
                required={false}
              />
              <CardFooter>
                <Button type="submit">{tr("common.form.submit")}</Button>
              </CardFooter>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      {locationDistanceTime && service && (
        <Card>
          <CardContent>
            <div>
              Estimate Price:{" "}
              {formatPrice(
                service.base_fare *
                  (locationDistanceTime.distanceMeters / 1000),
              )}
            </div>
            <div>
              Estimate Time price:{" "}
              {formatPrice(
                service.price_per_unit_distance *
                  (locationDistanceTime.distanceMeters / 1000),
              )}
            </div>
            <div>
              Distance: {formatDistance(locationDistanceTime.distanceMeters)}
            </div>
            <div className="h-[400px] w-full">
              <Map
                ref={mapRef}
                center={[
                  form.getValues("pickup_location").lng,
                  form.getValues("pickup_location").lat,
                ]}
                zoom={11.0}
                styles={{
                  light: "https://tiles.openfreemap.org/styles/bright",
                }}
              >
                <MapRoute
                  coordinates={polyline
                    .decode(locationDistanceTime.polyline.encodedPolyline)
                    .map(([lat, lng]) => [lng, lat])}
                  color="#3b82f6"
                  width={5}
                  opacity={1}
                />
                {[
                  form.getValues("pickup_location"),
                  form.getValues("destination_location"),
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
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
