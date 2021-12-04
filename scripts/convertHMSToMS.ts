export default function convertHMSToMs({
  hh,
  mm,
  ss,
  ms,
}: {
  hh?: number | string;
  mm?: number | string;
  ss?: number | string;
  ms?: number | string;
}): number {
  const milliseconds = Number(ms || 0);
  const seconds = Number(ss || 0) * 1000;
  const minutes = Number(mm || 0) * 1000 * 60;
  const hours = Number(hh || 0) * 1000 * 60 * 60;
  return hours + minutes + seconds + milliseconds;
}
