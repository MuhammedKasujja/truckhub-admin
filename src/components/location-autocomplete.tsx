"use client";

import { AutoComplete } from "@/components/ui/autocomplete";
import { logger } from "@/lib/logger";
import React from "react";

type LocationData = {
  placeId: string;
  name: string;
};

export function LocationAutoComplete() {
  const [selectedPlaceId, setSelectedPlaceId] = React.useState<string>("");

  return (
    <AutoComplete<LocationData>
      fetcher={async (query) => {
        if (!query) return [];

        const response = await fetch(
          `/api/address/autocomplete?query=${query}`,
        );
        const { data } = await response.json();
        return data ?? [];
      }}
      renderOption={(location) => (
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <div className="font-medium">{location.name}</div>
          </div>
        </div>
      )}
      getOptionValue={(location) => location.placeId}
      getDisplayValue={(location) => (
        <div className="flex items-center gap-2 text-left">
          <div className="flex flex-col leading-tight">
            <div className="font-medium">{location.name}</div>
          </div>
        </div>
      )}
      notFound={
        <div className="py-6 text-center text-sm">No Locations found</div>
      }
      label="Location"
      placeholder="Search location..."
      value={selectedPlaceId}
      onChange={async (placeId) => {
        setSelectedPlaceId(placeId);
        const response = await fetch(`/api/address/place?placeId=${placeId}`);
        const { data, error } = await response.json();
        logger.debug(data);
        logger.error(error);
      }}
      width="375px"
    />
  );
}
