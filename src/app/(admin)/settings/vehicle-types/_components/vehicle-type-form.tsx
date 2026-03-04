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
import { VehicleTypeCreateSchema } from "@/schemas/vehicle-type";
import { createVehicleType } from "@/server/vehicle-types";
import { SwitchField, TextField } from "@/components/ui/form-fields";
import React from "react";

export function VehicleTypeForm({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof VehicleTypeCreateSchema>>({
    resolver: zodResolver(VehicleTypeCreateSchema),
  });

  async function onSubmit(values: z.infer<typeof VehicleTypeCreateSchema>) {
    const { isSuccess, error } = await createVehicleType(values);
    if (isSuccess) {
      toast.success("Vehicle type added successfully");
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
            Vehicle Type
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Vehicle Type</DialogTitle>
            <DialogDescription>Create new vehicle type</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-4">
              <TextField label="Name" control={form.control} name={"name"} />
              <SwitchField
                label="Truck"
                control={form.control}
                name={"is_truck"}
                description="When checked indicates this is a truck vehicle"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button type="submit" variant="secondary">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
