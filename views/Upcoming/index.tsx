import { Masonry } from "@mui/lab";
import ActivityCard from "components/ActivityCard";
import masonryColumns from "constants/masonryColumns";
import { useActivities } from "context/activityContext";
import { useCategories } from "context/categoryContext";
import filterTodo from "./filterTodo";
import CardSkeleton from "components/CardSkeleton";
import sortByDate from "./sortByDate";

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
    const { upcoming, noDueDate } = filterTodo(activityList, categoryMap);
    if (upcoming.length + noDueDate.length)
      return (
        <div>
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
          <div>
            <h4>No due date</h4>
            <Masonry columns={masonryColumns}>
              {noDueDate.sort(sortByDate).map((item) => (
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
