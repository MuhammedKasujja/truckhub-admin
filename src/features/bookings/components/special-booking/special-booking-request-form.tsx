"use client";

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
  DatePickerField,
  HiddenField,
  NumberField,
  TextField,
} from "@/components/ui/form-fields";
import { getCustomersByQuery } from "@/features/customers/service";
import { getServicesByQuery } from "@/features/services/service";
import { useTranslation } from "@/i18n";
import React from "react";
import z from "zod";
import { SpecialBookingCreateSchema } from "../../schemas";
import { toast } from "sonner";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { createSpecialBooking } from "@/features/bookings/services/special-hire-service";
import { AutoComplete } from "@/components/ui/autocomplete";
import { Service } from "@/features/services/types";

type BookingRequestFormProps = {
  promises: Promise<
    [
      Awaited<ReturnType<typeof getServicesByQuery>>,
      Awaited<ReturnType<typeof getCustomersByQuery>>,
    ]
  >;
};

export function SpecialBookingRequestForm({
  promises,
}: BookingRequestFormProps) {
  const tr = useTranslation();

  const { control, handleSubmit, formState } = useForm<
    z.infer<typeof SpecialBookingCreateSchema>
  >({
    resolver: zodResolver(SpecialBookingCreateSchema),
    defaultValues: {
      services: [],
    },
  });

  const { fields, remove, prepend } = useFieldArray({
    control,
    name: "services",
  });

  const [{ data: services }, { data: passengers }] = React.use(promises);

  async function onSubmit(values: z.infer<typeof SpecialBookingCreateSchema>) {
    const { isSuccess, error } = await createSpecialBooking(values);
    if (isSuccess) {
      toast.success(`${tr("trips.trip_created_successfully")}`);
    } else {
      toast.error(error!.message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Hire Booking</CardTitle>
        <CardDescription>{tr("trips.create_trip_help")}</CardDescription>
      </CardHeader>
      <form
        // className="p-6 md:p-8"
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log(errors);
        })}
      >
        <CardContent>
          <FieldGroup className="pb-5">
            <AutoCompleteField
              label={tr("common.passenger")}
              name={"passenger_id"}
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
