import firebase from "firebase/clientApp";
import Activity from "interfaces/Activity";

export default async function getActivities(
  userId: string,
  setActivityList: (arg0: Activity[]) => void,
  setActivityMap: (arg: { [key: string]: Activity }) => void,
  setLoading: (isLoading: boolean) => void,
  setError: (error: Error) => void
) {
  try {
    const db = firebase.firestore();
    const activityMap: { [key: string]: Activity } = {};
    const collectionRef = db
      .collection(`users/${userId}/activities`)
      .orderBy("name", "asc");
    collectionRef.onSnapshot((querySnapshot) => {
      const activityList: Activity[] = [];
      querySnapshot.forEach((doc: any) => {
        activityList.push(doc.data());
      });
      activityList.forEach((item) => {
        const { id } = item;
        activityMap[id] = item;
      });
      setActivityList(activityList);
      setActivityMap(activityMap);
      setLoading(false);
    });
  } catch (err) {
    setError(err as Error);
  }
}
