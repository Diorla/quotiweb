import dayjs from "dayjs";

export default function getCurrentQuantity(quantityRecord: {
  [key: string]: number;
}) {
  const date = dayjs().format("YYYY-MM-DD");
  return quantityRecord[date] || 0;
}
