import convertHMSToMs from "./convertHMSToMS";
import dayjsToTime from "./dayjsToTime";

export default function dayjsToMS(date: any) {
  const time = dayjsToTime(date, true);
  const [hh, mm, ss] = time.split(":");
  return convertHMSToMs({ hh: Number(hh), mm: Number(mm), ss: Number(ss) });
}
