"use client";
import { News } from "./components/News/news";
import Comic from "./components/Comic/comic";
import { TopBar } from "./components/TopBar/top-bar";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start w-full">
        <TopBar />
        <div className="flex flex-col lg:flex-row gap-4 w-full px-4">
          <div className="flex-grow">
            <News />
          </div>
        </div>
        <Comic />
      </main>
    </div>
  );
}
