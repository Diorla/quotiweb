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
  const today = dayjs().day();
  // Today is one of the day
  if (daysOfWeek.includes(today))
    return dayjs().add(remainder, "week").hour(hour).minute(minute);
  const sortedDays = daysOfWeek.sort((a, b) => a - b);
  const maxDay = Math.max(...sortedDays);
  const minDay = Math.min(...sortedDays);
  // Roll to next week (or next x week)
  if (today > maxDay)
    return (
      dayjs()
        .day(minDay)
        // if it's this week, remainder will be 0, so next (x) week(s)
        .add(remainder || repeatCount, "week")
        .hour(hour)
        .minute(minute)
    );
  // Same week
  const afterDays = sortedDays.filter((item) => item > dayjs().day());
  return dayjs()
    .add(remainder, "week")
    .day(afterDays[0])
    .hour(hour)
    .minute(minute);
}
