import dayjs from "dayjs";
import Activity from "interfaces/Activity";
import getDueDate from "scripts/getDueDate";
import isToday from "dayjs/plugin/isToday";
import Category from "interfaces/Category";
import ActivityStatus from "interfaces/ActivityStatus";
import getValueRemaining from "./getValueRemaining";
dayjs.extend(isToday);

export interface ExtendedActivity extends Activity {
  dueDate?: dayjs.Dayjs;
  status?: ActivityStatus;
  remaining?: number;
  categoryName?: string;
}
export default function filterTodo(
  activities: Activity[],
  CategoryMap: { [key: string]: Category }
) {
  const completed: ExtendedActivity[] = [];
  const todo: ExtendedActivity[] = [];
  const upcoming: ExtendedActivity[] = [];
  /**
   * For category and activity based activity
   */
  const noDueDate: ExtendedActivity[] = [];
  let totalTime = 0;
  let totalQuantity = 0;
  activities.forEach((activity) => {
    const categoryName = CategoryMap[activity.category]?.name;
    const priority = CategoryMap[activity.category]?.priority;
    const { checkedList, schedule } = activity;
    if (
      checkedList.length &&
      dayjs(checkedList[checkedList.length - 1]).isToday()
    ) {
      completed.push({ ...activity, categoryName, priority });
    } else {
      const dueDate = getDueDate(activity);
      if (!dueDate) noDueDate.push({ ...activity, categoryName, priority });
      else if (dayjs(dueDate).isToday()) {
        const remaining = getValueRemaining(activity);
        if (schedule === "quantity") totalQuantity += remaining;
        else totalTime += remaining;
        todo.push({ ...activity, remaining, categoryName, priority });
      } else
        upcoming.push({
          ...activity,
          dueDate: dueDate,
          categoryName,
          priority,
        });
    }
  });
  return {
    completed,
    todo,
    upcoming,
    noDueDate,
    totalQuantity,
    totalTime,
  };
}
