"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import {
  AutoCompleteField,
  DatePickerField,
  HiddenField,
  NumberField,
  TextField,
  MoneyField,
} from "@/components/ui/form-fields";
import { getCustomersByQuery } from "@/features/customers/service";
import { getServicesByQuery } from "@/features/services/service";
import { useTranslation } from "@/i18n";
import React, { useMemo } from "react";
import z from "zod";
import { BookingCreateSchema } from "@/features/bookings/schemas";
import { toast } from "sonner";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { createBooking } from "@/features/bookings/services";
import { AutoComplete } from "@/components/ui/autocomplete";
import { Service } from "@/features/services/types";
import { formatPrice } from "@/lib/format";

type BookingRequestFormProps = {
  promises: Promise<
    [
      Awaited<ReturnType<typeof getServicesByQuery>>,
      Awaited<ReturnType<typeof getCustomersByQuery>>,
    ]
  >;
};

export function BookingRequestForm({ promises }: BookingRequestFormProps) {
  const tr = useTranslation();

  const { control, handleSubmit, formState, watch } = useForm<
    z.infer<typeof BookingCreateSchema>
  >({
    resolver: zodResolver(BookingCreateSchema),
    defaultValues: {
      services: [],
    },
  });

  const { fields, remove, prepend } = useFieldArray({
    control,
    name: "services",
  });

  const [{ data: services }, { data: passengers }] = React.use(promises);

  async function onSubmit(values: z.infer<typeof BookingCreateSchema>) {
    const { isSuccess, error } = await createBooking(values);
    if (isSuccess) {
      toast.success(`${tr("trips.trip_created_successfully")}`);
    } else {
      toast.error(error!.message);
    }
  }

  const bookingItems = watch("services");
  const partialAmount = watch("partial");
  const discount = watch("discount");

  const itemsTotal = useMemo(() => {
    const updatedAmount = bookingItems.reduce(
      (prev, item) => prev + Number(item.cost_per_item) * item.total_items,
      0.0,
    );
    return updatedAmount;
  }, [bookingItems]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Hire Booking</CardTitle>
        <CardDescription>{tr("trips.create_trip_help")}</CardDescription>
        <CardAction>
          {formatPrice(itemsTotal, { showZeroAsNumber: true })}
        </CardAction>
      </CardHeader>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log(errors);
        })}
      >
        <CardContent>
          <FieldGroup className="pb-5">
            <AutoCompleteField
              label={tr("common.passenger")}
              name={"customer_id"}
              control={control}
              options={passengers.map((ele) => ({
                label: ele.fullname,
                value: ele.id,
              }))}
            />
            <DatePickerField
              label={"Pickup Date"}
              name={"pickup_time"}
              control={control}
            />
            <DatePickerField
              label={"Return Date"}
              name={"return_time"}
              control={control}
            />
            <MoneyField
              label={"Partial"}
              name={"partial"}
              control={control}
              required={false}
            />
            <NumberField
              label={"Discount"}
              name={"discount"}
              control={control}
              required={false}
            />
            <div>
              <Button type="button" onClick={() => remove(fields.length - 1)}>
                Delete
              </Button>
            </div>
            <AutoComplete<Service>
              fetcher={async (_) => {
                return services;
              }}
              renderOption={(service) => (
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <div className="font-medium">{service.name}</div>
                  </div>
                </div>
              )}
              getOptionValue={(service) => service.id.toString()}
              getDisplayValue={(service) => (
                <div className="flex items-center gap-2 text-left">
                  <div className="flex flex-col leading-tight">
                    <div className="font-medium">{service.name}</div>
                  </div>
                </div>
              )}
              notFound={
                <div className="py-6 text-center text-sm">
                  No Services found
                </div>
              }
              label="Service"
              placeholder="Search service..."
              value={undefined}
              onChange={async (service) => {
                if (service)
                  prepend({
                    service_id: service.id,
                    service_name: service.name,
                    cost_per_item: service.booking_fee.toString(),
                    total_items: 1,
                    discount: 0,
                  });
              }}
            />
            {fields.map((service, index) => (
              <div key={service.id} className="grid grid-cols-4 gap-2">
                <HiddenField
                  name={`services.${index}.service_id`}
                  control={control}
                />
                <TextField
                  label={"Service"}
                  name={`services.${index}.service_name`}
                  control={control}
                />
                <TextField
                  label={"Cost"}
                  name={`services.${index}.cost_per_item`}
                  control={control}
                />
                <NumberField
                  label={"Total"}
                  name={`services.${index}.total_items`}
                  control={control}
                />
                <NumberField
                  required={false}
                  label={"Discount"}
                  name={`services.${index}.discount`}
                  control={control}
                />
              </div>
            ))}
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={formState.isSubmitting || fields.length === 0}
          >
            {formState.isSubmitting && (
              <Loader2 className="size-4 animate-spin" />
            )}
            {formState.isSubmitting
              ? "Submitting..."
              : `${tr("common.form.submit")}`}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
