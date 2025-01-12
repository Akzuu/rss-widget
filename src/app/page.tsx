import { NewsFeed } from "./components/news-feed";
import Parser from "rss-parser";
import { Time } from "./components/time";
const parser = new Parser();

type HSNewsItem = {
  title: string;
  link: string;
  pubDate: string;
  enclosure?: {
    url: string;
    length: string;
    type: string;
  };
  guid: string;
  categories: string[];
  isoDate: string;
};

type HSFeed = {
  feedUrl: string;
  paginationLinks: { self: string };
  title: string;
  description: string;
  pubDate: string;
  generator: string;
  link: string;
  language: string;
  copyright: string;
  lastBuildDate: string;
  ttl: string;
  items: HSNewsItem[];
};

export default async function Home() {
  const hsFeed = (await parser.parseURL(
    "https://www.hs.fi/rss/tuoreimmat.xml"
  )) as unknown as HSFeed;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Time />
        <NewsFeed
          newsItems={hsFeed.items
            .filter((e) => !/^Sanalouhos|Miniristikko|Uutisvisa/.test(e.title))
            .map((hsNewsItem) => ({
              title: hsNewsItem.title,
              date: new Date(hsNewsItem.isoDate),
              imageUrl: hsNewsItem.enclosure?.url,
            }))}
        />
      </main>
    </div>
  );
}
