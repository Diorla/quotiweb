import dayjs from "dayjs";

export default function getCurrentQuantity(quantityRecord: {
  [key: string]: number;
}) {
  const date = dayjs().format("YYYY-MM-DD");
  if (!quantityRecord) return 0;
  return quantityRecord[date] || 0;
}
