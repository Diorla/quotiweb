import { useEffect, useState } from "react";
import firebase from "firebase/clientApp";
import Activity from "interfaces/Activity";

export default function useActivities(userId: string, categoryId?: string) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const load = () => {
    const db = firebase.firestore();
    const collectionRef = categoryId
      ? db
          .collection(`users/${userId}/activities`)
          .orderBy("name", "asc")
          .where("category", "==", categoryId)
      : db.collection(`users/${userId}/activities`).orderBy("name", "asc");
    collectionRef.onSnapshot((querySnapshot) => {
      const activityList: Activity[] = [];
      querySnapshot.forEach(
        (doc: any) => {
          activityList.push(doc.data());
        },
        (error: any) => setError(error)
      );
      setActivities(activityList);
      setLoading(false);
    });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) load();
    return () => {
      mounted = false;
    };
  }, []);
  return { activities, loading, error };
}
