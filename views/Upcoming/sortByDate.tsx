import ExtendedActivity from "interfaces/ExtendedActivity";
import dayjs from "dayjs";

export default function sortByDate(a: ExtendedActivity, b: ExtendedActivity) {
  if (a.isPinned && b.isPinned) return 0;
  if (a.isPinned) return -1;
  if (b.isPinned) return 1;
  const initDueDate = a.dueDate ?? dayjs();
  const nextDueDate = b.dueDate ?? dayjs();
  return initDueDate.valueOf() - nextDueDate.valueOf();
}
