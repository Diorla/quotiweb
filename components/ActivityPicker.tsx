import Activity from "interfaces/Activity";
import Picker, { ItemProps } from "./Picker";

export default function ActivityPicker({
  value,
  handleChange,
  loading,
  error,
  list,
}: {
  value: string;
  loading: boolean;
  error: Error | null;
  list: ItemProps[];
  handleChange: (val: string) => void;
}) {
  if (loading) return <div>Loading activities</div>;
  if (error) return <div>Error loading activities</div>;
  if (list.length)
    return (
      <Picker
        label="Activity"
        value={value}
        handleChange={handleChange}
        list={list}
      />
    );
  return <div>No activities found</div>;
}
