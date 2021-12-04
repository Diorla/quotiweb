import React from "react";
import FlagIcon from "@mui/icons-material/Flag";
import { colorList } from "../constants/colorList";

export function PriorityFlag({ value }: { value: number }) {
  return <FlagIcon color={colorList[value] as any} />;
}
