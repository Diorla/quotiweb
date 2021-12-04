import { Grid, IconButton } from "@mui/material";
import Priority from "interfaces/Priority";
import styled from "@emotion/styled";
import { PriorityFlag } from "./PriorityFlag";
import { priorityList } from "../constants/priorityList";
import { colorList } from "../constants/colorList";

import FlagIcon from "@mui/icons-material/Flag";

const PriorityDiv = styled.div`
  width: 70px;
`;
export default function PriorityPicker({
  value,
  onChange,
}: {
  value: Priority;
  onChange: (val: Priority) => void;
}) {
  return (
    <Grid sx={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
      <Grid sx={{ fontWeight: "bold" }}>Priority: </Grid>
      <PriorityFlag value={value} />
      <PriorityDiv>{priorityList[value]}</PriorityDiv>
      {priorityList.map((_item, idx) => (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          key={idx}
          onClick={() => onChange(idx as Priority)}
          sx={{ mr: 2 }}
        >
          <FlagIcon color={colorList[idx] as any} sx={{ fontSize: 27 }} />
        </IconButton>
      ))}
    </Grid>
  );
}
