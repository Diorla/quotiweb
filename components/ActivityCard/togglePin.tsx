import updateActivity from "services/updateActivity";
import Activity from "interfaces/Activity";

export default function togglePin(userId: string, activity: Activity) {
  const { isPinned, id } = activity;
  updateActivity(userId, { id, isPinned: !isPinned }, () => {});
}
