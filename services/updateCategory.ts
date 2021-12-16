import firebase from "firebase/clientApp";
import Category from "interfaces/Category";
import { toast } from "react-toastify";

export default function updateCategory(
  userId: string,
  category: Category,
  callback: () => void
) {
  const db = firebase.firestore();
  const { id } = category;
  db.doc(`users/${userId}/categories/${id}`)
    .update({
      ...category,
      id,
      updated: new Date().toString(),
    })
    .then(callback)
    .catch((err) => toast.error(err.message));
}
