import dayjs, { Dayjs } from "dayjs";
import Activity from "interfaces/Activity";
import ActivityStatus from "interfaces/ActivityStatus";
import Recurrence from "./Recurrence";
import Todo from "./Todo";

export default function ScheduleRender({
  activity,
  status,
  dueDate,
  remaining,
}: {
  activity: Activity;
  status: ActivityStatus;
  dueDate: Dayjs;
  remaining?: number;
}) {
  const { updated, repeat, repeatCount } = activity;
  if (status === "completed")
    return <div>{dayjs(updated).format("DD-MMM-YYYY HH:mm")}</div>;
  if (status === "upcoming")
    return <div>{dueDate.format("DD-MMM-YYYY HH:mm")}</div>;
  if (status === "todo") return <Todo {...activity} remaining={remaining} />;
  return <Recurrence repeat={repeat} repeatCount={repeatCount} />;
}
