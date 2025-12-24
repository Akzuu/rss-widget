"use client";
import { FlagDay } from "@/app/api/flag-day/route";
import { Cron } from "croner";
import { useCallback, useEffect, useState } from "react";

export const FlagDayComponent = ({ disabled }: { disabled?: boolean }) => {
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
    if (disabled) return;
    fetchData();
    const job = new Cron("30 3 * * *", fetchData);
    return () => job.stop();
  }, [fetchData, disabled]);

  if (!flagDay) return null;
  return (
    <div className="flex justify-center items-center text-center max-w-md text-sm truncate">
      {flagDay.name}
    </div>
  );
};
