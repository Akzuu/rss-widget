import scrapeIt from "scrape-it";

type FokItScraper = {
  cartoons: {
    url: string;
  }[];
};

export async function GET() {
  const fokitScrapingReq = await scrapeIt<FokItScraper>(
    "https://www.hs.fi/sarjakuvat/fokit/",
    {
      cartoons: {
        listItem: "img",
        data: {
          url: {
            attr: "data-simple-src",
          },
        },
      },
    }
  );

  if (fokitScrapingReq.status !== 200)
    return Response.json("Internal Server Error", { status: 500 });

  // By scraping it is only possible to get the image src for the small thumbnail
  // iamge. That does not matter, since we can get the id for the image and thus
  // determine the url for the whole image.
  const urls = fokitScrapingReq.data.cartoons.map((e) => e.url);

  const ids = urls
    .map((url) => {
      const match = url.match(/\/([a-f0-9]{32})\//);
      return match ? match[1] : null;
    })
    .filter(Boolean);

  if (ids.length === 0)
    return Response.json("Internal Server Error", { status: 500 });

  // At this moment, we are only interested about the latest comic
  return Response.json(
    `https://images.sanoma-sndp.fi/${ids[0]}/normal/1920.jpg.webp`
  );
}
