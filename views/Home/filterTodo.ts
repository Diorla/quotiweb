import dayjs from "dayjs";
import Activity from "interfaces/Activity";
import getDueDate from "scripts/getDueDate";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

export interface WithDueDateProps extends Activity {
  dueDate: number;
}
export default function filterTodo(activities: Activity[]) {
  const completed: Activity[] = [];
  const todo: Activity[] = [];
  const upcoming: WithDueDateProps[] = [];
  /**
   * For category and activity based activity
   */
  const noDueDate: Activity[] = [];

  activities.forEach((activity) => {
    const { checkedList } = activity;
    if (
      checkedList.length &&
      dayjs(checkedList[checkedList.length - 1]).isToday()
    ) {
      completed.push(activity);
    } else {
      const dueDate = getDueDate(activity);
      if (!dueDate) noDueDate.push(activity);
      else if (dayjs(dueDate).isToday()) todo.push(activity);
      else upcoming.push({ ...activity, dueDate: dueDate.valueOf() });
    }
  });
  return {
    completed,
    todo,
    upcoming,
    noDueDate,
  };
}
