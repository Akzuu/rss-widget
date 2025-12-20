"use client";

import { useCallback, useEffect, useState } from "react";
import SunCalc from "suncalc";
import { Cron } from "croner";

interface PracticalData {
  sunrise: string;
  sunset: string;
  moonPhase: string;
  moonIllumination: number;
  uvIndex: number | null;
}

// Tampere coordinates
const TAMPERE_LAT = 61.4978;
const TAMPERE_LON = 23.761;

export const Practical = () => {
  const [data, setData] = useState<PracticalData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      // Calculate sun and moon data using SunCalc
      const now = new Date();
      const sunTimes = SunCalc.getTimes(now, TAMPERE_LAT, TAMPERE_LON);
      const moonIllumination = SunCalc.getMoonIllumination(now);

      // Format sun times
      const sunrise = sunTimes.sunrise.toLocaleTimeString("fi-FI", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const sunset = sunTimes.sunset.toLocaleTimeString("fi-FI", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Calculate moon phase name
      const phase = moonIllumination.phase;
      const moonPhase = getMoonPhaseName(phase);

      // Fetch UV index from yr.no
      const uvResponse = await fetch("/api/practical");
      const uvData = await uvResponse.json();

      setData({
        sunrise,
        sunset,
        moonPhase,
        moonIllumination: Math.round(moonIllumination.fraction * 100),
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
    return <div className="text-gray-400">Ladataan...</div>;
  }

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        {/* Sunrise */}
        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <div className="text-4xl mb-2">🌅</div>
          <div className="text-sm text-gray-400">Aurinko nousee</div>
          <div className="text-xl font-bold text-white">{data.sunrise}</div>
        </div>

        {/* Sunset */}
        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <div className="text-4xl mb-2">🌇</div>
          <div className="text-sm text-gray-400">Aurinko laskee</div>
          <div className="text-xl font-bold text-white">{data.sunset}</div>
        </div>

        {/* Moon Phase */}
        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <div className="text-4xl mb-2">{getMoonEmoji(data.moonPhase)}</div>
          <div className="text-sm text-gray-400">Kuu</div>
          <div className="text-lg font-bold text-white">{data.moonPhase}</div>
          <div className="text-xs text-gray-500">{data.moonIllumination}%</div>
        </div>

        {/* UV Index */}
        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <div className="text-4xl mb-2">☀️</div>
          <div className="text-sm text-gray-400">UV-indeksi</div>
          <div className="text-xl font-bold text-white">
            {data.uvIndex !== null ? data.uvIndex : "Ei saatavilla"}
          </div>
          {data.uvIndex !== null && (
            <div className="text-xs text-gray-500">
              {getUVLevel(data.uvIndex)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getMoonPhaseName = (phase: number): string => {
  if (phase < 0.03) return "Uusikuu";
  if (phase < 0.22) return "Kasvava sirppi";
  if (phase < 0.28) return "Ensimmäinen neljännes";
  if (phase < 0.47) return "Kasvava kuu";
  if (phase < 0.53) return "Täysikuu";
  if (phase < 0.72) return "Vähenevä kuu";
  if (phase < 0.78) return "Viimeinen neljännes";
  if (phase < 0.97) return "Vähenevä sirppi";
  return "Uusikuu";
};

const getMoonEmoji = (phase: string): string => {
  const emojiMap: { [key: string]: string } = {
    Uusikuu: "🌑",
    "Kasvava sirppi": "🌒",
    "Ensimmäinen neljännes": "🌓",
    "Kasvava kuu": "🌔",
    Täysikuu: "🌕",
    "Vähenevä kuu": "🌖",
    "Viimeinen neljännes": "🌗",
    "Vähenevä sirppi": "🌘",
  };
  return emojiMap[phase] || "🌑";
};

const getUVLevel = (uvIndex: number): string => {
  if (uvIndex < 3) return "Matala";
  if (uvIndex < 6) return "Kohtalainen";
  if (uvIndex < 8) return "Korkea";
  if (uvIndex < 11) return "Erittäin korkea";
  return "Äärimmäinen";
};
