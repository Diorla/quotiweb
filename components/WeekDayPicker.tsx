import { Grid, IconButton } from "@mui/material";
import weekdays from "constants/weekdays";
export default function WeekDayPicker({
  value,
  onChange,
}: {
  value: number[];
  onChange: (val: number[]) => void;
}) {
  const arr: any[] = [];
  arr.length = 7;
  arr.fill("h");
  const filterItem = (val: number) => {
    const tempArr = [...value];
    const idx = tempArr.indexOf(val);
    if (idx < 0) return [...value, val];
    return [...tempArr.slice(0, idx), ...tempArr.slice(idx + 1)];
  };
  return (
    <Grid>
      {arr.map((_item, idx) => (
        <IconButton
          key={idx}
          sx={{ fontWeight: "500" }}
          color={value.includes(idx) ? "primary" : "default"}
          onClick={() => onChange(filterItem(idx))}
        >
          <span>{weekdays[idx]}</span>
        </IconButton>
      ))}
    </Grid>
  );
}
