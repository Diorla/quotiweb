import Activity from "interfaces/Activity";

export default interface ActivitiesProps {
  activityList: Activity[];
  activityMap: {
    [key: string]: Activity;
  };
  loading: boolean;
  error: null | Error;
}
