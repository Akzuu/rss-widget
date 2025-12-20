"use client";

import { useCallback, useEffect, useState } from "react";
import SunCalc from "suncalc";
import { Cron } from "croner";
import { Sunrise, Sunset } from "lucide-react";
import Image from "next/image";

interface WeatherData {
  sunrise: string;
  sunset: string;
  uvIndex: number | null;
}

// Tampere coordinates
const TAMPERE_LAT = 61.4978;
const TAMPERE_LON = 23.761;

export const WeatherInfo = ({
  side,
  moonEmoji,
  moonPhase,
}: {
  side: "left" | "right";
  moonEmoji?: string;
  moonPhase?: string;
}) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      // Calculate sun and moon data using SunCalc
      const now = new Date();
      const sunTimes = SunCalc.getTimes(now, TAMPERE_LAT, TAMPERE_LON);

      // Format sun times
      const sunrise = sunTimes.sunrise.toLocaleTimeString("fi-FI", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const sunset = sunTimes.sunset.toLocaleTimeString("fi-FI", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Fetch UV index from yr.no
      const uvResponse = await fetch("/api/practical");
      const uvData = await uvResponse.json();

      setData({
        sunrise,
        sunset,
        uvIndex: uvData.uvIndex,
      });
    } catch (error) {
      console.error("Error fetching practical data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch updates every 30 minutes from 06:00 to 23:59
  // and every 2 hours from 00:00 to 05:59
  useEffect(() => {
    fetchData();
    const dayJob = new Cron("*/30 6-23 * * *", fetchData);
    const nightJob = new Cron("0 */2 0-5 * * *", fetchData);
    return () => {
      dayJob.stop();
      nightJob.stop();
    };
  }, [fetchData]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
      </div>
    );
  }

  return (
    <>
      {side === "left" && (
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center">
            <Sunrise className="w-7 h-7 mb-1 text-amber-400" />
            <div className="text-sm font-bold text-white">{data.sunrise}</div>
          </div>
          <div className="flex flex-col items-center">
            <Sunset className="w-7 h-7 mb-1 text-orange-400" />
            <div className="text-sm font-bold text-white">{data.sunset}</div>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/uv-cut-svgrepo-com.svg"
              alt="UV"
              width={28}
              height={28}
              className="mb-1 brightness-0 invert"
            />
            <div className="text-sm font-bold text-white">
              {data.uvIndex !== null ? data.uvIndex : "N/A"}
            </div>
          </div>
        </div>
      )}

      {side === "right" && (
        <div className="flex items-center">
          {moonEmoji && moonPhase && (
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-1">{moonEmoji}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
