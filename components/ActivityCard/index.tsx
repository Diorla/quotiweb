import { Box, Card, Typography, Modal } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import isToday from "dayjs/plugin/isToday";
import ActivityStatus from "interfaces/ActivityStatus";
import MarkAsDone from "./MarkAsDone";
import Link from "../Link";
import ScheduleRender from "./ScheduleRender";
import ExtendedActivity from "interfaces/ExtendedActivity";
import { useUser } from "context/userContext";
import MoreMenu from "./MoreMenu";
import { useState } from "react";
import convertMsToHMS from "scripts/convertMSToHMS";
import increaseQuantity from "services/increaseQuantity";
import { toast } from "react-toastify";
import pauseActivity from "services/pauseActivity";
import PushPinIcon from "@mui/icons-material/PushPin";
import AddTimeModal from "./AddTimeModal";
import togglePin from "./togglePin";
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
    user,
    user: { runningId, uid },
  } = useUser();
  const { name, id, slug, categoryName, color, schedule, unit, isPinned } =
    activity;
  const [input, setInput] = useState({
    visible: false,
    max: 0,
    value: 0,
  });

  const showAddModal = () => {
    setInput({
      value: 0,
      visible: true,
      max: remaining,
    });
  };
  const addValue = (val: number) => {
    if (schedule === "quantity")
      increaseQuantity(
        activity,
        uid,
        () => {
          toast.info(`${val} ${unit} added`);
          setInput({
            visible: false,
            max: 0,
            value: 0,
          });
        },
        val
      );
    else {
      const { hh, mm, ss } = convertMsToHMS(val);
      pauseActivity({ ...user, runningId: id }, activity, "", val, () => {
        toast.info(`${hh}:${mm}:${ss} added`);
        setInput({
          visible: false,
          max: 0,
          value: 0,
        });
      });
    }
  };
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
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <MarkAsDone status={status} activity={activity} />
          {isPinned && (
            <PushPinIcon
              sx={{ color: "primary.main" }}
              onClick={() => togglePin(uid, activity)}
            />
          )}
          <Link
            href={`/activity/${slug}`}
            sx={{ color: "black", textDecoration: "none" }}
          >
            {name}
          </Link>
        </Box>
        {status === "todo" ? (
          <MoreMenu
            activity={activity}
            status={status}
            remaining={remaining}
            showAddModal={showAddModal}
          />
        ) : null}
      </Typography>
      <Typography>{categoryName}</Typography>
      <Modal
        open={input.visible}
        onClose={() => setInput({ ...input, visible: false })}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            background: "white",
            minWidth: 240,
            padding: 8,
          }}
        >
          <AddTimeModal
            visible={input.visible}
            onSave={(val) => addValue(val)}
            onCancel={() => setInput({ ...input, visible: false })}
            max={input.max}
            unit={activity.unit}
            type={schedule === "quantity" ? "quantity" : "duration"}
          />
        </Box>
      </Modal>
      <ScheduleRender
        activity={activity}
        status={status}
        dueDate={dueDate}
        remaining={remaining}
      />
    </Card>
  );
}
