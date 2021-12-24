import dayjs from "dayjs";
import Activity from "interfaces/Activity";
import getDueDate from "scripts/getDueDate";
import isToday from "dayjs/plugin/isToday";
import Category from "interfaces/Category";
import getValueRemaining from "./getValueRemaining";
import ExtendedActivity from "interfaces/ExtendedActivity";
dayjs.extend(isToday);

export default function filterTodo(
  activities: Activity[],
  CategoryMap: { [key: string]: Category }
) {
  const completed: ExtendedActivity[] = [];
  const todo: ExtendedActivity[] = [];
  const laterToday: ExtendedActivity[] = [];
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
      if (!dueDate) {
        //noDueDate.push({ ...activity, categoryName, priority });
      } else if (dayjs(dueDate).isToday()) {
        const remaining = getValueRemaining(activity);
        if (schedule === "quantity") totalQuantity += remaining;
        else totalTime += remaining;
        if (dueDate.isAfter(dayjs()))
          laterToday.push({
            ...activity,
            remaining,
            categoryName,
            priority,
            dueDate,
          });
        else
          todo.push({
            ...activity,
            remaining,
            categoryName,
            priority,
            dueDate,
          });
      }
    }
  });
  return {
    completed,
    todo,
    totalQuantity,
    totalTime,
    laterToday,
  };
}
