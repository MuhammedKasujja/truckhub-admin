"use client";

import { AutoComplete } from "@/components/ui/autocomplete";
import { Driver } from "../types";
import { getDriversByQuery } from "../service";
import { useState } from "react";

type DriverSearchFilterProps = {
  onSelected: (driverId: string | undefined | null) => void;
};

export function DriverSearchFilter({ onSelected }: DriverSearchFilterProps) {
  const [driverId, setDriverId] = useState<string>("");
  return (
    <AutoComplete<Driver>
      fetcher={async (search) => {
        if (!search || search.length < 3) return [];
        const { data } = await getDriversByQuery({ search });
        return data ?? [];
      }}
      renderOption={(driver) => (
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <div className="font-medium">{driver.fullname}</div>
          </div>
        </div>
      )}
      getOptionValue={(location) => location.id.toString()}
      getDisplayValue={(location) => (
        <div className="flex items-center gap-2 text-left">
          <div className="flex flex-col leading-tight">
            <div className="font-medium">{location.fullname}</div>
          </div>
        </div>
      )}
      notFound={
        <div className="py-6 text-center text-sm">No Drivers found</div>
      }
      label="Location"
      placeholder="Search location..."
      value={driverId}
      onChange={async (driverId) => {
        setDriverId(driverId);
        onSelected(driverId);
      }}
    />
  );
}
