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
  SelectField,
  TextField,
} from "@/components/ui/form-fields";
import { useTranslation } from "@/i18n";
import {
  VehicleCreateSchema,
  VehicleUpdateSchema,
} from "@/features/vehicles/schemas";
import { getVehicleSettings } from "@/server/settings";
import { createVehicle, updateVehicle } from "@/features/vehicles/service";
import { EngineTypes, Gearboxes } from "@/features/vehicles/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { EntityId } from "@/types";
import { VehicleCylinderList } from "@/config/constants";
import { SubmitButton } from "@/components/ui/submit-button";

type VehicleFormProps = {
  configPromises: Promise<[Awaited<ReturnType<typeof getVehicleSettings>>]>;
  initialData?: z.infer<typeof VehicleUpdateSchema>;
};

export function VehicleForm({ configPromises, initialData }: VehicleFormProps) {
  const tr = useTranslation();
  const [{ data: vehicleCofig }] = React.use(configPromises);
  const [vehicleType, setVehicleType] = React.useState<
    | {
        name: string;
        is_truck: boolean;
        id: EntityId;
      }
    | undefined
  >();

  const [driveTrains, setDriveTrains] = React.useState<
    {
      name: string;
      is_truck: boolean;
      id: EntityId;
    }[]
  >(vehicleCofig?.drive_trains ?? []);

  const [carModels, setCarModels] = React.useState<
    {
      name: string;
      id: EntityId;
    }[]
  >(vehicleCofig?.car_models ?? []);

  const isEdit = !!initialData;

  const formSchema = isEdit ? VehicleUpdateSchema : VehicleCreateSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const selectedVehicleId = form.watch("vehicle_type_id");
  const selectedCarBrandId = form.watch("car_brand_id");

  //  Track vehicle type select to populate drive trains for small cars and trucks
  React.useEffect(() => {
    const vehicleType = vehicleCofig?.vehicle_types.find(
      (ele) => ele.id === selectedVehicleId,
    );
    setVehicleType(vehicleType);
    setDriveTrains(
      vehicleCofig?.drive_trains.filter(
        (ele) => ele.is_truck === vehicleType?.is_truck,
      ) ?? [],
    );
    // form.reset({ drive_train_id: undefined, tonnage_id: undefined });
  }, [selectedVehicleId, vehicleCofig]);

  //  Populate car models basing on car selected car make
  React.useEffect(() => {
    const carBrand = vehicleCofig?.car_brands.find(
      (ele) => ele.id === selectedCarBrandId,
    );
    setCarModels(
      vehicleCofig?.car_models.filter(
        (ele) => ele.car_brand_id === carBrand?.id,
      ) ?? [],
    );
  }, [selectedCarBrandId, vehicleCofig]);

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
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log(errors);
        })}
      >
        <CardContent className="pb-6">
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
              <SelectField
                label={tr("cylinders")}
                control={form.control}
                name={"cylinders"}
                placeholder="Select cylinder"
                options={VehicleCylinderList.map((opt) => ({
                  label: `${opt}`,
                  value: `${opt}`,
                }))}
              />
              <NumberField
                label={tr("tank_capacity")}
                name={"tank_capacity"}
                control={form.control}
              />
              <SelectField
                label={tr("fuel_type")}
                control={form.control}
                name={"engine_type"}
                placeholder="Select fuel type"
                options={EngineTypes.map((opt) => ({
                  label: tr(`common.${opt}`),
                  value: opt,
                }))}
              />
              <SelectField
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
                disabled={!form.watch("car_brand_id")}
                label={tr("common.car_model")}
                control={form.control}
                name={"car_model_id"}
                placeholder="Select Car Mode"
                emptyPlaceholder="No Car Model found"
                options={
                  carModels.map((opt) => ({
                    label: opt.name,
                    value: opt.id,
                  })) ?? []
                }
              />
              <AutoCompleteField
                disabled={!vehicleType}
                label={tr("common.drive_train")}
                control={form.control}
                name={"drive_train_id"}
                placeholder="Select Car Drive Train"
                emptyPlaceholder="No Car Drive Train found"
                options={
                  driveTrains.map((opt) => ({
                    label: opt.name,
                    value: opt.id,
                  })) ?? []
                }
              />
              {vehicleType?.is_truck && (
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
              )}
            </FieldGroup>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton
            text={tr("common.form.submit")}
            isSubmitting={form.formState.isSubmitting}
          />
        </CardFooter>
      </form>
    </Card>
  );
}
