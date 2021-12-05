import firebase from "firebase/clientApp";
import Activity from "interfaces/Activity";
import Category from "interfaces/Category";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import slugGenerator from "../scripts/slugGenerator";

export default function createActivity(
  userId: string,
  activity: Activity,
  callback: () => void
) {
  const db = firebase.firestore();
  const id = v4();
  const categoryId = activity.category;
  db.doc(`users/${userId}/categories/${categoryId}`)
    .get()
    .then((doc) => {
      const { priority } = doc.data() as Category;
      db.doc(`users/${userId}/activities/${id}`)
        .set({
          ...activity,
          id,
          priority,
          slug: slugGenerator(activity.name),
          created: new Date().toString(),
        })
        .then(() => toast.success("Activity created"))
        .then(callback);
    })
    .catch((err) => toast.error(err.message));
}
