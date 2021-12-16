import { Box, Button, Card, TextField, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import isToday from "dayjs/plugin/isToday";
import ActivityStatus from "interfaces/ActivityStatus";
import MarkAsDone from "./MarkAsDone";
import Link from "../Link";
import ScheduleRender from "./ScheduleRender";
import { ExtendedActivity } from "views/Home/filterTodo";
import { useUser } from "context/userContext";
import MoreMenu from "./MoreMenu";
import { useState } from "react";
import convertMsToHMS from "scripts/convertMSToHMS";
import convertHMSToMs from "scripts/convertHMSToMS";
import increaseQuantity from "services/increaseQuantity";
import { toast } from "react-toastify";
import pauseActivity from "services/pauseActivity";
dayjs.extend(isToday);

const InputForm = ({
  onCancel,
  onSave,
  max,
  type,
  visible,
}: {
  onSave: (val: number) => void;
  onCancel: () => void;
  max: number;
  type: "quantity" | "duration";
  visible: boolean;
}) => {
  const [input, setInput] = useState(0);
  const updateTime = (val: any, type: "h" | "m" | "s") => {
    const { hh, mm, ss } = convertMsToHMS(input, true);
    let newValue = 0;
    if (type === "h")
      newValue += convertHMSToMs({
        hh: val,
        mm,
        ss,
      });
    else if (type === "m")
      newValue += convertHMSToMs({
        hh,
        mm: val,
        ss,
      });
    else
      newValue += convertHMSToMs({
        hh,
        mm,
        ss: val,
      });
    if (max < Math.abs(newValue)) {
      setInput(max);
    } else setInput(Math.abs(newValue));
  };
  if (input > max) setInput(max);
  if (!visible) return null;
  if (type === "quantity")
    return (
      <Box>
        <TextField
          type="number"
          value={input}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (max < val) setInput(max);
            else setInput(val);
          }}
        />
        <Box>
          <Button
            onClick={() => {
              onCancel();
              setInput(0);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave(input);
              setInput(0);
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    );
  const { hh, mm, ss } = convertMsToHMS(input, true);
  return (
    <Box>
      <Box>
        <TextField
          type="number"
          value={hh}
          onChange={(e) => updateTime(Number(e.target.value), "h")}
        />
        <TextField
          type="number"
          value={mm}
          onChange={(e) => updateTime(Number(e.target.value), "m")}
        />
        <TextField
          type="number"
          value={ss}
          onChange={(e) => updateTime(Number(e.target.value), "s")}
        />
      </Box>
      <Box>
        <Button onClick={() => onCancel()}>Cancel</Button>
        <Button onClick={() => onSave(input + 1)}>Save</Button>
      </Box>
    </Box>
  );
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
    user,
    user: { runningId, uid },
  } = useUser();
  const { name, id, checkedList, slug, categoryName, color, schedule, unit } =
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
    // addValue;
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
          <MarkAsDone status={status} id={id} checkedList={checkedList} />
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
      <InputForm
        visible={input.visible}
        onSave={(val) => addValue(val)}
        onCancel={() => setInput({ ...input, visible: false })}
        max={input.max}
        type={schedule === "quantity" ? "quantity" : "duration"}
      />
      <ScheduleRender
        activity={activity}
        status={status}
        dueDate={dueDate}
        remaining={remaining}
      />
    </Card>
  );
}
