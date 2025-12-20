import { NextResponse } from "next/server";

// Tampere coordinates (using 4 decimals max as per Yr.no requirements)
const TAMPERE_LAT = 61.4978;
const TAMPERE_LON = 23.761;

const USER_AGENT = "rss-widget/1.0 github.com/Akzuu/rss-widget";

export async function GET() {
  try {
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${TAMPERE_LAT}&lon=${TAMPERE_LON}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Yr.no API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract UV index from the forecast
    // UV is available in next_1_hours, next_6_hours, or next_12_hours periods
    // We look for the max UV index in the available time periods
    const timeseries = data.properties?.timeseries || [];
    let maxUvIndex = null;

    // Check first few hours for UV index
    for (const forecast of timeseries.slice(0, 12)) {
      const next1h =
        forecast.data?.next_1_hours?.details?.ultraviolet_index_clear_sky_max;
      const next6h =
        forecast.data?.next_6_hours?.details?.ultraviolet_index_clear_sky_max;
      const next12h =
        forecast.data?.next_12_hours?.details?.ultraviolet_index_clear_sky_max;

      const uvValue = next1h ?? next6h ?? next12h;
      if (uvValue !== null && uvValue !== undefined) {
        maxUvIndex = Math.max(maxUvIndex ?? 0, uvValue);
      }
    }

    return NextResponse.json({
      uvIndex: maxUvIndex,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching data from Yr.no:", error);
    return NextResponse.json(
      { error: "Failed to fetch practical data", uvIndex: null },
      { status: 500 }
    );
  }
}
