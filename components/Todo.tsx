import { Add, Pause, PlayArrow } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useUser } from "context/userContext";
import dayjs from "dayjs";
import { ExtendedActivity } from "views/Home/filterTodo";
import firebase from "firebase/clientApp";
import Countdown from "./Countdown";
import currentRecordKey from "constants/currentRecordKey";

export default function Todo(activity: ExtendedActivity) {
  const {
    user: { runningId, runningTaskStartTime, uid },
  } = useUser();
  const {
    schedule,
    remaining = 0,
    unit,
    id,
    checkedList,
    timeRecord = {},
  } = activity;

  const increaseQuantity = () => {
    const db = firebase.firestore();
    const { quantityRecord = {}, quantity = 0 } = activity;
    const updatedCheckedList = [...checkedList];
    const currentQuantity = quantityRecord[currentRecordKey] || 0;
    const diff = quantity - currentQuantity;
    if (diff === 1) updatedCheckedList.push(dayjs().toString());

    db.doc(`users/${uid}/activities/${id}`).update({
      updated: dayjs().toString(),
      quantityRecord: {
        ...quantityRecord,
        [currentRecordKey]: currentQuantity + 1,
      },
      checkedList: updatedCheckedList,
    });
  };

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
          onClick={increaseQuantity}
          color="primary"
          size="small"
          variant="contained"
        >
          <Add />
        </Button>
      </Box>
    );
  }

  const pauseActivity = (newId = "") => {
    const db = firebase.firestore();
    const batch = db.batch();

    const userRef = db.collection("users").doc(uid);

    const taskRef = db.doc(`users/${uid}/activities/${runningId}`);

    const increment = dayjs().diff(runningTaskStartTime, "milliseconds");
    const currentTime = timeRecord[currentRecordKey] || 0;
    batch.update(userRef, {
      runningId: newId,
      runningTaskStartTime: newId ? dayjs().toString() : "",
    });
    batch.update(taskRef, {
      timeRecord: {
        ...timeRecord,
        [currentRecordKey]: increment + currentTime,
      },
      updated: dayjs().toString(),
    });

    batch.commit();
  };
  const playActivity = () => {
    const db = firebase.firestore();
    if (runningId) pauseActivity(id);
    else
      db.collection("users")
        .doc(uid)
        .update({ runningId: id, runningTaskStartTime: dayjs().toString() });
  };
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
        onClick={() => (runningId === id ? pauseActivity() : playActivity())}
        color="primary"
        size="small"
        variant="contained"
      >
        {runningId === id ? <Pause /> : <PlayArrow />}
      </Button>
    </Box>
  );
}
