import dayjs from "dayjs";
import Activity from "interfaces/Activity";
import getCurrentQuantity from "scripts/getCurrentQuantity";
import getCurrentTime from "scripts/getCurrentTime";
import timeToDayJS from "scripts/timeToDayJS";

export default function getValueRemaining(activity: Activity) {
  const {
    schedule,
    quantity = 0,
    startTime,
    endTime,
    duration = 0,
    quantityRecord,
    timeRecord,
  } = activity;
  if (schedule === "quantity") {
    return quantity - getCurrentQuantity(quantityRecord);
  }
  if (schedule === "duration") {
    return duration - getCurrentTime(timeRecord);
  }
  const diffDuration = dayjs(timeToDayJS(endTime)).diff(timeToDayJS(startTime));
  return diffDuration - getCurrentTime(timeRecord);
}
