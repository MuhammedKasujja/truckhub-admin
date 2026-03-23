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
import {
  computeBookingEsimatedFare,
  createBooking,
} from "@/features/bookings/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { getServicesByQuery } from "@/features/services/service";
import React from "react";
import { getCustomersByQuery } from "@/features/customers/service";
import { LocationAutoComplete } from "@/components/location-autocomplete";
import { LocationDistanceTime } from "@/server/actions/location";
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
import { Customer } from "@/features/customers/types";

type BookingRequestFormProps = {
  promises: Promise<
    [
      Awaited<ReturnType<typeof getServicesByQuery>>,
      Awaited<ReturnType<typeof getCustomersByQuery>>,
    ]
  >;
};

export function BookingRequestForm({ promises }: BookingRequestFormProps) {
  const [{ data: services }, { data: passengers }] = React.use(promises);
  const mapRef = React.useRef<MapRef>(null);

  const [locationDistanceTime, setLocationDistanceTime] = React.useState<
    LocationDistanceTime | undefined
  >(undefined);

  const tr = useTranslation();
  const form = useForm<z.infer<typeof BookingCreateSchema>>({
    resolver: zodResolver(BookingCreateSchema),
  });

  const serviceId = form.watch("service_id");

  const service = React.useMemo(() => {
    return services.find((ele) => ele.id === serviceId);
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
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log(errors);
          })}
        >
          <CardContent>
            <FieldGroup className="pb-6">
              <AutoCompleteField
                label={tr("common.service")}
                name={"service_id"}
                control={form.control}
                options={services.map((ele) => ({
                  label: ele.name,
                  value: ele.id,
                }))}
              />
              <AutoCompleteField
                label={tr("common.passenger")}
                name={"customer_id"}
                control={form.control}
                options={passengers.map((ele) => ({
                  label: ele.fullname,
                  value: ele.id,
                }))}
              />
              {/* <SearchAutoCompleteField<
                Customer,
                z.infer<typeof BookingCreateSchema>
              >
                control={form.control}
                label={tr("common.passenger")}
                name={"customer_id"}
                fetcher={async (_) => {
                  return passengers;
                }}
                renderOption={(customer) => (
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <div className="font-medium">{customer.fullname}</div>
                    </div>
                  </div>
                )}
                getOptionValue={(customer) => customer.id.toString()}
                getDisplayValue={(customer) => (
                  <div className="flex items-center gap-2 text-left">
                    <div className="flex flex-col leading-tight">
                      <div className="font-medium">{customer.fullname}</div>
                    </div>
                  </div>
                )}
                notFound={
                  <div className="py-6 text-center text-sm">
                    No Customers found
                  </div>
                }
                placeholder="Search customer..."
              /> */}
              <DatePickerField
                label={"Start time"}
                name={"request_start_time"}
                control={form.control}
              />
              <LocationAutoComplete
                onPlaceLoaded={(place) => {
                  setLocationDistanceTime(undefined);
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
                    const { data } = await computeBookingEsimatedFare({
                      serviceId: form.getValues("service_id"),
                      origin: { lat: pickup.lat, lng: pickup.lng },
                      destination: { lat: place.lat, lng: place.lng },
                    });
                    setLocationDistanceTime(data);
                    if (data) {
                      form.setValue("estimated_distance", data.distance);
                      form.setValue("polyline_route", data.polyline);
                      // base 10 automatically returns the first numeric string when is encounters
                      // the first char `s` in the string `14245s`
                      form.setValue("estimated_time", data.duration);
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
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Button type="submit">{tr("common.form.submit")}</Button>
          </CardFooter>
        </form>
      </Card>
      {locationDistanceTime && service && (
        <Card>
          <CardContent>
            <div>
              Estimate price:{" "}
              {formatPrice(parseFloat(locationDistanceTime.estimated_cost))}
            </div>
            <div>Distance: {formatDistance(locationDistanceTime.distance)}</div>
            <div className="h-100 w-full">
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
                    .decode(locationDistanceTime.polyline)
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
