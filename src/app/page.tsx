import { Time } from "./components/Time/time";
import { News } from "./components/News/news";
import Comic from "./components/Comic/comic";
import { FlagDayComponent as FlagDay } from "./components/FlagDay/flag-day";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <div>
          <Time />
          <FlagDay disabled />
        </div>
        <News />
        <Comic />
      </main>
    </div>
  );
}
