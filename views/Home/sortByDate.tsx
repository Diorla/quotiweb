import ExtendedActivity from "interfaces/ExtendedActivity";
import dayjs from "dayjs";

export default function sortByDate(a: ExtendedActivity, b: ExtendedActivity) {
  const initDueDate = a.dueDate ?? dayjs();
  const nextDueDate = b.dueDate ?? dayjs();
  return initDueDate.valueOf() - nextDueDate.valueOf();
}
