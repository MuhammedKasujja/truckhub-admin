import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DriverSearchFilter } from "@/features/drivers/components/driver-search-filter";
import { getVehicleDetailsById } from "@/features/vehicles/service";
import { useFetchEror } from "@/hooks/use-fetch-error";
import React from "react";

type VehicleDetailsProps = {
  promises: Promise<[Awaited<ReturnType<typeof getVehicleDetailsById>>]>;
};

export function VehicleDetails({ promises }: VehicleDetailsProps) {
  const [{ data: vehicle, error }] = React.use(promises);

  useFetchEror(error);

  return (
    <div className="grid grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>{vehicle?.plate_number}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Assign Driver</CardTitle>
          <CardDescription>Attach new driver to the vehicle</CardDescription>
        </CardHeader>
        <CardContent>
            <DriverSearchFilter onSelected={(driverid)=>{
                
            }}/>
        </CardContent>
      </Card>
    </div>
  );
}
