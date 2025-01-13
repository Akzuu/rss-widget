"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

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

  // Fetch updates every 10 minutes
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <Link href={"https://www.hs.fi/sarjakuvat/fokit/"}>
        {comicUrl && (
          <Image alt="Fok_It comic" src={comicUrl} height={200} width={567} />
        )}

        <div className="flex justify-between">
          <span>Fok_It</span>
          <span>©Joonas Rinta-Kanto</span>
        </div>
      </Link>
    </div>
  );
};

export default Comic;
