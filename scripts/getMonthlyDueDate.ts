import dayjs from "dayjs";

export default function getMonthlyDueDate(
  startDate: string,
  repeatCount: number,
  hour: number,
  minute: number
) {
  const diff = dayjs().diff(startDate, "month");
  const month = dayjs(startDate).month();
  const date = dayjs(startDate).date();
  const remainder = diff % repeatCount;
  return dayjs()
    .add(remainder, "month")
    .month(month)
    .date(date)
    .hour(hour)
    .minute(minute);
}
