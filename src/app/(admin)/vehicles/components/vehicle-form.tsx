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
import { NumberField, TextField } from "@/components/ui/form-fields";
import { useTranslation } from "@/i18n";
import { VehicleCreateSchema } from "@/schemas/vehicle";
import { createVehicle } from "@/server/vehicles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export function VehicleForm() {
  const tr = useTranslation();
  const form = useForm<z.infer<typeof VehicleCreateSchema>>({
    resolver: zodResolver(VehicleCreateSchema),
  });

  async function onSubmit(values: z.infer<typeof VehicleCreateSchema>) {
    const { isSuccess, error } = await createVehicle(values);
    if (isSuccess) {
      toast.success(`${tr("vehicle_created_successfully")}`);
    } else {
      toast.error(error!.message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tr("new_vehicle")}</CardTitle>
        <CardDescription>{tr("create_new_vehicle")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="p-6 md:p-8"
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log(errors);
          })}
        >
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
            <NumberField
              label={tr("engine_type")}
              name={"engine_type"}
              control={form.control}
            />
            <NumberField
              label={tr("gearbox")}
              name={"gearbox"}
              control={form.control}
            />
            <NumberField
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
            <NumberField
              label={tr("common.vehicle_type")}
              name={"vehicle_type_id"}
              control={form.control}
            />
            <NumberField
              label={tr("common.car_model")}
              name={"car_model_id"}
              control={form.control}
            />
            <NumberField
              label={tr("common.drive_train")}
              name={"drive_train_id"}
              control={form.control}
            />
            <NumberField
              label={tr("common.tonnage")}
              name={"tonnage_id"}
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
