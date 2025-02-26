type ComicResponse = {
  id: number;
  href: string;
  displayDate: string;
  title: string;
  picture: {
    id: number;
    width: number;
    height: number;
    url: string;
    squareUrl: string;
    photographer: string;
  };
  paidType: string;
  category: string;
  sectionTheme: string;
  infoRowContent: {
    timestamp: boolean;
    paidIndicator: boolean;
    saveButton: boolean;
  };
  tags: string[];
};

export async function GET() {
  const comics = (await (
    await fetch("https://www.hs.fi/api/laneitems/39221/list/normal/295")
  ).json()) as ComicResponse[] | undefined;

  console.log(comics);

  if (comics === undefined || comics.length === 0) {
    return Response.error();
  }

  return Response.json(comics[0].picture.url);
}
