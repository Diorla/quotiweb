import dayjs from "dayjs";

export default function getDailyDueDate(
  startDate: string,
  repeatCount: number,
  hour: number,
  minute: number
) {
  const diff = dayjs().diff(startDate, "day");
  const remainder = diff % repeatCount;
  return dayjs().add(remainder, "day").hour(hour).minute(minute);
}
