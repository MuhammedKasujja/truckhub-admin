import { HasPermission } from "@/components/has-permission";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { ServiceGroup } from "@/features/services/types";
import { formatPrice } from "@/lib/format";
import Link from "next/link";
import React from "react";

type ServiceListProps = {
  services: ServiceGroup[];
};

export function ServiceList({ services }: ServiceListProps) {
  const serviceList = React.useMemo(() => {
    return services.flatMap((ele) => ele.services);
  }, [services]);

  return (
    <div>
      <ItemGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {serviceList.map((service) => (
          <Item key={service.name} variant="outline">
            <ItemHeader>
              <div className="aspect-square rounded-sm object-cover w-32 h-32">
                {service.category} - {service.name}
              </div>
            </ItemHeader>
            <ItemContent>
              <ItemTitle>{formatPrice(service.booking_fee)}</ItemTitle>
              <ItemDescription>{service.is_truck}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <HasPermission permission={"services:edit"}>
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/services/${service.id}/edit`}>Edit</Link>
                </Button>
              </HasPermission>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
