import dayjs from "dayjs";

export default function timeToDayJS(time?: string) {
  if (!time) return dayjs();
  const [hour, minute] = time.split(":");
  return dayjs().hour(Number(hour)).minute(Number(minute));
}
