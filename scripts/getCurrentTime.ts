import dayjs from "dayjs";

export default function getCurrentTime(timeRecord: { [key: string]: number }) {
  const date = dayjs().format("YYYY-MM-DD");
  if (!timeRecord) return 0;
  return timeRecord[date] || 0;
}
