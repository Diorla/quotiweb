import weekdays from "constants/weekdays";
import dayjs from "dayjs";
import Activity from "interfaces/Activity";
import Category from "interfaces/Category";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

const getDaily = (activity: Activity) => {
  const { repeatCount, repeat } = activity;
  if (repeatCount === 1) return "Everyday";
  if (repeatCount === 2) return "Every other day";
  return `Every ${repeatCount} ${repeat}`;
};

const getWeekly = (activity: Activity) => {
  const { repeatCount, daysOfWeek } = activity;
  if (daysOfWeek.length === 1) {
    if (repeatCount === 1) return `Every ${weekdays[daysOfWeek[0]]}`;
    if (repeatCount === 2) return `Every other ${weekdays[daysOfWeek[0]]}`;
    return `Every ${repeatCount} ${weekdays[daysOfWeek[0]]}`;
  }
  // user will be able to select what they consider as weekend and weekdays
  const weekends = [0, 5, 6]; // Sun, Fri & Sat
  const workdays = [1, 2, 3, 4, 5]; // Mon to Fri
  if (
    weekends.length === daysOfWeek.length &&
    daysOfWeek.every((item) => weekends.includes(item))
  ) {
    if (repeatCount === 1) return "Every weekend";
    if (repeatCount === 2) return "Every other weekend";
    return `Every ${repeatCount} weekends`;
  }
  if (
    workdays.length === daysOfWeek.length &&
    daysOfWeek.every((item) => workdays.includes(item))
  ) {
    if (repeatCount === 1) return "Every workdays";
    if (repeatCount === 2) return "Every other workdays";
    return `Every ${repeatCount} workdays`;
  }
  const days = daysOfWeek
    .sort((prev, next) => prev - next)
    .map((item) => weekdays[item])
    .join(", ");
  const lastIndex = days.lastIndexOf(",");
  const withAdd = days.slice(0, lastIndex) + " and" + days.slice(lastIndex + 1);
  if (repeatCount === 1) return `Every week on ${withAdd}`;
  if (repeatCount === 2) return `Every other week on ${withAdd}`;
  return `Every ${repeatCount} weeks on ${withAdd}`;
};

const getMonthly = (activity: Activity) => {
  const { startDate, repeatCount } = activity;
  const title = repeatCount === 1 ? "month" : ` ${repeatCount} months`;
  return `Every ${title} on the ${dayjs(startDate).format("Do")}`;
};

const getYearly = (activity: Activity) => {
  const { startDate, repeatCount } = activity;
  const title = repeatCount === 1 ? "year" : ` ${repeatCount} years`;
  return `Every ${title} on the ${dayjs(startDate).format("Do of MMM")}`;
};

export default function Recurrence({
  activity,
  activities,
  categories,
}: {
  activity: Activity;
  activities: { [key: string]: Activity };
  categories: { [key: string]: Category };
}) {
  const { repeat, repeatId } = activity;
  if (repeat === "activity")
    return <div>After {activities[repeatId]?.name}</div>;
  if (repeat === "category")
    return <div>After {categories[repeatId]?.name}</div>;
  if (repeat === "day") return <div>{getDaily(activity)}</div>;
  if (repeat === "week") return <div>{getWeekly(activity)}</div>;
  if (repeat === "month") return <div>{getMonthly(activity)}</div>;
  return <div>{getYearly(activity)}</div>;
}
