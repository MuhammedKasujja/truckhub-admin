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
import { TonnageCreateSchema } from "@/schemas/tonnage";
import { createTonnage } from "@/server/tonnages";
import { NumberField, TextField } from "@/components/ui/form-fields";
import React from "react";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/i18n";

type TonnageFormProps = {
  trigger?: React.ReactNode;
};

export function TonnageForm({ trigger }: TonnageFormProps) {
  const tr = useTranslation();
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof TonnageCreateSchema>>({
    resolver: zodResolver(TonnageCreateSchema),
  });

  async function onSubmit(values: z.infer<typeof TonnageCreateSchema>) {
    const { isSuccess, error } = await createTonnage(values);
    if (isSuccess) {
      toast.success("Tonnage added successfully");
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
            Tonnage
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
              Tonnage
            </DialogTitle>
            <DialogDescription>Create new truck tonnage</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <TextField label="Name" control={form.control} name={"tonnage"} />
            <NumberField
              label={"Minimum Tonnage"}
              control={form.control}
              name={"tonnage_min"}
              placeholder="Min tonnage the truck can carry"
            />
            <NumberField
              label={"Maximum Tonnage"}
              control={form.control}
              name={"tonnage_max"}
              placeholder="Max tonnage the truck can carry"
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
