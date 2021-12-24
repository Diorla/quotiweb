export default function convertHMSToMs({
  hh,
  mm,
  ss,
  ms,
}: {
  hh?: number;
  mm?: number;
  ss?: number;
  ms?: number;
}): number {
  const milliseconds = ms || 0;
  const seconds = (ss || 0) * 1000;
  const minutes = (mm || 0) * 1000 * 60;
  const hours = (hh || 0) * 1000 * 60 * 60;
  return hours + minutes + seconds + milliseconds;
}
