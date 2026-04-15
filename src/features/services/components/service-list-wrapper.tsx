"use client";

import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceGroup } from "@/features/services/types";
import { ListIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceTable } from "./service-table";
import { ServiceList } from "./service-list";
import React, { Activity } from "react";
import { HasPermission } from "@/components/has-permission";
import Link from "next/link";

type ServiceListWrapperProps = {
  services: ServiceGroup[];
};

export function ServiceListWrapper({ services }: ServiceListWrapperProps) {
  const [view, setView] = React.useState<"table" | "list">('list');
  return (
    <div className="space-y-4">
      <Card className="py-2">
        <CardHeader>
          <CardTitle>Services</CardTitle>
          <CardAction className="space-x-2">
            <HasPermission permission={"services:create"}>
              <Button asChild>
                <Link href={"/services/new"}>
                  <PlusIcon />
                </Link>
              </Button>
            </HasPermission>
            <Button
              type="button"
              size={"icon"}
              onClick={() =>
                setView((prev) => (prev === "list" ? "table" : "list"))
              }
            >
              <ListIcon />
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
      <Activity mode={view === "table" ? "visible" : "hidden"}>
        <ServiceTable services={services} />
      </Activity>
      <Activity mode={view === "list" ? "visible" : "hidden"}>
        <ServiceList services={services} />
      </Activity>
    </div>
  );
}
