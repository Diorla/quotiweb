export default function timePad(time: number | string) {
  return ("00" + time).slice(-2);
}
