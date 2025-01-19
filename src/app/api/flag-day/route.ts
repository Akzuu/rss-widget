import { isSameDay } from "date-fns";

export type FlagDay = {
  name: string;
  date: string;
  description: string;
  official: boolean;
  links: string[];
};

export async function GET() {
  const today = new Date();
  const flagDays = (await (
    await fetch("https://mitatanaanliputetaan.vercel.app/api/liputuspaivat")
  ).json()) as FlagDay[];

  const flagDayToday = flagDays.find((fd) =>
    isSameDay(today, new Date(fd.date))
  );

  if (!flagDayToday) return Response.json("Not found", { status: 404 });

  return Response.json(flagDayToday);
}
