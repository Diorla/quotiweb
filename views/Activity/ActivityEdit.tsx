import styled from "@emotion/styled";
import { Grid, SxProps, TextField, Typography } from "@mui/material";
import { useUser } from "context/userContext";
import Activity, {
  reminderType,
  repeatType,
  scheduleType,
} from "interfaces/Activity";
import { useState } from "react";
import FormWrapper from "../../components/FormWrapper";
import FormButton from "../../components/FormButton";
import Picker from "components/Picker";
import TimePicker from "@mui/lab/TimePicker";
import timeToDayJS from "scripts/timeToDayJS";
import dayjs from "dayjs";
import dayjsToTime from "scripts/dayjsToTime";
import dayjsToMS from "scripts/dayjsToMs";
import msToDayJS from "scripts/msToDayJS";
import { DatePicker } from "@mui/lab";
import WeekDayPicker from "components/WeekDayPicker";
import ActivityPicker from "components/ActivityPicker";
import updateActivity from "services/updateActivity";
import { useCategories } from "context/categoryContext";
import { useActivities } from "context/activityContext";

const InputColor = styled.input`
  border: none;
  padding: 0;
`;

const scheduleList: scheduleType[] = ["time", "duration", "quantity"];
const reminderList: reminderType[] = [
  "morning",
  "afternoon",
  "evening",
  "night",
];

