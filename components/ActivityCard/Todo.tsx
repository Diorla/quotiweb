import { Add, Pause, PlayArrow } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useUser } from "context/userContext";
import { ExtendedActivity } from "views/Home/filterTodo";
import Countdown from "./Countdown";
import { useState } from "react";
import playActivity from "services/playActivity";
import pauseActivity from "services/pauseActivity";
import increaseQuantity from "services/increaseQuantity";

export default function Todo(activity: ExtendedActivity) {
  const {
    user: { runningId, runningTaskStartTime, uid },
    user,
  } = useUser();
  const { schedule, remaining = 0, unit, id, checkedList } = activity;

  const [disabled, setDisabled] = useState(false);

  if (schedule === "quantity") {
    return (
      <Box
        sx={{
          alignItems: "center",
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {remaining} {unit}
        </Box>
        <Button
          onClick={() => {
            setDisabled(true);
            increaseQuantity(activity, uid, () =>
              setTimeout(() => setDisabled(false), 1000)
            );
          }}
          color="secondary"
          size="small"
          variant="contained"
          disabled={disabled}
        >
          <Add />
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        alignItems: "center",
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Countdown
        timeLeft={remaining}
        running={runningId === id}
        startTime={runningTaskStartTime}
        checkedList={checkedList}
      />
      <Button
        onClick={() =>
          runningId === id
            ? pauseActivity(user, activity)
            : playActivity(user, activity)
        }
        color="secondary"
        size="small"
        variant="contained"
      >
        {runningId === id ? <Pause /> : <PlayArrow />}
      </Button>
    </Box>
  );
}
