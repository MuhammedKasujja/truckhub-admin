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
  NumberField,
  TextField,
} from "@/components/ui/form-fields";
import { useTranslation } from "@/i18n";
import { ServiceCreateSchema } from "@/schemas/service";
import { createService } from "@/server/services";
import { getVehicleSettings } from "@/server/settings";
import { DistanceUnitList } from "@/types/service";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type ServiceFormProps = {
  serviceId?: number;
  vehicleConfigPromise: Promise<Awaited<ReturnType<typeof getVehicleSettings>>>;
};

export function ServiceForm({ vehicleConfigPromise }: ServiceFormProps) {
  const tr = useTranslation();
  const { data } = React.use(vehicleConfigPromise);

  const form = useForm<z.infer<typeof ServiceCreateSchema>>({
    resolver: zodResolver(ServiceCreateSchema),
  });

  async function onSubmit(values: z.infer<typeof ServiceCreateSchema>) {
    const { isSuccess, error } = await createService(values);
    if (isSuccess) {
      toast.success(`${tr("services.service_created_successfully")}`);
    } else {
      toast.error(error!.message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tr("services.new_service")}</CardTitle>
        <CardDescription>{tr("services.create_new_service")}</CardDescription>
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
              label={tr("common.vehicle_type")}
              control={form.control}
              name={"vehicle_type_id"}
              placeholder="Select Vehicle"
              emptyPlaceholder="No vehicles found"
              options={
                data?.vehicle_types.map((opt) => ({
                  label: opt.name,
                  value: opt.id,
                })) ?? []
              }
            />
            <TextField
              label={tr("common.form.name")}
              name={"name"}
              control={form.control}
            />
            <TextField
              label={tr("common.display_name")}
              name={"display_name"}
              control={form.control}
            />
            <NumberField
              label={tr("services.seats")}
              name={"seats"}
              control={form.control}
              required={false}
            />
            <NumberField
              label={tr("services.base_fare")}
              name={"base_fare"}
              control={form.control}
              required={false}
            />
            <NumberField
              label={tr("services.min_fare")}
              name={"min_fare"}
              control={form.control}
              required={false}
            />
            <NumberField
              label={tr("services.price_per_min")}
              name={"price_per_min"}
              control={form.control}
            />
            <NumberField
              label={tr("services.price_per_unit_distance")}
              name={"price_per_unit_distance"}
              control={form.control}
            />
            <NumberField
              label={tr("services.booking_fee")}
              name={"booking_fee"}
              control={form.control}
              required={false}
            />
            <NumberField
              label={tr("services.tax_fee")}
              name={"tax_fee"}
              control={form.control}
              required={false}
            />
            <AutoCompleteField
              label={tr("services.distance_unit")}
              control={form.control}
              name={"distance_unit"}
              placeholder="Select distance unit"
              options={DistanceUnitList.map((opt) => ({
                label: tr(`common.${opt}`),
                value: opt,
              }))}
            />
            <TextField
              label={tr("common.form.description")}
              name={"description"}
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