const repeatList: repeatType[] = [
  "day",
  "week",
  "month",
  "year",
  "category",
  "activity",
];
export default function ActivityEdit({
  closeForm,
  initialValue,
}: {
  closeForm: () => void;
  initialValue: Activity;
}) {
  const {
    user: { uid },
  } = useUser();
  const styles: SxProps = {
    h1: {
      textAlign: "center",
    },
    grid: {
      flexDirection: "column",
      display: "flex",
    },
  };

  const { categoryList, loading, error: err } = useCategories();

  const {
    loading: activityLoading,
    error: activityError,
    activityList,
  } = useActivities();
  const submit = () => {
    if (activity.name && activity.category)
      updateActivity(uid, activity, closeForm);
    else if (activity.name) {
      setCatError("Please select a category");
    } else setError("Please provide a name");
  };

  const [error, setError] = useState("");
  const [catError, setCatError] = useState("");
  const [activity, setActivity] = useState<Activity>({ ...initialValue });
  if (err) return <div>Error fetching Categories</div>;
  if (loading) return <div>Loading Categories</div>;
  if (!categoryList.length) return <div>Please create category first</div>;
  return (
    <FormWrapper elevation={1}>
      <Typography variant="h4" sx={styles.h1}>
        New Activity
      </Typography>
      <Grid sx={styles.grid}>
        <TextField
          id="name"
          label="Name"
          variant="standard"
          value={activity.name}
          onChange={(e) => {
            setActivity({
              ...activity,
              name: e.target.value,
            });
            if (error && activity.name) setError("");
          }}
        />
        <Typography color="error" variant="subtitle2">
          {error}
        </Typography>
        <Picker
          label="Category"
          value={activity.category}
          handleChange={(category) => {
            setActivity({
              ...activity,
              category,
            });
            if (catError) setCatError("");
          }}
          list={categoryList.map((item) => {
            return {
              label: item.name,
              value: item.id,
            };
          })}
        />
        <Typography color="error" variant="subtitle2">
          {catError}
        </Typography>
        <DatePicker
          label="Start date"
          minDate={dayjs(activity.created)}
          value={activity.startDate}
          onChange={(newValue) => {
            setActivity({
              ...activity,
              startDate: dayjs(newValue).toString(),
            });
          }}
          renderInput={(params) => (
            <TextField {...params} variant="standard" sx={{ mr: 4 }} />
          )}
        />
        <Picker
          label="Schedule"
          value={activity.schedule}
          handleChange={(schedule) =>
            setActivity({
              ...activity,
              schedule: schedule as scheduleType,
            })
          }
          list={scheduleList.map((item) => {
            return {
              label: item,
              value: item,
            };
          })}
        />
        {activity.schedule === "time" && (
          <Grid
            sx={{
              flexDirection: "row",
              alignItems: "center",
              display: "flex",
              marginTop: 1,
            }}
          >
            <TimePicker
              ampm={false}
              openTo="hours"
              views={["hours", "minutes"]}
              inputFormat="HH:mm"
              label="Start"
              mask="__:__"
              value={timeToDayJS(activity.startTime)}
              onChange={(newValue) => {
                setActivity({
                  ...activity,
                  startTime: dayjsToTime(newValue),
                });
              }}
              renderInput={(params) => (
                <TextField {...params} variant="standard" sx={{ mr: 4 }} />
              )}
            />
            <TimePicker
              label="End"
              ampm={false}
              openTo="hours"
              views={["hours", "minutes"]}
              inputFormat="HH:mm"
              mask="__:__"
              value={timeToDayJS(activity.endTime)}
              onChange={(newValue) => {
                setActivity({
                  ...activity,
                  endTime: dayjsToTime(newValue),
                });
              }}
              renderInput={(params) => (
                <TextField {...params} variant="standard" />
              )}
            />
          </Grid>
        )}
        {activity.schedule === "duration" && (
          <Grid
            sx={{
              flexDirection: "row",
              alignItems: "center",
              display: "flex",
              marginTop: 1,
            }}
          >
            <TimePicker
              ampm={false}
              openTo="hours"
              views={["hours", "minutes", "seconds"]}
              inputFormat="HH:mm:ss"
              mask="__:__:__"
              label="Duration"
              value={msToDayJS(activity.duration)}
              onChange={(newValue) => {
                setActivity({
                  ...activity,
                  duration: dayjsToMS(newValue),
                });
              }}
              renderInput={(params) => (
                <TextField {...params} variant="standard" />
              )}
            />
          </Grid>
        )}
        {activity.schedule === "quantity" && (
          <Grid sx={{ flexDirection: "row", alignItems: "center" }}>
            <TextField
              id="quantity"
              label="Quantity"
              variant="standard"
              type="number"
              value={activity.quantity}
              onChange={(e) =>
                setActivity({
                  ...activity,
                  quantity: Number(e.target.value),
                })
              }
            />
            <TextField
              id="unit"
              label="Unit"
              variant="standard"
              value={activity.unit}
              onChange={(e) =>
                setActivity({
                  ...activity,
                  unit: e.target.value,
                })
              }
            />
          </Grid>
        )}
        <Picker
          label="Reminder"
          value={activity.reminder}
          handleChange={(reminder) =>
            setActivity({
              ...activity,
              reminder: reminder as reminderType,
            })
          }
          list={reminderList.map((item) => {
            return {
              label: item,
              value: item,
            };
          })}
        />
        <Grid
          sx={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            marginTop: 1,
            marginBottom: 1,
          }}
        >
          <TextField
            id="Every"
            label="Every"
            variant="standard"
            type="number"
            sx={{ mt: 1 }}
            value={activity.repeatCount}
            onChange={(e) =>
              setActivity({
                ...activity,
                repeatCount: Math.abs(Number(e.target.value)),
              })
            }
          />
          <Picker
            label="Repeat"
            noDefault
            value={activity.repeat}
            handleChange={(repeat) =>
              setActivity({
                ...activity,
                repeat: repeat as repeatType,
                repeatId: "",
              })
            }
            list={repeatList.map((item) => {
              return {
                label: item,
                value: item,
              };
            })}
          />
        </Grid>
        {activity.repeat === "week" && (
          <WeekDayPicker
            value={activity.daysOfWeek}
            onChange={(daysOfWeek) =>
              setActivity({
                ...activity,
                daysOfWeek,
              })
            }
          />
        )}
        {activity.repeat === "category" && (
          <Picker
            label="Category"
            value={activity.repeatId}
            handleChange={(repeatId) =>
              setActivity({
                ...activity,
                repeatId,
              })
            }
            list={categoryList.map((item) => {
              return {
                label: item.name,
                value: item.id,
              };
            })}
          />
        )}
        {activity.repeat === "activity" && (
          <ActivityPicker
            value={activity.repeatId}
            handleChange={(repeatId) =>
              setActivity({
                ...activity,
                repeatId,
              })
            }
            loading={activityLoading}
            error={activityError}
            list={activityList.map((item) => {
              return {
                label: item.name,
                value: item.id,
              };
            })}
          />
        )}
        <Grid
          sx={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            marginTop: 1,
            marginBottom: 1,
          }}
        >
          <label htmlFor="color">Select Color: </label>
          <InputColor
            id="color"
            onChange={(e) =>
              setActivity({
                ...activity,
                color: e.target.value,
              })
            }
            value={activity.color}
            type="color"
          />
        </Grid>
        <FormButton cancel={closeForm} accept={submit} />
      </Grid>
    </FormWrapper>
  );
}
