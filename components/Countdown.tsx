import dayjs from "dayjs";
import ReactCountdown from "react-countdown";
import convertMsToHMS from "scripts/convertMSToHMS";
import firebase from "firebase/clientApp";
import { useUser } from "context/userContext";
import { toast } from "react-toastify";
import timePad from "scripts/timePad";
import { useActivities } from "context/activityContext";
import currentRecordKey from "constants/currentRecordKey";
import getValueRemaining from "views/Home/getValueRemaining";

const Completed = () => {
  return <span>You are good to go!</span>;
};

export interface timeRendererProps {
  hours: any;
  minutes: any;
  seconds: any;
  completed: boolean;
  checkedList: string[];
}

const Renderer = ({
  hours,
  minutes,
  seconds,
  completed,
  checkedList,
}: timeRendererProps) => {
  const {
    user: { uid, runningId },
  } = useUser();
  const { activityMap } = useActivities();
  const onComplete = () => {
    const activity = activityMap[runningId] || {};

    const { timeRecord = {} } = activity;
    const db = firebase.firestore();
    const batch = db.batch();

    const userRef = db.collection("users").doc(uid);

    const taskRef = db.doc(`users/${uid}/activities/${runningId}`);

    const totalDuration = getValueRemaining(activity);

    const currentTime = timeRecord[currentRecordKey] || 0;
    batch.update(userRef, { runningId: "", runningTaskStartTime: "" });
    batch.update(taskRef, {
      timeRecord: {
        ...timeRecord,
        [currentRecordKey]: totalDuration + currentTime,
      },
      updated: dayjs().toString(),
      checkedList: [...checkedList, dayjs().toString()],
    });

    batch.commit().then(() => toast.info("Task completed"));
  };
  if (completed) {
    const lastDay = checkedList[checkedList.length - 1];
    if (!(lastDay && dayjs(lastDay).isToday())) onComplete();
    return <Completed />;
  } else {
    return (
      <span>
        {timePad(hours)}:{timePad(minutes)}:{timePad(seconds)}
      </span>
    );
  }
};

export default function Countdown({
  timeLeft,
  running,
  startTime,
  checkedList,
}: {
  startTime: string;
  timeLeft: number;
  running: boolean;
  checkedList: string[];
}) {
  const { hh, mm, ss } = convertMsToHMS(timeLeft);
  if (!running)
    return (
      <div>
        {hh}:{mm}:{ss}
      </div>
    );
  return (
    <ReactCountdown
      date={dayjs(startTime).add(timeLeft, "milliseconds").valueOf()}
      zeroPadTime={2}
      renderer={(props) => <Renderer checkedList={checkedList} {...props} />}
    />
  );
}
