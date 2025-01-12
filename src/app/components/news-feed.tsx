"use client";
import React from "react";
import { format } from "date-fns";

type NewsItem = {
  date: Date;
  description?: string;
  imageUrl?: string;
  title: string;
};

type NewsFeedProps = {
  newsItems: NewsItem[];
};

export const NewsFeed: React.FC<NewsFeedProps> = ({ newsItems }) => {
  const topNewsItems = newsItems.slice(0, 7);

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
        {topNewsItems.length > 0 && (
          <div
            className="relative p-4 bg-white shadow-md rounded-lg overflow-hidden flex flex-col row-span-2"
            style={{
              backgroundImage: topNewsItems[0].imageUrl
                ? `url(${topNewsItems[0].imageUrl})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className={`relative ${
                topNewsItems[0].imageUrl
                  ? "bg-black bg-opacity-50 text-white"
                  : ""
              } p-4 rounded-lg flex-grow`}
            >
              <h2 className="text-xl font-bold">{topNewsItems[0].title}</h2>
              {topNewsItems[0].description && (
                <p className="mt-2">{topNewsItems[0].description}</p>
              )}
              <p className="mt-2 text-sm">
                {format(topNewsItems[0].date, "HH:mm")}
              </p>
            </div>
          </div>
        )}
        {topNewsItems.map((item, index) => (
          <div
            key={index}
            className="relative p-4 bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            style={{
              backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className={`relative ${
                item.imageUrl ? "bg-black bg-opacity-50 text-white" : ""
              } p-4 rounded-lg flex-grow`}
            >
              <h2 className="text-xl font-bold">{item.title}</h2>
              {item.description && <p className="mt-2">{item.description}</p>}
              <p className="mt-2 text-sm">{format(item.date, "HH:mm")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
