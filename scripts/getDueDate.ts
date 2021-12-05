import dayjs from "dayjs";
import Activity from "interfaces/Activity";
import getDailyDueDate from "./getDailyDueDate";
import getMonthlyDueDate from "./getMonthlyDueDate";
import getScheduleTime from "./getScheduleTime";
import getWeeklyDueDate from "./getWeeklyDueDate";
import getYearlyDueDate from "./getYearlyDueDate";

export default function getDueDate(activity: Activity) {
  const { repeat, startDate, repeatCount, daysOfWeek, repeatDoneCount } =
    activity;
  const time = getScheduleTime(activity);
  const [h, m] = time.split(":");
  const hour = Number(h);
  const minute = Number(m);
  if (repeat === "day") {
    return getDailyDueDate(startDate, repeatCount, hour, minute);
  }
  if (repeat === "week") {
    return getWeeklyDueDate(daysOfWeek, startDate, repeatCount, hour, minute);
  }
  if (repeat === "month") {
    return getMonthlyDueDate(startDate, repeatCount, hour, minute);
  }
  if (repeat === "year") {
    return getYearlyDueDate(startDate, repeatCount, hour, minute);
  }
  if (repeatDoneCount) return dayjs().hour(hour).minute(minute);
  return null;
}
