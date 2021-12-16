import dayjs from "dayjs";
import ActivityStatus from "interfaces/ActivityStatus";
import { useUser } from "context/userContext";
import Activity from "interfaces/Activity";
import timeToDayJS from "scripts/timeToDayJS";
import updateActivity from "services/updateActivity";
import { toast } from "react-toastify";
import { MenuItem } from "@mui/material";

export const Postpone = ({
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
  } = activity;

  const {
    user: { uid },
  } = useUser();
  const postponeActivity = () => {
    const date = dayjs().add(1, "day").toString();
    updateActivity(uid, { ...activity, postponeDate: date }, () =>
      toast.success(`${activity.name} postponed`)
    );
  };
  if (status === "todo") {
    if (schedule === "quantity" && quantity <= remaining) {
      return <MenuItem onClick={postponeActivity}>Postpone</MenuItem>;
    }
    if (schedule === "duration" && duration <= remaining) {
      return <MenuItem onClick={postponeActivity}>Postpone</MenuItem>;
    }
    const timeLength = Math.abs(
      timeToDayJS(startTime).diff(timeToDayJS(endTime), "millisecond")
    );
    if (timeLength <= remaining) {
      return <MenuItem onClick={postponeActivity}>Postpone</MenuItem>;
    }
  }
  return null;
};
