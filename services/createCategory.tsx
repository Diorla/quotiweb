import firebase from "firebase/clientApp";
import Category from "interfaces/Category";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import slugGenerator from "../scripts/slugGenerator";

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
      slug: slugGenerator(category.name),
      created: new Date().toString(),
    })
    .then(callback)
    .catch((err) => toast.error(err.message));
}
