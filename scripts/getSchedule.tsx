import dayjs from "dayjs";
import { scheduleType } from "interfaces/Activity";
import isToday from "dayjs/plugin/isToday";
import convertMsToHMS from "scripts/convertMSToHMS";
import timeToDayJS from "scripts/timeToDayJS";
dayjs.extend(isToday);

const getCompletedValue = (
  checkedList: string[],
  currentValue: number,
  updated: string
) => {
  const lastDone = checkedList[checkedList.length];
  if (checkedList.length && dayjs(lastDone).isToday()) {
    return 0;
  }
  return updated && dayjs(updated).isToday() ? currentValue : 0;
};

export default function getSchedule({
  schedule,
  quantity = 0,
  duration = 0,
  startTime,
  endTime,
  unit,
  currentQuantity,
  currentTime,
  updated,
  checkedList,
}: {
  schedule: scheduleType;
  quantity?: number;
  duration?: number;
  startTime?: string;
  endTime?: string;
  unit?: string;
  currentQuantity: number;
  currentTime: number;
  updated: string;
  checkedList: string[];
}) {
  if (schedule === "quantity") {
    const alreadyDone = getCompletedValue(
      checkedList,
      currentQuantity,
      updated
    );
    return quantity - alreadyDone; //`${quantity - alreadyDone} ${unit}`;
  }
  const alreadyDone = getCompletedValue(checkedList, currentTime, updated);
  if (schedule === "duration") return duration - alreadyDone;
  const ms = dayjs(timeToDayJS(endTime)).diff(
    timeToDayJS(startTime),
    "millisecond"
  );
  return ms - alreadyDone;
  // if (schedule === "duration") {
  //   const { hh, mm, ss } = convertMsToHMS(duration - alreadyDone || 0);
  //   return `${hh}:${mm}:${ss}`;
  // }
  // const ms = dayjs(timeToDayJS(endTime)).diff(
  //   timeToDayJS(startTime),
  //   "millisecond"
  // );
  // const { hh, mm, ss } = convertMsToHMS(ms - alreadyDone || 0);
  // return `${hh}:${mm}:${ss}`;
}
