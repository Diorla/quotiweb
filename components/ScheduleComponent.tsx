import { Box, Button } from "@mui/material";
import { useUser } from "context/userContext";
import dayjs from "dayjs";
import firebase from "firebase/clientApp";
import { repeatType, scheduleType } from "interfaces/Activity";
import getSchedule from "../scripts/getSchedule";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ActivityStatus from "../interfaces/ActivityStatus";
import Countdown from "./Countdown";
import convertMsToHMS from "scripts/convertMSToHMS";
import Recurrence from "./Recurrence";

export default function ScheduleComponent({
  schedule,
  status,
  dueDate,
  quantity = 0,
  duration,
  startTime,
  endTime,
  unit,
  currentQuantity,
  currentTime,
  updated,
  id,
  checkedList,
  repeat,
  repeatCount,
}: {
  schedule: scheduleType;
  status: ActivityStatus;
  dueDate: number;
  quantity?: number;
  duration?: number;
  startTime?: string;
  endTime?: string;
  unit?: string;
  currentQuantity: number;
  currentTime: number;
  updated: string;
  id: string;
  checkedList: string[];
  repeat: repeatType;
  repeatCount: number;
}) {
  const value = getSchedule({
    quantity,
    duration,
    startTime,
    endTime,
    unit,
    schedule,
    currentQuantity,
    currentTime,
    updated,
    checkedList,
  });

  const {
    user: { uid, runningId, runningTaskStartTime },
  } = useUser();
  const increaseQuantity = () => {
    const db = firebase.firestore();
    const increment = firebase.firestore.FieldValue.increment(1);
    const diff = quantity - currentQuantity;
    const updatedCheckedList = [...checkedList];
    if (diff === 1) updatedCheckedList.push(dayjs().toString());
    db.doc(`users/${uid}/activities/${id}`).update({
      updated: dayjs().toString(),
      currentQuantity: increment,
      checkedList: updatedCheckedList,
    });
  };
  const pauseActivity = (id = "", taskTime = "") => {
    const db = firebase.firestore();
    const batch = db.batch();

    const userRef = db.collection("users").doc(uid);
    // runningId, in case it's been updated from another card
    const taskRef = db.doc(`users/${uid}/activities/${runningId}`);

    const increment = firebase.firestore.FieldValue.increment(
      dayjs().diff(runningTaskStartTime, "milliseconds")
    );

    // it will update with the id and now in case it's coming from playActivity
    // otherwise, it will be an empty string
    batch.update(userRef, { runningId: id, runningTaskStartTime: taskTime });
    batch.update(taskRef, {
      currentTime: increment,
      updated: dayjs().toString(),
    });

    batch.commit();
  };
  const playActivity = () => {
    const db = firebase.firestore();
    if (runningId) pauseActivity(id, dayjs().toString());
    else
      db.collection("users")
        .doc(uid)
        .update({ runningId: id, runningTaskStartTime: dayjs().toString() });
  };
  // <Box>Show occurrence e.g. every Tuesday</Box>
  if (status === "none")
    return <Recurrence repeat={repeat} repeatCount={repeatCount} />;
  if (status === "completed") {
    if (schedule === "quantity")
      return (
        <Box>
          {value} {unit}
        </Box>
      );
    const { hh, mm, ss } = convertMsToHMS(value);
    return (
      <Box>
        {hh}:{mm}:{ss}
      </Box>
    );
  }
  if (status === "upcoming")
    return <Box>{dayjs(dueDate).format("DD/MMM/YYYY HH:mm")}</Box>;
  if (schedule === "quantity")
    return (
      <Box
        sx={{
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
        }}
      >
        {value} {unit}
        <Button
          onClick={increaseQuantity}
          color="primary"
          size="small"
          variant="contained"
        >
          <AddIcon />
        </Button>
      </Box>
    );
  return (
    <Box
      sx={{
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Countdown
        checkedList={checkedList}
        timeLeft={value}
        running={runningId === id}
        startTime={runningTaskStartTime}
      />
      <Button
        onClick={() => (runningId === id ? pauseActivity() : playActivity())}
        color="primary"
        size="small"
        variant="contained"
      >
        {runningId === id ? <PauseIcon /> : <PlayArrowIcon />}
      </Button>
    </Box>
  );
}
