import dayjs from "dayjs";

export default function dayjsToTime(date: any, showSecond = false) {
  if (showSecond) dayjs(date).format("h:m:s");
  return dayjs(date).format("HH:mm");
}
