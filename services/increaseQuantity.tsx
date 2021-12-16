import dayjs from "dayjs";
import firebase from "firebase/clientApp";
import currentRecordKey from "constants/currentRecordKey";
import Activity from "interfaces/Activity";

export default function increaseQuantity(
  activity: Activity,
  uid: string,
  callback: () => void,
  increase = 1
) {
  const db = firebase.firestore();
  const { quantityRecord = {}, quantity = 0, id, checkedList } = activity;
  const updatedCheckedList = [...checkedList];
  const currentQuantity = quantityRecord[currentRecordKey] || 0;
  const diff = quantity - currentQuantity;
  if (diff <= increase) updatedCheckedList.push(dayjs().toString());

  db.doc(`users/${uid}/activities/${id}`)
    .update({
      updated: dayjs().toString(),
      quantityRecord: {
        ...quantityRecord,
        [currentRecordKey]: currentQuantity + increase,
      },
      checkedList: updatedCheckedList,
    })
    .then(callback);
}
