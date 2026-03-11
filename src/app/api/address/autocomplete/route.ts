import { logger } from "@/lib/logger";
import { getGeolocation } from "@/utils/get-geolocation";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY as string;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API Key", data: null });
  }

  const searchParams = req.nextUrl.searchParams;

  // Check if the hosting provider gives you the country code
  const country = await getGeolocation();
  const query = searchParams.get("query");
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

    return NextResponse.json({ data: data.suggestions, error: null });
  } catch (error) {
    logger.info("Error fetching autocomplete suggestions:");
    logger.error(error);
    return NextResponse.json({ error: error, data: null });
  }
}
