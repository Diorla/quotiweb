import UserProps from "./UserProps";
import firebase from "firebase/clientApp";
import initialUser from "./initialUser";

export default async function getUser(
  userId: string,
  callback: (arg0: UserProps) => void
): Promise<() => void> {
  const db = firebase.firestore();

  const doc = db.collection("users").doc(userId);

  return doc.onSnapshot((doc) => {
    const data = doc.data() || {};
    const formattedData = { ...initialUser, ...data };
    callback(formattedData);
  });
}
