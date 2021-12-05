import firebase from "firebase/clientApp";
import Category from "interfaces/Category";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import slugGenerator from "../scripts/slugGenerator";

export default function updateCategory(
  userId: string,
  category: Category,
  callback: () => void
) {
  const db = firebase.firestore();
  const { id } = category;
  db.doc(`users/${userId}/categories/${id}`)
    .set({
      ...category,
      id,
      updated: new Date().toString(),
    })
    .then(() => toast.success("Category updated"))
    .then(callback)
    .catch((err) => toast.error(err.message));
}
