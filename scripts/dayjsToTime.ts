import dayjs from "dayjs";

export default function dayjsToTime(date: any, showSecond = false) {
  if (showSecond) return dayjs(date).format("HH:mm:ss");
  return dayjs(date).format("HH:mm");
}
