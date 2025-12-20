import { Time } from "./components/Time/time";
import { News } from "./components/News/news";
import Comic from "./components/Comic/comic";
import { FlagDayComponent as FlagDay } from "./components/FlagDay/flag-day";
import { Practical } from "./components/Practical/practical";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start w-full">
        <div>
          <Time />
          <FlagDay disabled />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 w-full px-4">
          <div className="flex-shrink-0">
            <Practical />
          </div>
          <div className="flex-grow">
            <News />
          </div>
        </div>
        <Comic />
      </main>
    </div>
  );
}
