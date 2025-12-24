import { isSameDay } from "date-fns";

export type FlagDay = {
  name: string;
  date: string;
  description: string;
  official: boolean;
  links: string[];
};

type Response = {
  count: number;
  data: FlagDay[];
};

export async function GET() {
  if (!process.env.FLAG_DAY_API_KEY) {
    return new Response("FLAG_DAY_API_KEY is not set", { status: 500 });
  }

  const today = new Date();
  const flagDays = (await (
    await fetch("https://mitatanaanliputetaan.vercel.app/api/liputuspaivat", {
      headers: {
        "X-API-Key": process.env.FLAG_DAY_API_KEY,
      },
    })
  ).json()) as Response | undefined;

  const flagDayToday = flagDays?.data.find((fd) =>
    isSameDay(today, new Date(fd.date))
  );

  return Response.json(flagDayToday ?? null);
}
