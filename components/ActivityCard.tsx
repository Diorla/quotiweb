import { Box, Card, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import Activity from "interfaces/Activity";
import isToday from "dayjs/plugin/isToday";
import ActivityStatus from "../interfaces/ActivityStatus";
import MarkAsDone from "./MarkAsDone";
import Link from "./Link";
import ScheduleRender from "./ScheduleRender";
import { ExtendedActivity } from "views/Home/filterTodo";
import { useUser } from "context/userContext";
dayjs.extend(isToday);

export default function ActivityCard({
  activity,
  status = "none",
  dueDate = dayjs(),
  remaining = 0,
}: {
  activity: ExtendedActivity;
  status?: ActivityStatus;
  dueDate?: Dayjs;
  remaining?: number;
}) {
  const {
    user: { runningId },
  } = useUser();
  const { name, id, checkedList, slug, categoryName, color } = activity;
  return (
    <Card
      sx={{
        padding: 1,
        minWidth: 240,
        border:
          runningId === id ? `1px solid ${color}` : `1px solid transparent`,
        backgroundColor: runningId === id ? `${color}1a` : "transparent",
      }}
    >
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
      <Typography>{categoryName}</Typography>
      <ScheduleRender
        activity={activity}
        status={status}
        dueDate={dueDate}
        remaining={remaining}
      />
    </Card>
  );
}
