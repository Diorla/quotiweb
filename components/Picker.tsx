import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React from "react";

export interface ItemProps {
  label: string;
  value: any;
}
export default function Picker({
  label,
  value,
  handleChange,
  list,
  noDefault = false,
}: {
  label: string;
  value: string;
  handleChange: (e: string) => void;
  list: ItemProps[];
  noDefault?: boolean;
}) {
  return (
    <FormControl fullWidth sx={{ marginTop: 1 }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        sx={{ textTransform: "capitalize" }}
        variant="standard"
        value={value}
        label={label}
        onChange={(e) => handleChange(e.target.value)}
      >
        {!noDefault && <MenuItem value="">Select {label}</MenuItem>}
        {list.map((item, idx) => (
          <MenuItem
            key={idx}
            value={item.value}
            sx={{ textTransform: "capitalize" }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
