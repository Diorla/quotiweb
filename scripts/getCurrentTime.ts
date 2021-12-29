import currentRecordKey from "constants/currentRecordKey";

export default function getCurrentTime(timeRecord: { [key: string]: number }) {
  if (!timeRecord) return 0;
  return timeRecord[currentRecordKey] || 0;
}
