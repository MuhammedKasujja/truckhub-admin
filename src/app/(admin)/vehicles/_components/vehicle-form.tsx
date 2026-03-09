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
import { VehicleCreateSchema, VehicleUpdateSchema } from "@/features/vehicles/schemas";
import { getVehicleSettings } from "@/server/settings";
import { createVehicle, updateVehicle } from "@/features/vehicles/service";
import { EngineTypes, Gearboxes } from "@/features/vehicles/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type VehicleFormProps = {
  configPromises: Promise<[Awaited<ReturnType<typeof getVehicleSettings>>]>;
  initialData?: z.infer<typeof VehicleUpdateSchema>;
};

export function VehicleForm({ configPromises, initialData }: VehicleFormProps) {
  const tr = useTranslation();
  const [{ data: vehicleCofig }] = React.use(configPromises);
  const isEdit = !!initialData;

  const formSchema = isEdit ? VehicleUpdateSchema : VehicleCreateSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const promise =
      "id" in values ? updateVehicle(values) : createVehicle(values);

    const { isSuccess, error, message } = await promise;
    if (isSuccess) {
      toast.success(message);
    } else {
      toast.error(error?.message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? tr("edit_vehicle") : tr("new_vehicle")}</CardTitle>
        <CardDescription>{tr("create_new_vehicle")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="p-6 md:p-8"
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log(errors);
          })}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-6">
            <FieldGroup>
              <TextField
                label={tr("plate_number")}
                name={"plate_number"}
                control={form.control}
              />
              <TextField
                label={tr("color")}
                name={"color"}
                control={form.control}
              />
              <TextField
                label={tr("interior_color")}
                name={"interior_color"}
                control={form.control}
                required={false}
              />
              <NumberField
                label={tr("cylinders")}
                name={"cylinders"}
                control={form.control}
              />
              <NumberField
                label={tr("tank_capacity")}
                name={"tank_capacity"}
                control={form.control}
              />
              <AutoCompleteField
                label={tr("engine_type")}
                control={form.control}
                name={"engine_type"}
                placeholder="Select engine type"
                options={EngineTypes.map((opt) => ({
                  label: tr(`common.${opt}`),
                  value: opt,
                }))}
              />
              <AutoCompleteField
                label={tr("gearbox")}
                control={form.control}
                name={"gearbox"}
                placeholder="Select gearbox"
                options={Gearboxes.map((opt) => ({
                  label: tr(`common.${opt}`),
                  value: opt,
                }))}
              />
              <TextField
                label={tr("common.year")}
                name={"year"}
                control={form.control}
              />
              <NumberField
                label={tr("services.seats")}
                name={"seats"}
                control={form.control}
                required={false}
              />
            </FieldGroup>
            <FieldGroup>
              <AutoCompleteField
                label={tr("common.vehicle_type")}
                control={form.control}
                name={"vehicle_type_id"}
                placeholder="Select Vehicle"
                emptyPlaceholder="No vehicles found"
                options={
                  vehicleCofig?.vehicle_types.map((opt) => ({
                    label: opt.name,
                    value: opt.id,
                  })) ?? []
                }
              />
              <AutoCompleteField
                label={tr("common.car_brand")}
                control={form.control}
                name={"car_brand_id"}
                placeholder="Select Car Brand"
                emptyPlaceholder="No Car Brand found"
                options={
                  vehicleCofig?.car_brands.map((opt) => ({
                    label: opt.name,
                    value: opt.id,
                  })) ?? []
                }
              />
              <AutoCompleteField
                label={tr("common.car_model")}
                control={form.control}
                name={"car_model_id"}
                placeholder="Select Car Mode"
                emptyPlaceholder="No Car Model found"
                options={
                  vehicleCofig?.car_models.map((opt) => ({
                    label: opt.name,
                    value: opt.id,
                  })) ?? []
                }
              />
              <AutoCompleteField
                label={tr("common.drive_train")}
                control={form.control}
                name={"drive_train_id"}
                placeholder="Select Car Drive Train"
                emptyPlaceholder="No Car Drive Train found"
                options={
                  vehicleCofig?.drive_trains.map((opt) => ({
                    label: opt.name,
                    value: opt.id,
                  })) ?? []
                }
              />
              <AutoCompleteField
                label={tr("common.tonnage")}
                control={form.control}
                name={"tonnage_id"}
                placeholder="Select Truck tonnage"
                emptyPlaceholder="No Truck tonnage found"
                options={
                  vehicleCofig?.truck_tonnages.map((opt) => ({
                    label: `${opt.tonnage_min} - ${opt.tonnage_max}`,
                    value: opt.id,
                  })) ?? []
                }
              />
            </FieldGroup>
          </div>
          <CardFooter>
            <Button type="submit">{tr("common.form.submit")}</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
