import firebase from "firebase/clientApp";
import Activity from "interfaces/Activity";
import { toast } from "react-toastify";

export default function updateActivity(
  userId: string,
  activity: Activity,
  callback: () => void
) {
  const db = firebase.firestore();
  const { id } = activity;
  db.doc(`users/${userId}/activities/${id}`)
    .set({
      ...activity,
      id,
      updated: new Date().toString(),
    })
    .then(() => toast.success("Activity updated"))
    .then(callback)
    .catch((err) => toast.error(err.message));
}
