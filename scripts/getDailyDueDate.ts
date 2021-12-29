import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

export default function getDailyDueDate(
  startDate: string,
  repeatCount: number,
  hour: number,
  minute: number
) {
  if (dayjs().isSameOrBefore(startDate, "date"))
    return dayjs(startDate).hour(hour).minute(minute);
  const diff = dayjs().diff(startDate, "day");
  const remainder = diff % repeatCount;
  return dayjs().add(remainder, "day").hour(hour).minute(minute);
}
