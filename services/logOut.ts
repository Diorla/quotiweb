import firebase from "firebase/clientApp";
import { toast } from "react-toastify";

export default function logOut() {
  const auth = firebase.auth();
  auth.signOut().then(() => toast.info("User successfully logged out"));
}
