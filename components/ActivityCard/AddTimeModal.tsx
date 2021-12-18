import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import convertMsToHMS from "scripts/convertMSToHMS";
import convertHMSToMs from "scripts/convertHMSToMS";

export default function AddTimeModal({
  onCancel,
  onSave,
  max,
  type,
  visible,
  unit,
}: {
  onSave: (val: number) => void;
  onCancel: () => void;
  max: number;
  type: "quantity" | "duration";
  visible: boolean;
  unit?: string;
}) {
  const [input, setInput] = useState(0);
  const updateTime = (val: any, type: "h" | "m" | "s") => {
    const { hh, mm, ss } = convertMsToHMS(input, true);
    let newValue = 0;
    if (type === "h")
      newValue += convertHMSToMs({
        hh: val,
        mm,
        ss,
      });
    else if (type === "m")
      newValue += convertHMSToMs({
        hh,
        mm: val,
        ss,
      });
    else
      newValue += convertHMSToMs({
        hh,
        mm,
        ss: val,
      });
    if (max < Math.abs(newValue)) {
      setInput(max);
    } else setInput(Math.abs(newValue));
  };
  if (input > max) setInput(max);
  if (!visible) return null;
  if (type === "quantity")
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <TextField
          variant="standard"
          size="small"
          label={unit}
          type="number"
          value={input}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (max < val) setInput(max);
            else setInput(val);
          }}
        />
        <Box>
          <Button
            onClick={() => {
              onCancel();
              setInput(0);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave(input);
              setInput(0);
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    );
  const { hh, mm, ss } = convertMsToHMS(input, true);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "end",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <Box>
        <TextField
          variant="standard"
          size="small"
          label="hh"
          type="number"
          sx={{ width: 100 }}
          value={hh}
          onChange={(e) => updateTime(Number(e.target.value), "h")}
        />
        <TextField
          variant="standard"
          size="small"
          label="mm"
          type="number"
          sx={{ width: 100 }}
          value={mm}
          onChange={(e) => updateTime(Number(e.target.value), "m")}
        />
        <TextField
          variant="standard"
          size="small"
          label="ss"
          sx={{ width: 100 }}
          type="number"
          value={ss}
          onChange={(e) => updateTime(Number(e.target.value), "s")}
        />
      </Box>
      <Box>
        <Button onClick={() => onCancel()}>Cancel</Button>
        <Button onClick={() => onSave(input + 1)}>Save</Button>
      </Box>
    </Box>
  );
}
