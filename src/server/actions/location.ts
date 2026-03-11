"use server";

import { jsonFormatter, logger } from "@/lib/logger";
import { getGeolocation } from "@/utils/get-geolocation";

export interface PlaceDetails {
  address1: string;
  address2: string;
  formattedAddress: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  lat: number;
  lng: number;
}

export type LocationSuggestion = {
  placeId: string;
  name: string;
};

export async function getLocationSuggestions(query: string) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY as string;
  if (!apiKey) {
    return { error: "Missing API Key", data: null };
  }

  // Check if the hosting provider gives you the country code
  const country = await getGeolocation();
  const url = "https://places.googleapis.com/v1/places:autocomplete";

  const primaryTypes = [
    "street_address",
    "subpremise",
    "route",
    "street_number",
    "landmark",
  ];

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        // Return only required fields to reduce API billing
        "X-Goog-FieldMask":
          "suggestions.placePrediction.placeId,suggestions.placePrediction.text",
      },
      body: JSON.stringify({
        input: query,
        includedPrimaryTypes: primaryTypes,
        // Location biased towards the user's country
        includedRegionCodes: [country],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // logger.info(data);

    const suggestions: LocationSuggestion[] = data.suggestions
      ? data.suggestions.map(
          (suggestion: {
            placePrediction: { placeId: string; text: { text: string } };
          }) => ({
            placeId: suggestion.placePrediction.placeId,
            name: suggestion.placePrediction.text.text,
          }),
        )
      : [];

    return { data: suggestions, error: null };
  } catch (error) {
    logger.info("Error fetching autocomplete suggestions:");
    logger.error(error);
    return { error: error, data: null };
  }
}

export async function getLocationDetailsByPlaceId(placeId: string) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY as string;

  if (!apiKey) {
    return { error: "Missing API Key", data: null };
  }

  const url = `https://places.googleapis.com/v1/places/${placeId}`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          // Include expected fields in the response
          "adrFormatAddress,shortFormattedAddress,formattedAddress,location,addressComponents",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // logger.debug(jsonFormatter(data));

    const dataFinderRegx = (c: string) => {
      const regx = new RegExp(`<span class="${c}">([^<]+)<\/span>`);
      const match = data.adrFormatAddress.match(regx);
      return match ? match[1] : "";
    };

    const address1 = dataFinderRegx("street-address");
    const address2 = "";
    const city = dataFinderRegx("locality");
    const region = dataFinderRegx("region");
    const postalCode = dataFinderRegx("postal-code");
    const country = dataFinderRegx("country-name");
    const lat = data.location.latitude;
    const lng = data.location.longitude;

    const formattedAddress = data.formattedAddress;

    const formattedData: PlaceDetails = {
      address1,
      address2,
      formattedAddress,
      city,
      region,
      postalCode,
      country,
      lat,
      lng,
    };
    logger.debug(jsonFormatter(formattedData));
    return {
      data: {
        ...formattedData,
        // address: formattedData,
        // adrAddress: data.adrFormatAddress,
      },
      error: null,
    };
  } catch (err) {
    console.error("Error fetching place details:", err);
    return { error: err, data: null };
  }
}
