import Parser from "rss-parser";

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

export type HSFeed = {
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

export async function GET() {
  const hsFeed = (await parser.parseURL(
    "https://www.hs.fi/rss/tuoreimmat.xml"
  )) as unknown as HSFeed;

  return Response.json(hsFeed);
}
