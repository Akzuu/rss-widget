import { Time } from "./components/time";
import { News } from "./components/News/news";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <Time />
        <News />
      </main>
    </div>
  );
}
