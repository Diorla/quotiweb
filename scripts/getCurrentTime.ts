import dayjs from "dayjs";

export default function getCurrentTime(timeRecord: { [key: string]: number }) {
  const date = dayjs().format("YYYY-MM-DD");
  return timeRecord[date] || 0;
}
