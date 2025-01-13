"use client";
import React, { useCallback, useEffect, useState } from "react";
import { NewsCards } from "./news-cards";
import { HSFeed } from "@/app/api/rss/hs/route";
import { Cron } from "croner";

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

  // Fetch updates every 5 minutes from 06:00 to 23:59
  // and every 30 minutes from 23:00 to 05:59
  useEffect(() => {
    fetchData();
    const dayJob = new Cron("*/5 6-23 * * *", fetchData);
    const nightJob = new Cron("*/30 0-5 * * *", fetchData);
    return () => {
      dayJob.stop();
      nightJob.stop();
    };
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
            link: hsNewsItem.link,
            owner: "HS",
          })) ?? []
      }
    />
  );
};
