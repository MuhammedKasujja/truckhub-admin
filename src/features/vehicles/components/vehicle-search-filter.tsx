"use client";

import { AutoComplete } from "@/components/ui/autocomplete";
import { Vehicle } from "@/features/vehicles/types";
import { getVehiclesByQuery } from "@/features/vehicles/service";
import { useState } from "react";

type VehicleSearchFilterProps = {
  onSelected: (vehicleId: string | undefined | null) => void;
};

export function VehicleSearchFilter({ onSelected }: VehicleSearchFilterProps) {
  const [vehicleId, setVehicleId] = useState<string>("");
  return (
    <AutoComplete<Vehicle>
      fetcher={async (search) => {
        if (!search || search.length < 3) return [];
        const { data } = await getVehiclesByQuery({ search });
        return data ?? [];
      }}
      renderOption={(vehicle) => (
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <div className="font-medium">{vehicle.plate_number}</div>
          </div>
        </div>
      )}
      getOptionValue={(vehicle) => vehicle.id.toString()}
      getDisplayValue={(vehicle) => (
        <div className="flex items-center gap-2 text-left">
          <div className="flex flex-col leading-tight">
            <div className="font-medium">{vehicle.plate_number}</div>
          </div>
        </div>
      )}
      notFound={
        <div className="py-6 text-center text-sm">No Vehicles found</div>
      }
      label="Location"
      placeholder="Search vehicles..."
      value={vehicleId}
      onChange={async (vehicleId) => {
        setVehicleId(vehicleId);
        onSelected(vehicleId);
      }}
    />
  );
}
