import dayjs from "dayjs";

export default function getYearlyDueDate(
  startDate: string,
  repeatCount: number,
  hour: number,
  minute: number
) {
  const diff = dayjs().diff(startDate, "year");
  const year = dayjs(startDate).year();
  const month = dayjs(startDate).month();
  const date = dayjs(startDate).date();
  const remainder = diff % repeatCount;
  return dayjs()
    .add(remainder, "year")
    .year(year)
    .month(month)
    .date(date)
    .hour(hour)
    .minute(minute);
}
