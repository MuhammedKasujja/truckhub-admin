"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCustomersByQuery } from "@/features/customers/service";
import { getServicesByQuery } from "@/features/services/service";
import { useTranslation } from "@/i18n";
import { tr } from "date-fns/locale";
import React from "react";

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

  const [{ data: services }, { data: passengers }] = React.use(promises);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tr("trips.new_trip")}</CardTitle>
        <CardDescription>{tr("trips.create_trip_help")}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
