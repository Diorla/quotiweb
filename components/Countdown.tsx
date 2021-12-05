import dayjs from "dayjs";
import ReactCountdown from "react-countdown";
import convertMsToHMS from "scripts/convertMSToHMS";
import firebase from "firebase/clientApp";
import { useUser } from "context/userContext";
import { toast } from "react-toastify";
import timePad from "scripts/timePad";

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
    user: { uid, runningId, runningTaskStartTime },
  } = useUser();
  const onComplete = () => {
    const db = firebase.firestore();
    const batch = db.batch();

    const userRef = db.collection("users").doc(uid);

    const taskRef = db.doc(`users/${uid}/activities/${runningId}`);

    const increment = firebase.firestore.FieldValue.increment(
      dayjs().diff(runningTaskStartTime, "milliseconds")
    );

    batch.update(userRef, { runningId: "", runningTaskStartTime: "" });
    batch.update(taskRef, {
      currentTime: increment,
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
