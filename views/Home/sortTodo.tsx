import ExtendedActivity from "interfaces/ExtendedActivity";

export default function sortTodo(a: ExtendedActivity, b: ExtendedActivity) {
  if (a.isPinned && b.isPinned) return 0;
  if (a.isPinned) return -1;
  if (b.isPinned) return 1;
  return b.priority - a.priority;
}
