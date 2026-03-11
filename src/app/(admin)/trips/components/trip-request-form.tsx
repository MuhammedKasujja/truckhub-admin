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
import { AutoCompleteField, TextField } from "@/components/ui/form-fields";
import { useTranslation } from "@/i18n";
import { TripCreateSchema } from "@/features/trips/schemas";
import { createTrip } from "@/features/trips/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { getServicesByQuery } from "@/features/services/service";
import React from "react";
import { getPassengersByQuery } from "@/features/clients/service";

type TripRequestFormProps = {
  promises: Promise<
    [
      Awaited<ReturnType<typeof getServicesByQuery>>,
      Awaited<ReturnType<typeof getPassengersByQuery>>,
    ]
  >;
};

export function TripRequestForm({ promises }: TripRequestFormProps) {
  const [{ data: services }, { data: passengers }] = React.use(promises);

  const tr = useTranslation();
  const form = useForm<z.infer<typeof TripCreateSchema>>({
    resolver: zodResolver(TripCreateSchema),
  });

  async function onSubmit(values: z.infer<typeof TripCreateSchema>) {
    const { isSuccess, error } = await createTrip(values);
    if (isSuccess) {
      toast.success(`${tr("trips.trip_created_successfully")}`);
    } else {
      toast.error(error!.message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tr("trips.new_trip")}</CardTitle>
        <CardDescription>{tr("trips.create_trip_help")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="p-6 md:p-8"
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
            <TextField
              label={tr("common.pickup_location")}
              name={"pickup_location"}
              control={form.control}
            />
            <TextField
              label={tr("common.dropoff_location")}
              name={"dropoff_location"}
              control={form.control}
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
  );
}
