import { Card, Typography } from "@mui/material";
import dayjs from "dayjs";
import Activity from "interfaces/Activity";
import isToday from "dayjs/plugin/isToday";
import ActivityStatus from "../interfaces/ActivityStatus";
import ScheduleComponent from "./ScheduleComponent";
import MarkAsDone from "./MarkAsDone";
dayjs.extend(isToday);

export default function ActivityCard({
  activity,
  status = "none",
  dueDate = dayjs().valueOf(),
}: {
  activity: Activity;
  status?: ActivityStatus;
  dueDate?: number;
}) {
  const {
    name,
    schedule,
    id,
    checkedList,
    quantity,
    duration,
    startTime,
    endTime,
    unit,
    currentQuantity,
    currentTime,
    updated,
  } = activity;
  return (
    <Card sx={{ padding: 1, minWidth: 300 }}>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <MarkAsDone status={status} id={id} checkedList={checkedList} />
        {name}
      </Typography>
      <ScheduleComponent
        schedule={schedule}
        status={status}
        dueDate={dueDate}
        quantity={quantity}
        duration={duration}
        startTime={startTime}
        endTime={endTime}
        unit={unit}
        currentQuantity={currentQuantity}
        currentTime={currentTime}
        updated={updated}
        id={id}
        checkedList={checkedList}
      />
    </Card>
  );
}
