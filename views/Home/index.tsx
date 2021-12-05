import { Masonry } from "@mui/lab";
import ActivityCard from "components/ActivityCard";
import { useUser } from "context/userContext";
import useActivities from "hooks/useActivities";
import Layout from "views/Layout";
import filterTodo from "./filterTodo";

export default function Home() {
  const {
    user: { uid },
  } = useUser();
  const { loading, error, activities } = useActivities(uid);
  if (loading) return <Layout>Loading activities. Uid: {uid}</Layout>;
  if (error) return <Layout>Error</Layout>;
  if (activities.length) {
    const { completed, todo, upcoming } = filterTodo(activities);
    if (todo.length)
      return (
        <div>
          <div>
            <h4>Todo</h4>
            <Masonry>
              {todo.map((item) => (
                <ActivityCard activity={item} status="todo" key={item.id} />
              ))}
            </Masonry>
          </div>
          <div>
            <h4>Completed</h4>
            <Masonry>
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
            <Masonry>
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
