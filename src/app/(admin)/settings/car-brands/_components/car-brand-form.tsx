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
import { CarBrandCreateSchema } from "@/schemas/car-brand";
import { createCarBrand } from "@/server/car-brands";
import { TextField } from "@/components/ui/form-fields";
import React from "react";

export function CarBrandForm({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const form = useForm<z.infer<typeof CarBrandCreateSchema>>({
    resolver: zodResolver(CarBrandCreateSchema),
  });

  async function onSubmit(values: z.infer<typeof CarBrandCreateSchema>) {
    const { isSuccess, error } = await createCarBrand(values);
    if (isSuccess) {
      toast.success("Car brand added successfully");
      setOpen(false)
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
            Car Brand
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Car Brand</DialogTitle>
            <DialogDescription>Create new car brand</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-4">
              <TextField label="Name" control={form.control} name={"name"} />
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
