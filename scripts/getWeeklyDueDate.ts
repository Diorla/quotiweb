import dayjs from "dayjs";

export default function getWeeklyDueDate(
  daysOfWeek: number[],
  startDate: string,
  repeatCount: number,
  hour: number,
  minute: number
) {
  const sortedDays = daysOfWeek.sort((a, b) => a - b);
  let nextDay = dayjs().day();
  const beforeDays = sortedDays.filter((item) => item < dayjs().day());
  const afterDays = sortedDays.filter((item) => item > dayjs().day());
  const diff = dayjs().diff(startDate, "week");
  let remainder = diff % repeatCount;
  if (!sortedDays.includes(nextDay)) {
    if (afterDays.length) nextDay = afterDays[0];
    else {
      nextDay = beforeDays[beforeDays.length - 1];
      remainder++;
    }
  }
  return dayjs().add(remainder, "week").day(nextDay).hour(hour).minute(minute);
}
