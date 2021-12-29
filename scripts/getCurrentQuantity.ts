import currentRecordKey from "constants/currentRecordKey";

export default function getCurrentQuantity(quantityRecord: {
  [key: string]: number;
}) {
  if (!quantityRecord) return 0;
  return quantityRecord[currentRecordKey] || 0;
}
