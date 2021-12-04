import firebase from "firebase/clientApp";
import Category from "interfaces/Category";
import { toast } from "react-toastify";
import { v4 } from "uuid";

export default function createCategory(
  userId: string,
  category: Category,
  callback: () => void
) {
  const db = firebase.firestore();
  const id = v4();
  db.doc(`users/${userId}/categories/${id}`)
    .set({
      ...category,
      id,
      created: new Date().toString(),
    })
    .then(() => toast.success("Category created"))
    .then(callback)
    .catch((err) => toast.error(err.message));
}
