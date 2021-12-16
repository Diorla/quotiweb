import firebase from "firebase/clientApp";
import Activity from "interfaces/Activity";
import { toast } from "react-toastify";

export interface updateActivityProps extends Partial<Activity> {
  id: string;
}
export default function updateActivity(
  userId: string,
  activity: updateActivityProps,
  callback: () => void
) {
  const db = firebase.firestore();
  const { id } = activity;
  db.doc(`users/${userId}/activities/${id}`)
    .update({
      ...activity,
      id,
      updated: new Date().toString(),
    })
    .then(callback)
    .catch((err) => toast.error(err.message));
}
