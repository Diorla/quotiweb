import { Card, Typography } from "@mui/material";
import dayjs from "dayjs";
import Activity from "interfaces/Activity";
import isToday from "dayjs/plugin/isToday";
import ActivityStatus from "../interfaces/ActivityStatus";
import MarkAsDone from "./MarkAsDone";
import Link from "./Link";
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
    quantityRecord = {},
    timeRecord = {},
    repeat,
    repeatCount,
    slug,
  } = activity;
  return (
    <Card sx={{ padding: 1, minWidth: 240 }}>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <MarkAsDone status={status} id={id} checkedList={checkedList} />
        <Link
          href={`/activity/${slug}`}
          sx={{ color: "black", textDecoration: "none" }}
        >
          {name}
        </Link>
      </Typography>
    </Card>
  );
}
