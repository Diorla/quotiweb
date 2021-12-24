import dayjs from "dayjs";
import Activity from "interfaces/Activity";
import getDueDate from "scripts/getDueDate";
import isToday from "dayjs/plugin/isToday";
import Category from "interfaces/Category";
import ExtendedActivity from "interfaces/ExtendedActivity";
dayjs.extend(isToday);

export default function filterTodo(
  activities: Activity[],
  CategoryMap: { [key: string]: Category }
) {
  const upcoming: ExtendedActivity[] = [];
  const noDueDate: ExtendedActivity[] = [];
  activities.forEach((activity) => {
    const categoryName = CategoryMap[activity.category]?.name;
    const priority = CategoryMap[activity.category]?.priority;
    const { checkedList } = activity;
    if (
      !(
        checkedList.length &&
        dayjs(checkedList[checkedList.length - 1]).isToday()
      )
    ) {
      const dueDate = getDueDate(activity);
      if (!dueDate) noDueDate.push({ ...activity, categoryName, priority });
      else if (!dayjs(dueDate).isToday()) {
        upcoming.push({
          ...activity,
          dueDate,
          categoryName,
          priority,
        });
      }
    }
  });
  return {
    upcoming,
    noDueDate,
  };
}
