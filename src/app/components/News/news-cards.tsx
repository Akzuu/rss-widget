import React from "react";
import { format } from "date-fns";
import Link from "next/link";

type NewsItem = {
  date: Date;
  description?: string;
  imageUrl?: string;
  title: string;
  owner: string;
  link: string;
};

type NewsCardsProps = {
  newsItems: NewsItem[];
};

export const NewsCards: React.FC<NewsCardsProps> = ({ newsItems }) => {
  const topNewsItems = newsItems.slice(0, 5);

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
        {topNewsItems.length > 0 && (
          <Link
            href={topNewsItems[0].link}
            rel="noopener noreferrer"
            target="_blank"
            className="relative p-0 rounded-2xl overflow-hidden flex flex-col row-span-2 shadow-2xl hover:scale-[1.02] transition-transform duration-300 group"
            style={{
              background: topNewsItems[0].imageUrl
                ? `url(${topNewsItems[0].imageUrl})`
                : "linear-gradient(135deg, #475569 0%, #334155 100%)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative text-white p-6 mt-auto">
              <div className="inline-block px-3 py-1 bg-slate-600/70 rounded-full text-xs font-semibold mb-3">
                {topNewsItems[0].owner}
              </div>
              <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-slate-300 transition-colors">
                  {topNewsItems[0].title}
                </h2>
                {topNewsItems[0].description && (
                  <p className="mt-2 text-sm text-slate-300">
                    {topNewsItems[0].description}
                  </p>
                )}
                <p className="mt-3 text-xs text-slate-400">
                  {format(topNewsItems[0].date, "HH:mm")}
                </p>
              </div>
            </div>
          </Link>
        )}
        {topNewsItems.slice(1).map((item, index) => (
          <Link
            href={item.link}
            rel="noopener noreferrer"
            target="_blank"
            key={index}
            className="relative p-0 rounded-2xl overflow-hidden flex flex-col shadow-xl hover:scale-[1.02] transition-transform duration-300 group"
            style={{
              background: item.imageUrl
                ? `url(${item.imageUrl})`
                : "linear-gradient(135deg, #475569 0%, #334155 100%)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative text-white p-5 mt-auto">
              <div className="inline-block px-2 py-1 bg-slate-600/70 rounded-full text-xs font-semibold mb-2">
                {item.owner}
              </div>
              <div className="bg-black/80 backdrop-blur-md p-3 rounded-xl">
                <h2 className="text-lg font-bold group-hover:text-slate-300 transition-colors">
                  {item.title}
                </h2>
                {item.description && (
                  <p className="mt-2 text-xs text-slate-300">
                    {item.description}
                  </p>
                )}
                <p className="mt-2 text-xs text-slate-400">
                  {format(item.date, "HH:mm")}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
