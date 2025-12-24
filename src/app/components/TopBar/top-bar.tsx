"use client";

import { useCallback, useEffect, useState } from "react";
import SunCalc from "suncalc";
import { Cron } from "croner";
import { Time } from "../Time/time";
import { WeatherInfo } from "../WeatherInfo/weather-info";
import { FlagDayComponent } from "../FlagDay/flag-day";

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

export const TopBar = () => {
  const [moonData, setMoonData] = useState<{
    phase: string;
    emoji: string;
    illumination: number;
  }>({
    phase: "Uusikuu",
    emoji: "🌑",
    illumination: 0,
  });

  const fetchMoonData = useCallback(() => {
    const now = new Date();
    const moonIllumination = SunCalc.getMoonIllumination(now);
    const phase = getMoonPhaseName(moonIllumination.phase);
    setMoonData({
      phase,
      emoji: getMoonEmoji(phase),
      illumination: Math.round(moonIllumination.fraction * 100),
    });
  }, []);

  useEffect(() => {
    fetchMoonData();
    const job = new Cron("0 */2 * * *", fetchMoonData);
    return () => job.stop();
  }, [fetchMoonData]);

  return (
    <div className="flex items-center w-full px-4">
      <div className="flex justify-start flex-1">
        <WeatherInfo side="left" />
      </div>
      <div className="flex justify-center flex-shrink-0">
        <div className="flex flex-col justify-center items-center">
          <Time />
          <FlagDayComponent />
        </div>
      </div>
      <div className="flex justify-end flex-1">
        <WeatherInfo
          side="right"
          moonEmoji={moonData.emoji}
          moonPhase={`${moonData.phase} (${moonData.illumination}%)`}
        />
      </div>
    </div>
  );
};
