import firebase from "firebase/clientApp";
import Activity from "interfaces/Activity";
import { toast } from "react-toastify";
import { v4 } from "uuid";

export default function createActivity(
  userId: string,
  Activity: Activity,
  callback: () => void
) {
  const db = firebase.firestore();
  const id = v4();
  db.doc(`users/${userId}/activities/${id}`)
    .set({
      ...Activity,
      id,
      created: new Date().toString(),
    })
    .then(() => toast.success("Activity created"))
    .then(callback)
    .catch((err) => toast.error(err.message));
}
