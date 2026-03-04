"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";
import z from "zod";
import { CarModelCreateSchema } from "@/schemas/car-model";
import { createCarModel } from "@/server/car-models";
import { AutoCompleteField, TextField } from "@/components/ui/form-fields";
import React from "react";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/i18n";
import { VehicleConfigurations } from "@/types/setting";

type CarModelFormProps = {
  vehicleConfigurations: VehicleConfigurations | undefined;
  trigger?: React.ReactNode;
};

export function CarModelForm({
  trigger,
  vehicleConfigurations,
}: CarModelFormProps) {
  const tr = useTranslation();
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof CarModelCreateSchema>>({
    resolver: zodResolver(CarModelCreateSchema),
  });

  async function onSubmit(values: z.infer<typeof CarModelCreateSchema>) {
    const { isSuccess, error } = await createCarModel(values);
    if (isSuccess) {
      toast.success("Car model added successfully");
      setOpen(false);
    } else {
      toast.error(error?.message);
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm" className="font-normal">
            <PlusIcon />
            Car Model
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center">
              <Button variant={"outline"} size={"icon"} type="button">
                <PlusIcon />
              </Button>
              Car Model
            </DialogTitle>
            <DialogDescription>Create new car model</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <TextField label="Name" control={form.control} name={"name"} />
            <AutoCompleteField
              label={tr("common.car_brand")}
              control={form.control}
              name={"car_brand_id"}
              placeholder="Select Car Brand"
              emptyPlaceholder="No Car Brand found"
              options={
                vehicleConfigurations?.car_brands.map((opt) => ({
                  label: opt.name,
                  value: opt.id,
                })) ?? []
              }
            />
            <AutoCompleteField
              label={tr("common.vehicle_type")}
              control={form.control}
              name={"vehicle_type_id"}
              placeholder="Select Vehicle type"
              emptyPlaceholder="No Vehicle type found"
              options={
                vehicleConfigurations?.vehicle_types.map((opt) => ({
                  label: opt.name,
                  value: opt.id,
                })) ?? []
              }
            />
          </FieldGroup>
          <DialogFooter className="sm:justify-end">
            <Button type="submit" variant="secondary">
              {tr("common.form.submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
