import { Box, Checkbox } from "@mui/material";
import { useUser } from "context/userContext";
import dayjs from "dayjs";
import firebase from "firebase/clientApp";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ActivityStatus from "../interfaces/ActivityStatus";
import Confirm from "./Confirm";

export default function MarkAsDone({
  status,
  id,
  checkedList = [],
}: {
  status: ActivityStatus;
  id: string;
  checkedList: string[];
}) {
  const {
    user: { uid },
  } = useUser();
  const markAsDone = () => {
    const db = firebase.firestore();
    db.doc(`users/${uid}/activities/${id}`)
      .update({
        checkedList: [...checkedList, dayjs().toString()],
      })
      .then(() => toast.info("Activity completed"));
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
