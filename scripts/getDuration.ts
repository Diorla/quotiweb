import Activity from "interfaces/Activity";
import timeToDayJS from "./timeToDayJS";

export default function getDuration(activity: Activity) {
  const { schedule, startTime, endTime, duration } = activity;
  if (schedule === "quantity") throw new Error("No quantity based activity");
  if (schedule === "duration") return duration ?? 0;
  return Math.abs(
    timeToDayJS(startTime).diff(timeToDayJS(endTime), "millisecond")
  );
}
