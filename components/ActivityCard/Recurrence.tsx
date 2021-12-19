import weekdays from "constants/weekdays";
import dayjs from "dayjs";
import Activity from "interfaces/Activity";
import Category from "interfaces/Category";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

const getWeekly = (activity: Activity) => {
  const { repeatCount, daysOfWeek } = activity;
  const days = daysOfWeek
    .sort((prev, next) => prev - next)
    .map((item) => weekdays[item])
    .join(", ");
  const lastIndex = days.lastIndexOf(",");
  const withAdd = days.slice(0, lastIndex) + " and" + days.slice(lastIndex + 1);
  const title = repeatCount === 1 ? "week" : ` ${repeatCount} weeks`;
  return `Every ${title} on ${withAdd}`;
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
  const { repeat, repeatCount, repeatId } = activity;
  if (repeat === "activity")
    return <div>After {activities[repeatId]?.name}</div>;
  if (repeat === "category")
    return <div>After {categories[repeatId]?.name}</div>;
  if (repeat === "day")
    return (
      <div>
        Every {repeatCount} {repeat}
      </div>
    );
  if (repeat === "week") return <div>{getWeekly(activity)}</div>;
  if (repeat === "month") return <div>{getMonthly(activity)}</div>;
  return <div>{getYearly(activity)}</div>;
}
