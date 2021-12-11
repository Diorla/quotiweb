import { Masonry } from "@mui/lab";
import ActivityCard from "components/ActivityCard";
import CardSkeleton from "components/CardSkeleton";
import masonryColumns from "constants/masonryColumns";
import { useActivities } from "context/activityContext";

export default function Activities() {
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
  return (
    <Masonry columns={masonryColumns}>
      {activityList.map((item) => (
        <ActivityCard activity={item} key={item.id} />
      ))}
    </Masonry>
  );
}
