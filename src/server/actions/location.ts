"use server";

import { ActionResult, Prettify } from "@/types";
import { jsonFormatter, logger } from "@/lib/logger";
import { getGeolocation } from "@/utils/get-geolocation";

export interface PlaceDetails {
  placeId: string;
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

export type LocationDistanceTime = {
  distanceMeters: number;
  duration: string;
  polyline: { encodedPolyline: string };
};

export type Location = {
  lat: number;
  lng: number;
};

export async function getLocationSuggestions({
  query,
  sessionId,
}: {
  query: string;
  sessionId?: string;
}) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY as string;
  if (!apiKey) {
    return { error: "Missing API Key", data: null };
  }
  logger.debug(`Session Suggestion: ${sessionId}`);

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
        sessionToken: sessionId,
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
/**
 *
 * @param placeId the address of the id used to get place details with latitude and longitude
 * @param sessionId must be the same used with `getLocationSuggestions(query,sessionId)` in order to cut on the api billing costs
 * @returns a promise with PlaceDetails
 */

export async function getLocationDetailsByPlaceId({
  placeId,
  sessionId,
}: {
  placeId: string;
  sessionId?: string;
}): Promise<Prettify<ActionResult<PlaceDetails>>> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY as string;

  if (!apiKey) {
    return { error: "Missing API Key", data: null };
  }

  logger.debug(`Session Place details: ${sessionId} --> ${placeId}`);
  let url = `https://places.googleapis.com/v1/places/${placeId}`;

  // Use sessionId only when the place id is coming from the autocomplete api.
  // This make the call to be a single api call and reduces the cost

  if (sessionId) {
    url = `${url}?sessionToken=${sessionId}`;
  }

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
      placeId,
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
      data: formattedData,
      error: null,
    };
  } catch (err) {
    console.error("Error fetching place details:", err);
    return { error: err, data: null };
  }
}

/**
 * Get the distance in meters, time in seconds and the polyline between the origin and destination
 * @param origin
 * @param destination
 * @returns
 */
export async function getLocationDistanceTime({
  origin,
  destination,
}: {
  origin: Prettify<Location>;
  destination: Prettify<Location>;
}): Promise<Prettify<ActionResult<LocationDistanceTime>>> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY as string;

  if (!apiKey) {
    return { error: "Missing API Key", data: null };
  }

  let url = `https://routes.googleapis.com/directions/v2:computeRoutes`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
      },
      body: JSON.stringify({
        origin: {
          location: {
            latLng: {
              latitude: origin.lat,
              longitude: origin.lng,
            },
          },
        },
        destination: {
          location: {
            latLng: {
              latitude: destination.lat,
              longitude: destination.lng,
            },
          },
        },
        travelMode: "DRIVE",
      }),
    });
    const data = await response.json();

    return { data: data?.routes[0], error: null };
  } catch (error) {
    console.error("Error fetching distance:", error);
    return { error: error, data: null };
  }
}
