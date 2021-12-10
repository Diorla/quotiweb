import { Card, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import UpdateIcon from "@mui/icons-material/Update";
import isToday from "dayjs/plugin/isToday";
import ActivityStatus from "../interfaces/ActivityStatus";
import MarkAsDone from "./MarkAsDone";
import Link from "./Link";
import ScheduleRender from "./ScheduleRender";
import { ExtendedActivity } from "views/Home/filterTodo";
import { useUser } from "context/userContext";
import Activity from "interfaces/Activity";
import timeToDayJS from "scripts/timeToDayJS";
import updateActivity from "services/updateActivity";
import { toast } from "react-toastify";
dayjs.extend(isToday);

const Postpone = ({
  activity,
  status,
  remaining = 0,
}: {
  activity: Activity;
  status: ActivityStatus;
  remaining?: number;
}) => {
  const {
    schedule,
    quantity = 0,
    startTime = "",
    endTime = "",
    duration = 0,
    name,
  } = activity;

  const {
    user: { uid },
  } = useUser();
  const postponeActivity = () => {
    const date = dayjs().add(1, "day").toString();
    updateActivity(uid, { ...activity, postponeDate: date }, () =>
      toast.success(`Activity updated`)
    );
  };
  if (status === "todo") {
    if (schedule === "quantity" && quantity <= remaining) {
      return <UpdateIcon onClick={postponeActivity} />;
    }
    if (schedule === "duration" && duration <= remaining) {
      console.log({ duration, remaining, name });
      return <UpdateIcon onClick={postponeActivity} />;
    }
    const timeLength = Math.abs(
      timeToDayJS(startTime).diff(timeToDayJS(endTime), "millisecond")
    );
    if (timeLength <= remaining) {
      return <UpdateIcon onClick={postponeActivity} />;
    }
  }
  return null;
};

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
        <Postpone activity={activity} status={status} remaining={remaining} />
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
