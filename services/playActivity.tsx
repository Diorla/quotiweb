import dayjs from "dayjs";
import firebase from "firebase/clientApp";
import Activity from "interfaces/Activity";
import UserProps from "context/userContext/UserProps";
import pauseActivity from "./pauseActivity";

export default function playActivity(user: UserProps, activity: Activity) {
  const { uid, runningId } = user;
  const { id } = activity;
  const db = firebase.firestore();
  if (runningId) pauseActivity(user, activity, id);
  else
    db.collection("users")
      .doc(uid)
      .update({ runningId: id, runningTaskStartTime: dayjs().toString() });
}
