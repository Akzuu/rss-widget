"use client";
import { format } from "date-fns";
import React, { useState } from "react";

export const Time: React.FC = () => {
  const [time, setTime] = useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex justify-center items-center w-screen text-4xl">
      {format(time, "HH:mm:ss")}
    </div>
  );
};
