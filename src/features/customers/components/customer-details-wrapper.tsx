"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchEror } from "@/hooks/use-fetch-error";
import { Edit2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getCustomerDetailsById } from "@/features/customers/service";

type CustomerDetailsWrapperProps = {
  promises: Promise<[Awaited<ReturnType<typeof getCustomerDetailsById>>]>;
};

export function CustomerDetailsWrapper({
  promises,
}: CustomerDetailsWrapperProps) {
  const [{ data: customer, error }] = React.use(promises);

  useFetchEror(error);

  return (
    <div className="grid gap-5">
      <Card>
        <CardHeader>
          <CardTitle>{customer?.fullname}</CardTitle>
          <CardAction>
            <Button asChild size={"icon"}>
              <Link href={`/customers/${customer?.id}/edit`}>
                <Edit2Icon />
              </Link>
            </Button>
          </CardAction>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div>{customer?.email}</div>
          <div>{customer?.phone}</div>
        </CardContent>
      </Card>
    </div>
  );
}
