import { Box, Checkbox } from "@mui/material";
import { useUser } from "context/userContext";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import ActivityStatus from "interfaces/ActivityStatus";
import Confirm from "../Confirm";
import { ExtendedActivity } from "views/Home/filterTodo";
import getDuration from "scripts/getDuration";
import currentRecordKey from "constants/currentRecordKey";
import updateActivity from "services/updateActivity";

export default function MarkAsDone({
  status,
  activity,
}: {
  status: ActivityStatus;
  activity: ExtendedActivity;
}) {
  const {
    user: { uid },
  } = useUser();

  const markAsDone = () => {
    const { id, checkedList, schedule, timeRecord, quantityRecord, quantity } =
      activity;

    if (schedule === "quantity") {
      updateActivity(
        uid,
        {
          id,
          checkedList: [...checkedList, dayjs().toString()],
          updated: dayjs().toString(),
          quantityRecord: {
            ...quantityRecord,
            [currentRecordKey]: quantity ?? 0,
          },
        },
        () => toast.info("Activity completed")
      );
    } else {
      const value = getDuration(activity);
      updateActivity(
        uid,
        {
          id,
          checkedList: [...checkedList, dayjs().toString()],
          updated: dayjs().toString(),
          timeRecord: {
            ...timeRecord,
            [currentRecordKey]: value,
          },
        },
        () => toast.info("Activity completed")
      );
    }
  };
  const [open, setOpen] = useState(false);
  if (status === "todo")
    return (
      <Box>
        <Checkbox checked={false} onClick={() => setOpen(true)} />
        <Confirm
          open={open}
          onCancel={() => setOpen(false)}
          onAccept={markAsDone}
          title="Mark as done"
          message="This cannot be undone"
        />
      </Box>
    );
  if (status === "completed") return <Checkbox checked />;
  return null;
}
