"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Cron } from "croner";

const Comic: React.FC = () => {
  const [comicUrl, setComicUrl] = useState<string | undefined>();

  const fetchData = useCallback(
    () =>
      fetch("/api/fokit").then(async (res) => {
        const body = await res.json();
        setComicUrl(body);
      }),
    []
  );

  // Fetch updates every day at 03:30
  useEffect(() => {
    fetchData();
    const job = new Cron("30 3 * * *", fetchData);
    return () => job.stop();
  }, [fetchData]);

  if (!comicUrl) return null;
  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <Link href={"https://www.hs.fi/sarjakuvat/fokit/"}>
        <Image
          priority
          alt="Fok_It comic"
          src={comicUrl}
          height={250}
          width={709}
        />

        <div className="flex justify-between">
          <span>Fok_It</span>
          <span>©Joonas Rinta-Kanto</span>
        </div>
      </Link>
    </div>
  );
};

export default Comic;
