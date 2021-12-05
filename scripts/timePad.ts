export default function timePad(time: number | string) {
  const val = "00" + time;
  return val.slice(-2);
}
