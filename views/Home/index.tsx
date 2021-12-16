import { Masonry } from "@mui/lab";
import ActivityCard from "components/ActivityCard";
import masonryColumns from "constants/masonryColumns";
import { useActivities } from "context/activityContext";
import { useCategories } from "context/categoryContext";
import convertMsToHMS from "scripts/convertMSToHMS";
import filterTodo, { ExtendedActivity } from "./filterTodo";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import LineWeightIcon from "@mui/icons-material/LineWeight";
import { Grid } from "@mui/material";
import CardSkeleton from "components/CardSkeleton";
import dayjs from "dayjs";

const sortByDate = (a: ExtendedActivity, b: ExtendedActivity) => {
  const initDueDate = a.dueDate ?? dayjs();
  const nextDueDate = b.dueDate ?? dayjs();
  return initDueDate.valueOf() - nextDueDate.valueOf();
};
export default function Home() {
  const { categoryMap } = useCategories();
  const { loading, error, activityList } = useActivities();
  if (loading) {
    const list: any[] = [];
    list.length = 10;
    list.fill("");
    return (
      <Masonry columns={masonryColumns}>
        {list.map((_item, idx) => (
          <CardSkeleton key={idx} />
        ))}
      </Masonry>
    );
  }
  if (error) return <div>Error</div>;
  if (activityList.length) {
    const { completed, todo, upcoming, totalQuantity, totalTime } = filterTodo(
      activityList,
      categoryMap
    );
    const { hh, mm, ss } = convertMsToHMS(totalTime);
    if (todo.length)
      return (
        <div>
          <Grid
            sx={{
              alignItems: "center",
              flexDirection: "row",
              display: "flex",
              fontSize: 18,
            }}
          >
            <Grid
              sx={{
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
                marginRight: 8,
              }}
            >
              <HourglassTopIcon /> {hh}:{mm}:{ss}
            </Grid>
            <Grid
              sx={{
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
              }}
            >
              <LineWeightIcon /> {totalQuantity}
            </Grid>
          </Grid>
          <div>
            <h4>Todo</h4>
            <Masonry columns={masonryColumns}>
              {todo
                .sort((a, b) => b.priority - a.priority)
                .map((item) => (
                  <ActivityCard
                    activity={item}
                    status="todo"
                    key={item.id}
                    remaining={item.remaining}
                  />
                ))}
            </Masonry>
          </div>
          <div>
            <h4>Completed</h4>
            <Masonry columns={masonryColumns}>
              {completed.map((item) => (
                <ActivityCard
                  activity={item}
                  status="completed"
                  key={item.id}
                />
              ))}
            </Masonry>
          </div>
          <div>
            <h4>Upcoming</h4>
            <Masonry columns={masonryColumns}>
              {upcoming.sort(sortByDate).map((item) => (
                <ActivityCard
                  activity={item}
                  status="upcoming"
                  key={item.id}
                  dueDate={item.dueDate}
                />
              ))}
            </Masonry>
          </div>
        </div>
      );
    return <div>All done for today</div>;
  }
  return <div>No activityList created yet</div>;
}
