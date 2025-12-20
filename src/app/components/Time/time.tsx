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
    <div className="text-4xl font-bold text-slate-300 tracking-wider">
      {format(time, "HH:mm")}
    </div>
  );
};
