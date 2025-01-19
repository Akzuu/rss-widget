"use client";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

export const Time: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex justify-center items-center w-screen text-4xl">
      {format(time, "HH:mm")}
    </div>
  );
};
