import React, { useState, useEffect, createContext, useContext } from "react";
import ActivitiesProps from "./ActivitiesProps";
import { useUser } from "context/userContext";
import getActivities from "./getActivities";
import Activity from "interfaces/Activity";

export const ActivitiesContext = createContext<ActivitiesProps>({
  loading: true,
  error: null,
  activityList: [],
  activityMap: {},
});

export default function ActivitiesProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [activityList, setActivityList] = useState<Activity[]>([]);
  const [activityMap, setActivityMap] = useState({});
  const [loading, setLoading] = useState(true);
  const {
    user: { uid },
  } = useUser();
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    let mounted = true;
    if (mounted && uid)
      getActivities(uid, setActivityList, setActivityMap, setLoading, setError);
    return () => {
      mounted = false;
    };
  }, [uid]);

  return (
    <ActivitiesContext.Provider
      value={{ activityList, activityMap, loading, error }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}

export const useActivities = (): ActivitiesProps =>
  useContext<ActivitiesProps>(ActivitiesContext);
