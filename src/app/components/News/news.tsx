"use client";
import React, { useCallback, useEffect, useState } from "react";
import { NewsCards } from "./news-cards";
import { HSFeed } from "@/app/api/rss/hs/route";

export const News: React.FC = () => {
  const [hsNewsFeed, setHsNewsFeed] = useState<HSFeed>();

  const fetchData = useCallback(
    () =>
      fetch("/api/rss/hs").then(async (res) => {
        const body = await res.json();
        setHsNewsFeed(body);
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
    <NewsCards
      newsItems={
        hsNewsFeed?.items
          .filter((e) => !/^Sanalouhos|Miniristikko|Uutisvisa/.test(e.title))
          .map((hsNewsItem) => ({
            title: hsNewsItem.title,
            date: new Date(hsNewsItem.pubDate),
            imageUrl: hsNewsItem.enclosure?.url,
          })) ?? []
      }
    />
  );
};
