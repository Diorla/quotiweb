import Activity from "interfaces/Activity";

// TODO: Add second variable
/**
 * This will be a variable that will state the value of the reminder
 * That is morning, afternoon, evening and night
 * It will be gotten from the user.schedule.morning etc
 * @param activity
 * @returns
 */
export default function getScheduleTime(activity: Activity) {
  const { schedule, startTime: starTime, reminder } = activity;
  if (schedule === "time") return starTime || "00:00";
  if (reminder === "afternoon") return "13:00";
  if (reminder === "evening") return "18:00";
  if (reminder === "night") return "20:00";
  return "06:00";
}
