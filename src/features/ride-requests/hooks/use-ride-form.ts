import z from "zod";
import React from "react";
import { toast } from "sonner";
import { Service } from "@/features/services/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { LocationDistanceTime } from "@/server/actions/location";
import { RideRequestCreateSchema } from "@/features/ride-requests/schemas";
import { computeRideRequestEsimatedFare } from "@/features/ride-requests/service";

export function useRideForm(services: Service[]) {
  const [locationDistanceTime, setLocationDistanceTime] = React.useState<
    LocationDistanceTime | undefined
  >(undefined);

  const form = useForm<z.infer<typeof RideRequestCreateSchema>>({
    resolver: zodResolver(RideRequestCreateSchema),
    defaultValues: { checkpoints: [] },
  });

  const serviceId = form.watch("service_id");

  const service = React.useMemo(() => {
    return services.find((ele) => ele.id === serviceId);
  }, [serviceId, services]);

  async function computeRideCost() {
    const pickup = form.getValues("pickup_location");
    const destination = form.getValues("destination_location");

    const serviceId = form.getValues("service_id");
    if (!serviceId) {
      toast.error("Please select a service to continue");
      form.setError("service_id", {
        message: "Please select a service to continue",
      });
      return;
    }
    try {
    } catch (error) {}
    const { data, error, isSuccess } = await computeRideRequestEsimatedFare({
      serviceId: serviceId,
      origin: { lat: pickup.lat, lng: pickup.lng },
      destination: { lat: destination.lat, lng: destination.lng },
    });

    if (error) {
      toast.error(error.message);
    }

    if (isSuccess) {
      setLocationDistanceTime(data);
      if (data) {
        form.setValue("estimated_distance", data.distance);
        form.setValue("polyline_route", data.polyline);
        // base 10 automatically returns the first numeric string when is encounters
        // the first char `s` in the string `14245s`
        form.setValue("estimated_time", data.duration);
      }
    }
  }

  React.useEffect(() => {
    const pickup = form.getValues("pickup_location");
    const destination = form.getValues("destination_location");
    setLocationDistanceTime(undefined);
    form.setValue("estimated_distance", undefined);
    form.setValue("polyline_route", undefined);
    form.setValue("estimated_time", undefined);

    if (pickup && destination) {
      computeRideCost().then(() => {
        console.log("Ride updated");
      });
    }
  }, [serviceId]);

  const { fields: checkpoints, append } = useFieldArray({
    control: form.control,
    name: "checkpoints",
  });

  function appendCheckpoint() {
    const destination = form.getValues("destination_location");
    if (!destination) {
      toast.error("Added destination first");
      return;
    }
    append({
      name: destination.name,
      lat: destination.lat,
      lng: destination.lng,
      distance: 900,
      time: 8999,
      position: checkpoints.length + 1,
      estimated_fare: 6788,
    });
    form.setValue("destination_location", {
      name: "",
      lat: 0,
      lng: 0,
      place_id: "",
    });
  }

  return {
    form,
    appendCheckpoint,
    service,
    locationDistanceTime,
    setLocationDistanceTime,
  };
}
