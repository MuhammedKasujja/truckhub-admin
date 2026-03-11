"use client";

import { AutoComplete } from "@/components/ui/autocomplete";
import {
  getLocationSuggestions,
  LocationSuggestion,
  getLocationDetailsByPlaceId,
  PlaceDetails,
} from "@/server/actions/location";
import { Prettify } from "@/types";
import React from "react";

type LocationAutoCompleteProps = {
  onPlaceLoaded: (place?: Prettify<PlaceDetails> | null) => void;
};

export function LocationAutoComplete({
  onPlaceLoaded,
}: LocationAutoCompleteProps) {
  const [selectedPlaceId, setSelectedPlaceId] = React.useState<string>("");

  return (
    <AutoComplete<LocationSuggestion>
      fetcher={async (query) => {
        if (!query) return [];

        const { data } = await getLocationSuggestions(query);
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
        const { data: placeDetails } =
          await getLocationDetailsByPlaceId(placeId);
        onPlaceLoaded(placeDetails);
      }}
      width="375px"
    />
  );
}
