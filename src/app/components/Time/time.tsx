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
    <div className="text-4xl font-bold bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 bg-clip-text text-transparent tracking-wider">
      {format(time, "HH:mm")}
    </div>
  );
};
