"use client";
import { FlagDay } from "@/app/api/flag-day/route";
import { Cron } from "croner";
import { useCallback, useEffect, useState } from "react";

export const FlagDayComponent = () => {
  const [flagDay, setFlagDay] = useState<FlagDay | undefined>();

  const fetchData = useCallback(
    () =>
      fetch("/api/flag-day").then(async (res) => {
        const body = await res.json();
        setFlagDay(body);
      }),
    []
  );

  // Fetch updates every day at 03:30
  useEffect(() => {
    fetchData();
    const job = new Cron("30 3 * * *", fetchData);
    return () => job.stop();
  }, [fetchData]);

  if (!flagDay) return null;
  return (
    <div className="flex justify-center items-center w-screen">
      {flagDay.name}
    </div>
  );
};
