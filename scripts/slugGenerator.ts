import dayjs from "dayjs";

export default function slugGenerator(str: string) {
  const dt = dayjs().format("DD-MM-YYY-HH-mm");
  return `${str.split(" ").join("-")}-${dt}`;
}
