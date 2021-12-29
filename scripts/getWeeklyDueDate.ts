import dayjs from "dayjs";
// import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
// dayjs.extend(isSameOrBefore);

export default function getWeeklyDueDate(
  daysOfWeek: number[],
  startDate: string,
  repeatCount: number,
  hour: number,
  minute: number
) {
  const diff = dayjs().diff(startDate, "week");
  let remainder = diff % repeatCount;
  const today = dayjs(startDate).day();
  // Today is one of the day
  if (daysOfWeek.includes(today))
    return dayjs(startDate).add(remainder, "week").hour(hour).minute(minute);
  const sortedDays = daysOfWeek.sort((a, b) => a - b);
  const maxDay = Math.max(...sortedDays);
  const minDay = Math.min(...sortedDays);
  // Roll to next week (or next x week)
  if (today > maxDay)
    return dayjs(startDate)
      .day(minDay)
      .add(repeatCount, "week")
      .hour(hour)
      .minute(minute);
  // Same week
  const afterDays = sortedDays.filter((item) => item > dayjs(startDate).day());
  return dayjs(startDate).day(afterDays[0]).hour(hour).minute(minute);
}
