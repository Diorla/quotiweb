import dayjs from "dayjs";
import convertMsToHMS from "./convertMSToHMS";

export default function msToDayJS(ms?: number) {
  if (!ms) return dayjs().hour(0).minute(0).second(0);
  const { hh, mm, ss } = convertMsToHMS(ms, true);
  return dayjs().hour(hh).minute(mm).second(ss);
}
