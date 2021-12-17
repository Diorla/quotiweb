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
}: {
  activity: Activity;
  status: ActivityStatus;
}) => {
  const {
    user: { uid },
  } = useUser();
  const postponeActivity = () => {
    const { id } = activity;
    const date = dayjs().add(1, "day").toString();
    updateActivity(uid, { id, postponeDate: date }, () =>
      toast.success(`${activity.name} postponed`)
    );
  };
  if (status === "todo") {
    return <MenuItem onClick={postponeActivity}>Postpone</MenuItem>;
  }
  return null;
};
