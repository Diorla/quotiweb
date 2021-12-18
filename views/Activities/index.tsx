import { Masonry } from "@mui/lab";
import ActivityCard from "components/ActivityCard";
import CardSkeleton from "components/CardSkeleton";
import masonryColumns from "constants/masonryColumns";
import { useActivities } from "context/activityContext";
import Activity from "interfaces/Activity";

const getOccurrence = (activity: Activity) => {
  const { repeat, repeatCount } = activity;
  if (repeat === "day") return 365.25 / repeatCount;
  if (repeat === "week") return 52 / repeatCount;
  if (repeat === "month") return 12 / repeatCount;
  if (repeat === "year") return 1 / repeatCount;
  return 1;
};

const sortByOccurrence = (prev: Activity, next: Activity) => {
  return getOccurrence(next) - getOccurrence(prev);
};

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
      {activityList.sort(sortByOccurrence).map((item) => (
        <ActivityCard activity={item} key={item.id} />
      ))}
    </Masonry>
  );
}
