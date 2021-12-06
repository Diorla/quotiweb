import { Masonry } from "@mui/lab";
import ActivityCard from "components/ActivityCard";
import masonryColumns from "constants/masonryColumns";
import { useUser } from "context/userContext";
import useActivities from "hooks/useActivities";
import filterTodo from "./filterTodo";

export default function Home() {
  const {
    user: { uid },
  } = useUser();
  const { loading, error, activities } = useActivities(uid);
  if (loading) return <div>Loading activities. Uid: {uid}</div>;
  if (error) return <div>Error</div>;
  if (activities.length) {
    const { completed, todo, upcoming } = filterTodo(activities);
    if (todo.length)
      return (
        <div>
          <div>
            <h4>Todo</h4>
            <Masonry columns={masonryColumns}>
              {todo.map((item) => (
                <ActivityCard activity={item} status="todo" key={item.id} />
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
              {upcoming.map((item) => (
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
  return <div>No activities created yet</div>;
}
