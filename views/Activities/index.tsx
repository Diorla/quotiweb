import { Masonry } from "@mui/lab";
import ActivityCard from "components/ActivityCard";
import { useActivities } from "context/activityContext";

export default function Activities() {
  const { loading, error, activityList } = useActivities();
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  return (
    <Masonry>
      {activityList.map((item) => (
        <ActivityCard activity={item} key={item.id} />
      ))}
    </Masonry>
  );
}
