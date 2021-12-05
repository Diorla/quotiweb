import { Masonry } from "@mui/lab";
import ActivityCard from "components/ActivityCard";
import { useUser } from "context/userContext";
import useActivities from "hooks/useActivities";

export default function Activities() {
  const {
    user: { uid },
  } = useUser();
  const { loading, error, activities } = useActivities(uid);
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  return (
    <Masonry>
      {activities.map((item) => (
        <ActivityCard activity={item} key={item.id} />
      ))}
    </Masonry>
  );
}
