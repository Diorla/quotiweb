import dayjs from "dayjs";
import firebase from "firebase/clientApp";
import currentRecordKey from "constants/currentRecordKey";
import Activity from "interfaces/Activity";
import UserProps from "context/userContext/UserProps";
import getDuration from "scripts/getDuration";

export default function pauseActivity(
  user: UserProps,
  activity: Activity,
  newId = "",
  value?: number,
  callback?: () => void
) {
  const db = firebase.firestore();
  const batch = db.batch();

  const { uid, runningId, runningTaskStartTime } = user;
  const { timeRecord, checkedList } = activity;
  const userRef = db.collection("users").doc(uid);

  const taskRef = db.doc(`users/${uid}/activities/${runningId}`);

  const increment = value ?? dayjs().diff(runningTaskStartTime, "milliseconds");
  const currentTime = timeRecord[currentRecordKey] || 0;
  const tempCheckedList = [...checkedList];
  const totalTime = increment + currentTime;
  const duration = getDuration(activity);

  if (duration <= totalTime) tempCheckedList.push(dayjs().toString());

  batch.update(userRef, {
    runningId: newId,
    runningTaskStartTime: newId ? dayjs().toString() : "",
  });
  batch.update(taskRef, {
    timeRecord: {
      ...timeRecord,
      [currentRecordKey]: increment + currentTime,
    },
    checkedList: tempCheckedList,
    updated: dayjs().toString(),
  });

  batch.commit().then(() => callback && callback());
}
